# Architecture du Système d'Affiliation - Ahimè

## 📋 Vue d'ensemble

Ce document décrit l'architecture complète du système d'affiliation pour la plateforme e-commerce Ahimè.

## 🎯 Objectifs

1. Permettre aux utilisateurs de s'inscrire comme affiliés
2. Générer des liens d'affiliation uniques
3. Tracker les clics et conversions
4. Calculer et distribuer les commissions
5. Fournir un tableau de bord aux affiliés

## 🏗️ Architecture Technique

### Frontend (React/TypeScript)

#### Pages nécessaires :
- `/affiliate` - Page d'information sur le programme
- `/affiliate/register` - Formulaire d'inscription
- `/affiliate/dashboard` - Tableau de bord affilié (nécessite authentification)
- `/affiliate/links` - Gestion des liens d'affiliation
- `/affiliate/stats` - Statistiques et rapports

#### Composants à créer :
- `AffiliateRegisterForm.tsx` - Formulaire d'inscription
- `AffiliateDashboard.tsx` - Tableau de bord principal
- `AffiliateLinks.tsx` - Gestion des liens
- `AffiliateStats.tsx` - Graphiques et statistiques
- `AffiliateLinkGenerator.tsx` - Générateur de liens
- `CommissionHistory.tsx` - Historique des commissions

#### Context/State Management :
- `AffiliateContext.tsx` - Gestion de l'état affilié
- Stockage des données d'affiliation
- Gestion de l'authentification affilié

### Backend (Supabase)

#### Tables de base de données :

```sql
-- Table des affiliés
CREATE TABLE affiliates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  payment_method VARCHAR(50), -- 'mobile_money', 'bank_transfer'
  payment_details JSONB, -- Détails selon la méthode
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'suspended'
  commission_rate DECIMAL(5,2) DEFAULT 10.00, -- Pourcentage
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  paid_earnings DECIMAL(10,2) DEFAULT 0.00,
  pending_earnings DECIMAL(10,2) DEFAULT 0.00,
  referral_code VARCHAR(20) UNIQUE NOT NULL, -- Code unique
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table des liens d'affiliation
CREATE TABLE affiliate_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  product_id VARCHAR(50), -- NULL pour liens généraux
  category_slug VARCHAR(100), -- NULL pour liens produits spécifiques
  link_type VARCHAR(20) NOT NULL, -- 'product', 'category', 'general'
  custom_slug VARCHAR(100), -- Slug personnalisé optionnel
  full_url TEXT NOT NULL, -- URL complète avec paramètres
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table des clics (tracking)
CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id),
  link_id UUID REFERENCES affiliate_links(id),
  session_id VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  clicked_at TIMESTAMP DEFAULT NOW(),
  converted BOOLEAN DEFAULT FALSE,
  conversion_id UUID REFERENCES affiliate_conversions(id)
);

-- Table des conversions (ventes)
CREATE TABLE affiliate_conversions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id),
  click_id UUID REFERENCES affiliate_clicks(id),
  order_id VARCHAR(100) NOT NULL, -- ID de commande
  product_id VARCHAR(50),
  product_name VARCHAR(255),
  order_total DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'paid', 'cancelled'
  conversion_date TIMESTAMP DEFAULT NOW(),
  payment_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table des paiements
CREATE TABLE affiliate_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id),
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_reference VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  conversions_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP
);

-- Index pour performance
CREATE INDEX idx_affiliate_links_affiliate ON affiliate_links(affiliate_id);
CREATE INDEX idx_affiliate_clicks_affiliate ON affiliate_clicks(affiliate_id);
CREATE INDEX idx_affiliate_clicks_link ON affiliate_clicks(link_id);
CREATE INDEX idx_affiliate_conversions_affiliate ON affiliate_conversions(affiliate_id);
CREATE INDEX idx_affiliate_conversions_status ON affiliate_conversions(status);
CREATE INDEX idx_affiliate_referral_code ON affiliates(referral_code);
```

