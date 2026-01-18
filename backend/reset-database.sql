-- ============================================
-- Script de Réinitialisation Complète de la Base de Données
-- ⚠️ ATTENTION : Ce script supprime TOUTES les tables, vues, fonctions et triggers
-- Utilisez-le uniquement si vous voulez repartir de zéro
-- ============================================

-- 1. Supprimer tous les TRIGGERS
DROP TRIGGER IF EXISTS trigger_notify_admin_on_order ON orders;
DROP TRIGGER IF EXISTS trigger_update_payment_on_delivery ON orders;
DROP TRIGGER IF EXISTS set_order_tracking_code ON orders;
DROP TRIGGER IF EXISTS set_order_number ON orders;
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
DROP TRIGGER IF EXISTS update_addresses_updated_at ON addresses;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
DROP TRIGGER IF EXISTS update_promotions_updated_at ON promotions;
DROP TRIGGER IF EXISTS update_product_rating ON product_reviews;

-- 2. Supprimer toutes les VUES
DROP VIEW IF EXISTS unread_notifications CASCADE;
DROP VIEW IF EXISTS product_stats CASCADE;
DROP VIEW IF EXISTS order_stats CASCADE;
DROP VIEW IF EXISTS user_stats CASCADE;
DROP VIEW IF EXISTS affiliate_stats CASCADE;

-- 3. Supprimer toutes les FONCTIONS
DROP FUNCTION IF EXISTS mark_notifications_read(UUID);
DROP FUNCTION IF EXISTS update_payment_on_delivery();
DROP FUNCTION IF EXISTS notify_admin_on_new_order();
DROP FUNCTION IF EXISTS set_tracking_code();
DROP FUNCTION IF EXISTS generate_tracking_code();
DROP FUNCTION IF EXISTS generate_order_number();
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS update_product_rating();
DROP FUNCTION IF EXISTS calculate_average_rating();
DROP FUNCTION IF EXISTS is_admin();
DROP FUNCTION IF EXISTS increment(TEXT, TEXT, UUID);

-- 4. Supprimer toutes les TABLES (dans l'ordre inverse des dépendances)
-- Tables d'affiliation (dépendent de user_profiles)
DROP TABLE IF EXISTS affiliate_conversions CASCADE;
DROP TABLE IF EXISTS affiliate_clicks CASCADE;
DROP TABLE IF EXISTS affiliate_links CASCADE;
DROP TABLE IF EXISTS affiliates CASCADE;

-- Tables principales (dépendent les unes des autres)
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS product_reviews CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS promotions CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- 5. Supprimer les INDEX personnalisés (les index sur les tables sont supprimés automatiquement)
-- (Pas besoin, ils sont supprimés avec les tables)

-- 6. Vérification : Lister les tables restantes (optionnel)
-- SELECT table_name 
-- FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- AND table_type = 'BASE TABLE';

-- ============================================
-- Message de confirmation
-- ============================================
-- Toutes les tables, vues, fonctions et triggers ont été supprimés.
-- Vous pouvez maintenant réexécuter les scripts de configuration :
-- 1. backend/supabase-complete-setup.sql
-- 2. backend/affiliate-setup.sql
-- 3. backend/order-tracking-setup.sql
