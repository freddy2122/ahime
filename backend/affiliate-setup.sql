-- Script SQL pour créer les tables du système d'affiliation
-- À exécuter dans Supabase SQL Editor

-- Table des affiliés
CREATE TABLE IF NOT EXISTS affiliates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  payment_method VARCHAR(50) DEFAULT 'mobile_money', -- 'mobile_money', 'bank_transfer'
  payment_details JSONB DEFAULT '{}', -- Détails selon la méthode (numéro Mobile Money, IBAN, etc.)
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'suspended'
  commission_rate DECIMAL(5,2) DEFAULT 10.00, -- Pourcentage de commission
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  paid_earnings DECIMAL(10,2) DEFAULT 0.00,
  pending_earnings DECIMAL(10,2) DEFAULT 0.00,
  referral_code VARCHAR(20) UNIQUE NOT NULL, -- Code unique de référence
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des liens d'affiliation
CREATE TABLE IF NOT EXISTS affiliate_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  product_id VARCHAR(50), -- NULL pour liens généraux
  category_slug VARCHAR(100), -- NULL pour liens produits spécifiques
  link_type VARCHAR(20) NOT NULL, -- 'product', 'category', 'general'
  custom_slug VARCHAR(100), -- Slug personnalisé optionnel
  full_url TEXT NOT NULL, -- URL complète avec paramètres
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des clics (tracking)
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id) ON DELETE SET NULL,
  link_id UUID REFERENCES affiliate_links(id) ON DELETE SET NULL,
  session_id VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  converted BOOLEAN DEFAULT FALSE,
  conversion_id UUID -- Référence vers affiliate_conversions si conversion
);

-- Table des conversions (ventes)
CREATE TABLE IF NOT EXISTS affiliate_conversions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id) ON DELETE SET NULL,
  click_id UUID REFERENCES affiliate_clicks(id) ON DELETE SET NULL,
  order_id VARCHAR(100) NOT NULL, -- ID de commande
  product_id VARCHAR(50),
  product_name VARCHAR(255),
  order_total DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'paid', 'cancelled'
  conversion_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des paiements
CREATE TABLE IF NOT EXISTS affiliate_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_reference VARCHAR(255), -- Référence de transaction
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  conversions_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_affiliate_links_affiliate ON affiliate_links(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_affiliate ON affiliate_clicks(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_link ON affiliate_clicks(link_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_converted ON affiliate_clicks(converted);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_affiliate ON affiliate_conversions(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_status ON affiliate_conversions(status);
CREATE INDEX IF NOT EXISTS idx_affiliate_referral_code ON affiliates(referral_code);
CREATE INDEX IF NOT EXISTS idx_affiliate_status ON affiliates(status);
CREATE INDEX IF NOT EXISTS idx_affiliate_payments_affiliate ON affiliate_payments(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_payments_status ON affiliate_payments(status);

-- Fonction pour générer un code de référence unique
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS VARCHAR(20) AS $$
DECLARE
  code VARCHAR(20);
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- Génère un code aléatoire de 8 caractères (lettres et chiffres)
    code := UPPER(
      SUBSTRING(
        MD5(RANDOM()::TEXT || NOW()::TEXT) 
        FROM 1 FOR 8
      )
    );
    
    -- Vérifie si le code existe déjà
    SELECT EXISTS(SELECT 1 FROM affiliates WHERE referral_code = code) INTO exists_check;
    
    -- Si le code n'existe pas, on le retourne
    EXIT WHEN NOT exists_check;
  END LOOP;
  
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_affiliates_updated_at
  BEFORE UPDATE ON affiliates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_links_updated_at
  BEFORE UPDATE ON affiliate_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour calculer le taux de commission selon le niveau
CREATE OR REPLACE FUNCTION calculate_commission_rate(affiliate_id_param UUID)
RETURNS DECIMAL(5,2) AS $$
DECLARE
  monthly_sales INTEGER;
  rate DECIMAL(5,2);
BEGIN
  -- Compter les ventes du mois en cours
  SELECT COUNT(*) INTO monthly_sales
  FROM affiliate_conversions
  WHERE affiliate_id = affiliate_id_param
    AND status IN ('confirmed', 'paid')
    AND conversion_date >= DATE_TRUNC('month', NOW());
  
  -- Déterminer le taux selon le nombre de ventes
  IF monthly_sales >= 50 THEN
    rate := 15.00; -- Niveau Expert
  ELSIF monthly_sales >= 11 THEN
    rate := 12.00; -- Niveau Intermédiaire
  ELSE
    rate := 10.00; -- Niveau Débutant
  END IF;
  
  RETURN rate;
END;
$$ LANGUAGE plpgsql;

-- Vue pour les statistiques d'affiliés
CREATE OR REPLACE VIEW affiliate_stats AS
SELECT 
  a.id,
  a.referral_code,
  a.first_name || ' ' || a.last_name AS full_name,
  a.email,
  a.status,
  a.commission_rate,
  a.total_earnings,
  a.paid_earnings,
  a.pending_earnings,
  COUNT(DISTINCT al.id) AS total_links,
  COUNT(DISTINCT ac.id) AS total_clicks,
  COUNT(DISTINCT acv.id) AS total_conversions,
  COALESCE(SUM(CASE WHEN acv.status = 'confirmed' THEN acv.commission_amount ELSE 0 END), 0) AS confirmed_earnings,
  COALESCE(SUM(CASE WHEN acv.status = 'paid' THEN acv.commission_amount ELSE 0 END), 0) AS calculated_paid_earnings
FROM affiliates a
LEFT JOIN affiliate_links al ON a.id = al.affiliate_id
LEFT JOIN affiliate_clicks ac ON al.id = ac.link_id
LEFT JOIN affiliate_conversions acv ON a.id = acv.affiliate_id
GROUP BY a.id, a.referral_code, a.first_name, a.last_name, a.email, a.status, 
         a.commission_rate, a.total_earnings, a.paid_earnings, a.pending_earnings;

-- Politique RLS (Row Level Security) - À configurer selon vos besoins
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_payments ENABLE ROW LEVEL SECURITY;

-- Exemple de politiques (à adapter selon vos besoins)
-- Les affiliés peuvent voir leurs propres données
CREATE POLICY "Affiliates can view own data" ON affiliates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Affiliates can view own links" ON affiliate_links
  FOR SELECT USING (
    affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid())
  );

-- Les utilisateurs authentifiés peuvent créer des clics (tracking public)
CREATE POLICY "Anyone can create clicks" ON affiliate_clicks
  FOR INSERT WITH CHECK (true);

-- Les admins peuvent tout voir (à créer une fonction is_admin())
-- CREATE POLICY "Admins can view all" ON affiliates
--   FOR ALL USING (is_admin());

COMMENT ON TABLE affiliates IS 'Table des affiliés du programme d''affiliation';
COMMENT ON TABLE affiliate_links IS 'Liens d''affiliation générés par les affiliés';
COMMENT ON TABLE affiliate_clicks IS 'Tracking des clics sur les liens d''affiliation';
COMMENT ON TABLE affiliate_conversions IS 'Conversions (ventes) attribuées aux affiliés';
COMMENT ON TABLE affiliate_payments IS 'Historique des paiements de commissions';
