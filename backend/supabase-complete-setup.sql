-- ============================================
-- CONFIGURATION COMPLÈTE SUPABASE - AHIMÈ E-COMMERCE
-- ============================================
-- Exécutez ce script dans l'éditeur SQL de Supabase
-- Dashboard Supabase > SQL Editor > New Query

-- ============================================
-- 1. EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- 2. TABLES PRINCIPALES
-- ============================================

-- Table des catégories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  order_index INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive'
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  meta_keywords TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des produits
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_description VARCHAR(200),
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  promo_price DECIMAL(10,2),
  is_on_sale BOOLEAN DEFAULT FALSE,
  promo_start_date DATE,
  promo_end_date DATE,
  sku VARCHAR(100) UNIQUE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sub_category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  weight DECIMAL(8,2), -- en kg
  dimensions JSONB DEFAULT '{"length": 0, "width": 0, "height": 0}'::jsonb,
  images JSONB DEFAULT '[]'::jsonb, -- Array d'URLs d'images
  colors JSONB DEFAULT '[]'::jsonb, -- Array de couleurs disponibles
  sizes JSONB DEFAULT '[]'::jsonb, -- Array de tailles disponibles
  brand VARCHAR(100),
  warranty VARCHAR(100),
  return_policy VARCHAR(100),
  tags JSONB DEFAULT '[]'::jsonb,
  rating DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'draft'
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  meta_keywords TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des utilisateurs (extension de auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'customer', -- 'customer', 'affiliate', 'admin'
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'suspended'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des adresses
CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(20) DEFAULT 'shipping', -- 'shipping', 'billing'
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Bénin',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL, -- CMD-2024-001
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  items JSONB NOT NULL, -- Array d'items avec product_id, quantity, price, etc.
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50), -- 'mobile_money', 'card', 'bank_transfer'
  payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  payment_reference VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  tracking_number VARCHAR(100),
  notes TEXT,
  affiliate_id UUID, -- Référence vers l'affilié si commande via lien d'affiliation
  referral_code VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des promotions/codes promo
CREATE TABLE IF NOT EXISTS promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'percentage', 'fixed'
  value DECIMAL(10,2) NOT NULL, -- Pourcentage ou montant fixe
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  min_purchase DECIMAL(10,2),
  max_discount DECIMAL(10,2),
  usage_limit INTEGER, -- Nombre total d'utilisations
  usage_count INTEGER DEFAULT 0,
  user_limit INTEGER DEFAULT 1, -- Utilisations par utilisateur
  applicable_to JSONB DEFAULT '[]'::jsonb, -- IDs de produits/catégories, vide = tous
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'expired'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des avis produits
CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des favoris
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ============================================
-- 3. TABLES AFFILIATION (déjà dans affiliate-setup.sql)
-- ============================================
-- Voir backend/affiliate-setup.sql pour les tables d'affiliation

-- ============================================
-- 4. INDEX POUR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_addresses_user ON addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_promotions_code ON promotions(code);
CREATE INDEX IF NOT EXISTS idx_promotions_status ON promotions(status);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_product ON favorites(product_id);

-- ============================================
-- 5. FONCTIONS ET TRIGGERS
-- ============================================

-- Fonction pour générer le numéro de commande
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
  year_prefix VARCHAR(4);
  last_order_num INTEGER;
  new_order_num VARCHAR(50);
BEGIN
  year_prefix := TO_CHAR(NOW(), 'YYYY');
  
  -- Récupère le dernier numéro de commande de l'année
  SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 10) AS INTEGER)), 0) + 1
  INTO last_order_num
  FROM orders
  WHERE order_number LIKE 'CMD-' || year_prefix || '-%';
  
  -- Génère le nouveau numéro
  new_order_num := 'CMD-' || year_prefix || '-' || LPAD(last_order_num::TEXT, 3, '0');
  
  NEW.order_number := new_order_num;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour générer automatiquement le numéro de commande
CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL)
  EXECUTE FUNCTION generate_order_number();

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at
  BEFORE UPDATE ON addresses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_promotions_updated_at
  BEFORE UPDATE ON promotions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour calculer la note moyenne d'un produit
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM product_reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
        AND status = 'approved'
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM product_reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
        AND status = 'approved'
    )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour la note du produit
