-- ============================================
-- Configuration : Code de Suivi et Notifications
-- ============================================

-- 1. Ajouter la colonne tracking_code à la table orders
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS tracking_code VARCHAR(20) UNIQUE;

-- 2. Créer un index pour les recherches rapides
CREATE INDEX IF NOT EXISTS idx_orders_tracking_code ON orders(tracking_code);

-- 3. Fonction pour générer un code de suivi unique
CREATE OR REPLACE FUNCTION generate_tracking_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- Exclut les caractères ambigus
  result TEXT := 'AHM-';
  i INTEGER;
  random_char TEXT;
BEGIN
  -- Génère 6 caractères aléatoires
  FOR i IN 1..6 LOOP
    random_char := SUBSTRING(chars FROM floor(random() * length(chars) + 1)::INTEGER FOR 1);
    result := result || random_char;
  END LOOP;
  
  -- Vérifie l'unicité (très peu probable mais on vérifie)
  WHILE EXISTS (SELECT 1 FROM orders WHERE tracking_code = result) LOOP
    result := 'AHM-';
    FOR i IN 1..6 LOOP
      random_char := SUBSTRING(chars FROM floor(random() * length(chars) + 1)::INTEGER FOR 1);
      result := result || random_char;
    END LOOP;
  END LOOP;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 4. Trigger pour générer automatiquement le tracking_code
CREATE OR REPLACE FUNCTION set_tracking_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tracking_code IS NULL THEN
    NEW.tracking_code := generate_tracking_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_tracking_code
  BEFORE INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.tracking_code IS NULL)
  EXECUTE FUNCTION set_tracking_code();

-- 5. Table pour les notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'order_created', 'order_status_changed', 'payment_received', etc.
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB, -- Données supplémentaires (order_id, etc.)
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Index pour les notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- 7. Trigger pour créer une notification admin lors d'une nouvelle commande
CREATE OR REPLACE FUNCTION notify_admin_on_new_order()
RETURNS TRIGGER AS $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Trouve un admin (premier utilisateur avec role = 'admin')
  SELECT id INTO admin_user_id
  FROM user_profiles
  WHERE role = 'admin'
  LIMIT 1;
  
  -- Crée une notification si un admin existe
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO notifications (user_id, type, title, message, data)
    VALUES (
      admin_user_id,
      'order_created',
      'Nouvelle commande reçue',
      'Une nouvelle commande #' || NEW.order_number || ' a été créée pour un montant de ' || NEW.total || ' FCFA',
      jsonb_build_object(
        'order_id', NEW.id,
        'order_number', NEW.order_number,
        'customer_name', NEW.customer_name,
        'total', NEW.total,
        'payment_method', NEW.payment_method
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_admin_on_order
  AFTER INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION notify_admin_on_new_order();

-- 8. Fonction pour mettre à jour le statut de paiement (paiement à la livraison)
CREATE OR REPLACE FUNCTION update_payment_on_delivery()
RETURNS TRIGGER AS $$
BEGIN
  -- Si la commande est livrée et le paiement était en attente (paiement à la livraison)
  IF NEW.status = 'delivered' AND NEW.payment_status = 'pending' AND NEW.payment_method = 'cash_on_delivery' THEN
    NEW.payment_status := 'paid';
    NEW.payment_reference := 'PAYMENT-' || NEW.order_number || '-' || TO_CHAR(NOW(), 'YYYYMMDD');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_payment_on_delivery
  BEFORE UPDATE ON orders
  FOR EACH ROW
  WHEN (NEW.status = 'delivered' AND OLD.status != 'delivered')
  EXECUTE FUNCTION update_payment_on_delivery();

-- 9. Vue pour les notifications non lues (pour le dashboard)
CREATE OR REPLACE VIEW unread_notifications AS
SELECT 
  n.*,
  up.first_name || ' ' || up.last_name AS user_name,
  up.role
FROM notifications n
LEFT JOIN user_profiles up ON n.user_id = up.id
WHERE n.read = FALSE
ORDER BY n.created_at DESC;

-- 10. Fonction pour marquer les notifications comme lues
CREATE OR REPLACE FUNCTION mark_notifications_read(user_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE notifications
  SET read = TRUE
  WHERE user_id = user_uuid AND read = FALSE;
END;
$$ LANGUAGE plpgsql;

-- 11. Mettre à jour la colonne payment_method pour inclure 'cash_on_delivery'
-- (Cette modification est déjà dans le schéma, mais on s'assure qu'elle existe)
-- ALTER TABLE orders ALTER COLUMN payment_method TYPE VARCHAR(50); -- Déjà fait dans le schéma principal