## 🔄 Flux de fonctionnement

### 1. Inscription d'un affilié

```
Utilisateur → Formulaire d'inscription
           → Validation des données
           → Création du compte affilié
           → Génération du code de référence unique
           → Email de confirmation
           → Statut: "pending"
           → Validation manuelle par admin
           → Statut: "approved"
```

### 2. Génération de lien d'affiliation

```
Affilié → Sélectionne produit/catégorie
        → Système génère: https://ahimey.vercel.app/products?ref=ABC123
        → Lien stocké dans affiliate_links
        → Affilié copie et partage
```

### 3. Tracking d'un clic

```
Utilisateur clique sur lien
→ Cookie/Storage: affiliate_ref=ABC123 (30 jours)
→ Enregistrement dans affiliate_clicks
→ Redirection vers la page produit
```

### 4. Conversion (vente)

```
Utilisateur ajoute au panier (avec cookie ref)
→ Passe commande
→ Système vérifie cookie affiliate_ref
→ Création entrée dans affiliate_conversions
→ Calcul commission selon taux
→ Mise à jour stats affilié
```

### 5. Paiement des commissions

```
Fin du mois
→ Calcul des commissions dues
→ Création entrée dans affiliate_payments
→ Validation par admin
→ Paiement (Mobile Money / Virement)
→ Mise à jour statut: "paid"
```

## 🛠️ Implémentation Progressive

### Phase 1 : Infrastructure de base ✅
- [x] Page d'information `/affiliate`
- [ ] Structure de base de données Supabase
- [ ] Service d'affiliation (API)

### Phase 2 : Inscription et authentification
- [ ] Formulaire d'inscription
- [ ] Validation et approbation
- [ ] Système d'authentification affilié
- [ ] Génération de codes de référence

### Phase 3 : Génération et gestion de liens
- [ ] Générateur de liens d'affiliation
- [ ] Interface de gestion des liens
- [ ] Système de tracking des clics
- [ ] Cookies/LocalStorage pour tracking

### Phase 4 : Tracking et conversions
- [ ] Intégration avec le panier
- [ ] Détection des conversions
- [ ] Calcul automatique des commissions
- [ ] Système de cookies/sessions

### Phase 5 : Tableau de bord
- [ ] Statistiques en temps réel
- [ ] Graphiques de performance
- [ ] Historique des commissions
- [ ] Export de rapports

### Phase 6 : Paiements
- [ ] Calcul mensuel des commissions
- [ ] Interface de paiement
- [ ] Intégration Mobile Money
- [ ] Historique des paiements

## 🔐 Sécurité

1. **Validation des codes de référence** : Vérifier l'existence et le statut actif
2. **Protection contre la fraude** : Détection de clics suspects, IP tracking
3. **Expiration des cookies** : 30 jours maximum
4. **Validation des conversions** : Vérifier que la commande est complétée
5. **Période de grâce** : 30 jours pour attribution après le clic

## 📊 Métriques à tracker

- Nombre de clics par lien
- Taux de conversion (clics → ventes)
- Revenus générés par affilié
- Top produits/catégories promus
- Performance par canal (réseaux sociaux, blog, etc.)

## 💰 Structure des commissions

- **Niveau Débutant** : 10% (0-10 ventes/mois)
- **Niveau Intermédiaire** : 12% (11-50 ventes/mois)
- **Niveau Expert** : 15% (50+ ventes/mois)
- **Paiement minimum** : 10 000 FCFA
- **Période de paiement** : Mensuel (le 15 de chaque mois)

## 🚀 Prochaines étapes

1. Créer les tables Supabase
2. Développer le service d'affiliation
3. Implémenter le formulaire d'inscription
4. Créer le système de génération de liens
5. Intégrer le tracking dans le panier
6. Développer le tableau de bord
