-- ============================================
-- INITIALISATION DES DONNÉES PAR DÉFAUT
-- ============================================
-- Ce script crée des catégories et sous-catégories par défaut
-- Exécutez-le APRÈS avoir créé votre compte admin
-- ============================================

-- Catégories principales
INSERT INTO categories (name, slug, description, order_index, status, meta_title, meta_description) VALUES
('Électronique', 'electronique', 'Tous vos appareils électroniques : smartphones, ordinateurs, tablettes, accessoires', 1, 'active', 'Électronique - Ahimè', 'Découvrez notre sélection d''appareils électroniques au Bénin'),
('Mode & Vêtements', 'mode-vetements', 'Mode féminine, masculine et enfants. Vêtements tendance et accessoires de mode', 2, 'active', 'Mode & Vêtements - Ahimè', 'Trouvez votre style avec notre collection de vêtements et accessoires de mode'),
('Maison & Décoration', 'maison-decoration', 'Meubles, décoration intérieure, électroménager et articles pour la maison', 3, 'active', 'Maison & Décoration - Ahimè', 'Aménagez votre intérieur avec nos meubles et articles de décoration'),
('Beauté & Santé', 'beaute-sante', 'Produits de beauté, cosmétiques, soins personnels et compléments alimentaires', 4, 'active', 'Beauté & Santé - Ahimè', 'Prenez soin de vous avec nos produits de beauté et de santé'),
('Alimentation', 'alimentation', 'Produits alimentaires, boissons, épicerie fine et produits locaux', 5, 'active', 'Alimentation - Ahimè', 'Découvrez notre sélection de produits alimentaires et boissons'),
('Sport & Loisirs', 'sport-loisirs', 'Équipements sportifs, vêtements de sport, articles de loisirs et jeux', 6, 'active', 'Sport & Loisirs - Ahimè', 'Équipez-vous pour vos activités sportives et de loisirs')
ON CONFLICT (slug) DO NOTHING;

-- Sous-catégories Électronique
INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Smartphones', 'smartphones', 'Smartphones et téléphones portables de toutes marques', c.id, 1, 'active', 'Smartphones - Ahimè', 'Découvrez notre sélection de smartphones'
FROM categories c WHERE c.slug = 'electronique'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Ordinateurs & Accessoires', 'ordinateurs-accessoires', 'Ordinateurs portables, de bureau, accessoires et périphériques', c.id, 2, 'active', 'Ordinateurs - Ahimè', 'Ordinateurs et accessoires informatiques'
FROM categories c WHERE c.slug = 'electronique'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'TV & Audio', 'tv-audio', 'Téléviseurs, enceintes, casques et équipements audio', c.id, 3, 'active', 'TV & Audio - Ahimè', 'Équipements TV et audio pour votre maison'
FROM categories c WHERE c.slug = 'electronique'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Électroménager', 'electromenager', 'Réfrigérateurs, machines à laver, climatiseurs et petits électroménagers', c.id, 4, 'active', 'Électroménager - Ahimè', 'Électroménager pour votre maison'
FROM categories c WHERE c.slug = 'electronique'
ON CONFLICT (slug) DO NOTHING;

-- Sous-catégories Mode & Vêtements
INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Vêtements Femme', 'vetements-femme', 'Mode féminine : robes, jupes, tops, pantalons', c.id, 1, 'active', 'Vêtements Femme - Ahimè', 'Mode féminine tendance'
FROM categories c WHERE c.slug = 'mode-vetements'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Vêtements Homme', 'vetements-homme', 'Mode masculine : chemises, pantalons, t-shirts, costumes', c.id, 2, 'active', 'Vêtements Homme - Ahimè', 'Mode masculine'
FROM categories c WHERE c.slug = 'mode-vetements'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Chaussures', 'chaussures', 'Chaussures pour homme, femme et enfants', c.id, 3, 'active', 'Chaussures - Ahimè', 'Chaussures de toutes marques'
FROM categories c WHERE c.slug = 'mode-vetements'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Accessoires Mode', 'accessoires-mode', 'Sacs, montres, bijoux et accessoires de mode', c.id, 4, 'active', 'Accessoires Mode - Ahimè', 'Accessoires de mode'
FROM categories c WHERE c.slug = 'mode-vetements'
ON CONFLICT (slug) DO NOTHING;

-- Sous-catégories Maison & Décoration
INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Meubles', 'meubles', 'Meubles de salon, chambre, salle à manger et bureau', c.id, 1, 'active', 'Meubles - Ahimè', 'Meubles pour votre intérieur'
FROM categories c WHERE c.slug = 'maison-decoration'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Décoration', 'decoration', 'Objets de décoration, tableaux, vases et accessoires déco', c.id, 2, 'active', 'Décoration - Ahimè', 'Articles de décoration'
FROM categories c WHERE c.slug = 'maison-decoration'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Linge de Maison', 'linge-maison', 'Draps, couettes, serviettes et linge de maison', c.id, 3, 'active', 'Linge de Maison - Ahimè', 'Linge de maison de qualité'
FROM categories c WHERE c.slug = 'maison-decoration'
ON CONFLICT (slug) DO NOTHING;

-- Sous-catégories Beauté & Santé
INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Soins Visage', 'soins-visage', 'Crèmes, sérums, masques et produits de soin pour le visage', c.id, 1, 'active', 'Soins Visage - Ahimè', 'Produits de soin pour le visage'
FROM categories c WHERE c.slug = 'beaute-sante'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Maquillage', 'maquillage', 'Rouge à lèvres, fond de teint, mascara et produits de maquillage', c.id, 2, 'active', 'Maquillage - Ahimè', 'Maquillage de toutes marques'
FROM categories c WHERE c.slug = 'beaute-sante'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Parfums', 'parfums', 'Parfums homme et femme de toutes marques', c.id, 3, 'active', 'Parfums - Ahimè', 'Parfums et eaux de toilette'
FROM categories c WHERE c.slug = 'beaute-sante'
ON CONFLICT (slug) DO NOTHING;

-- Sous-catégories Sport & Loisirs
INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Équipement Sportif', 'equipement-sportif', 'Matériel de sport, équipements de fitness', c.id, 1, 'active', 'Équipement Sportif - Ahimè', 'Équipements de sport'
FROM categories c WHERE c.slug = 'sport-loisirs'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, description, parent_id, order_index, status, meta_title, meta_description)
SELECT 
  'Vêtements de Sport', 'vetements-sport', 'Vêtements et chaussures de sport', c.id, 2, 'active', 'Vêtements de Sport - Ahimè', 'Vêtements de sport'
FROM categories c WHERE c.slug = 'sport-loisirs'
ON CONFLICT (slug) DO NOTHING;

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '✅ Catégories et sous-catégories créées avec succès!';
  RAISE NOTICE 'Vous pouvez maintenant ajouter des produits dans ces catégories via le dashboard admin.';
END $$;