CREATE TRIGGER update_product_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_product_rating();

-- Fonction pour créer automatiquement un profil utilisateur
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, first_name, last_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'first_name', NEW.raw_user_meta_data->>'last_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer le profil à l'inscription
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- ============================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Catégories : Lecture publique
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (status = 'active');

-- Produits : Lecture publique
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (status = 'active');

-- Produits : Édition admin uniquement
CREATE POLICY "Only admins can modify products"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Profils utilisateurs : Voir son propre profil
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Profils utilisateurs : Modifier son propre profil
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Adresses : Gérer ses propres adresses
CREATE POLICY "Users can manage own addresses"
  ON addresses FOR ALL
  USING (auth.uid() = user_id);

-- Commandes : Voir ses propres commandes
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Commandes : Créer des commandes (authentifié)
CREATE POLICY "Authenticated users can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Commandes : Admin peut tout voir/modifier
CREATE POLICY "Admins can manage all orders"
  ON orders FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Promotions : Lecture publique des promotions actives
CREATE POLICY "Active promotions are viewable by everyone"
  ON promotions FOR SELECT
  USING (status = 'active' AND start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE);

-- Promotions : Admin uniquement pour modification
CREATE POLICY "Only admins can manage promotions"
  ON promotions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Avis : Voir les avis approuvés
CREATE POLICY "Approved reviews are viewable by everyone"
  ON product_reviews FOR SELECT
  USING (status = 'approved');

-- Avis : Créer un avis (authentifié)
CREATE POLICY "Authenticated users can create reviews"
  ON product_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Avis : Modifier son propre avis
CREATE POLICY "Users can update own reviews"
  ON product_reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Favoris : Gérer ses propres favoris
CREATE POLICY "Users can manage own favorites"
  ON favorites FOR ALL
  USING (auth.uid() = user_id);

-- Catégories : Admin uniquement pour modification
CREATE POLICY "Only admins can manage categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 7. VUES UTILES
-- ============================================

-- Vue pour les statistiques produits
CREATE OR REPLACE VIEW product_stats AS
SELECT 
  p.id,
  p.name,
  p.slug,
  p.price,
  p.stock,
  p.rating,
  p.rating_count,
  COUNT(DISTINCT o.id) as total_orders,
  COALESCE(SUM((item->>'quantity')::INTEGER), 0) as total_sold,
  COALESCE(SUM((item->>'price')::DECIMAL * (item->>'quantity')::INTEGER), 0) as total_revenue
FROM products p
LEFT JOIN orders o ON o.status NOT IN ('cancelled')
LEFT JOIN LATERAL jsonb_array_elements(o.items) AS item ON true
WHERE p.status = 'active'
  AND (o.id IS NULL OR (item->>'product_id')::UUID = p.id)
GROUP BY p.id, p.name, p.slug, p.price, p.stock, p.rating, p.rating_count;

-- Vue pour les statistiques commandes
CREATE OR REPLACE VIEW order_stats AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as order_count,
  SUM(total) as total_revenue,
  AVG(total) as avg_order_value
FROM orders
WHERE status NOT IN ('cancelled')
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- ============================================
-- 8. DONNÉES DE TEST (OPTIONNEL)
-- ============================================

-- Insérer des catégories de base
INSERT INTO categories (name, slug, description, order_index) VALUES
  ('Électronique', 'electronique', 'Tous les produits électroniques', 1),
  ('Mode & Vêtements', 'mode-vetements', 'Vêtements et accessoires de mode', 2),
  ('Maison & Décoration', 'maison-decoration', 'Articles pour la maison', 3),
  ('Beauté & Santé', 'beaute-sante', 'Produits de beauté et santé', 4),
  ('Alimentation', 'alimentation', 'Produits alimentaires', 5),
  ('Sport & Loisirs', 'sport-loisirs', 'Équipements sportifs et loisirs', 6)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- FIN DU SCRIPT
-- ============================================
-- Après l'exécution, configurez les variables d'environnement dans votre projet
-- VITE_SUPABASE_URL=https://votre-projet.supabase.co
-- VITE_SUPABASE_ANON_KEY=votre-clé-anon
