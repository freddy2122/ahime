# Guide d'Authentification et de Suivi de Commandes

## 🔐 Système d'Authentification

### Qui peut se connecter ?

#### ✅ **Clients (Customers)**
- **Peuvent se connecter** : Oui, optionnel
- **Accès** : 
  - Navigation du site
  - Ajout au panier
  - Passage de commande (avec ou sans compte)
  - Suivi de commandes personnelles
  - Gestion du profil
  - Liste de favoris
- **Inscription** : Via `/register` ou `/inscription`
- **Connexion** : Via `/login` ou `/connexion`

#### ✅ **Affiliés (Parrains)**
- **Peuvent se connecter** : Oui, obligatoire pour le dashboard
- **Accès** :
  - Dashboard affilié (`/affiliate/dashboard`)
  - Génération de liens d'affiliation
  - Suivi des commissions
  - Statistiques de performance
- **Inscription** : Via `/affiliate-register` ou `/inscription-parrain`
- **Connexion** : Via `/login` (même système que les clients)

#### ✅ **Administrateurs**
- **Peuvent se connecter** : Oui, obligatoire
- **Accès** :
  - Dashboard admin (`/admin`)
  - Gestion des produits
  - Gestion des commandes
  - Gestion des utilisateurs
  - Gestion des affiliés
  - Statistiques et rapports
- **Connexion** : Via `/login` (même système, rôle géré par `user_profiles.role`)

### Qui ne peut PAS se connecter ?

#### ❌ **Visiteurs anonymes**
- **Peuvent naviguer** : Oui, sans restriction
- **Peuvent acheter** : Oui, sans compte (commande en tant qu'invité)
- **Peuvent suivre leur commande** : Oui, avec un code de suivi unique

## 📦 Système de Suivi de Commandes

### Code de Suivi Unique

Chaque commande génère **automatiquement** :
1. **`order_number`** : Format `CMD-2024-001` (pour référence interne)
2. **`tracking_code`** : Code unique aléatoire de 8 caractères (ex: `AHM-7X9K2L`) pour le suivi public

### Utilisation du Code de Suivi

#### Pour les clients connectés :
- Accès automatique à toutes leurs commandes via `/account` → Onglet "Commandes"
- Pas besoin du code de suivi (mais disponible)

#### Pour les clients non connectés (invités) :
- Reçoivent le `tracking_code` par email après la commande
- Peuvent suivre leur commande via `/track-order` ou `/suivre-commande`
- Entrent le code pour voir le statut de leur commande

### Format du Code de Suivi
- **Format** : `AHM-XXXXXX` (6 caractères aléatoires après le préfixe)
- **Exemple** : `AHM-7X9K2L`, `AHM-A3B8C9`
- **Génération** : Automatique lors de la création de la commande

## 💳 Méthodes de Paiement

### 1. Mobile Money
- **Opérateurs** : MTN Mobile Money, Moov Money, Flooz
- **Statut** : `payment_status = 'pending'` → `'paid'` après confirmation
- **Référence** : Stockée dans `payment_reference`
- **Processus** :
  1. Client entre son numéro Mobile Money
  2. Reçoit une demande de paiement
  3. Confirme le paiement
  4. Admin valide le paiement
  5. Commande passe en statut `processing`

### 2. Paiement à la Livraison
- **Statut** : `payment_status = 'pending'` jusqu'à la livraison
- **Processus** :
  1. Client choisit "Paiement à la livraison"
  2. Commande créée avec `payment_status = 'pending'`
  3. Livreur collecte le paiement à la livraison
  4. Admin met à jour `payment_status = 'paid'` après réception
  5. Commande passe en statut `delivered`

### 3. Carte Bancaire (Optionnel)
- **Statut** : `payment_status = 'paid'` immédiatement si transaction réussie
- **Processus** : Intégration avec passerelle de paiement (à configurer)

## 🔔 Système de Notifications

### Notifications Admin

#### Email
- **Déclencheur** : Nouvelle commande créée
- **Contenu** :
  - Numéro de commande
  - Nom du client
  - Montant total
  - Méthode de paiement
  - Lien vers le dashboard admin
- **Configuration** : Via Supabase Edge Functions ou service externe (SendGrid, Mailgun, etc.)

#### Dashboard Admin
- **Affichage** : Badge de notification en temps réel
- **Emplacement** : Header du dashboard admin
- **Contenu** :
  - Nombre de nouvelles commandes
  - Liste des commandes récentes
  - Alertes importantes (paiements en attente, etc.)

### Notifications Client

#### Email
- **Déclencheur** : 
  - Commande créée (avec code de suivi)
  - Statut de commande changé
  - Commande expédiée (avec numéro de suivi)
  - Commande livrée
- **Contenu** :
  - Détails de la commande
  - Code de suivi (pour invités)
  - Statut actuel
  - Lien de suivi

## 📋 Workflow Complet

### Commande avec Compte
1. Client connecté ajoute des produits au panier
2. Passe à la caisse (`/checkout`)
3. Choisit méthode de paiement
4. Confirme la commande
5. **Notification admin** (email + dashboard)
6. Client voit sa commande dans `/account`
7. Admin traite la commande
8. Client reçoit notification de changement de statut

### Commande sans Compte (Invité)
1. Visiteur ajoute des produits au panier
2. Passe à la caisse (`/checkout`)
3. Remplit ses informations (nom, email, téléphone)
4. Choisit méthode de paiement
5. Confirme la commande
6. **Reçoit email avec `tracking_code`**
7. **Notification admin** (email + dashboard)
8. Peut suivre sa commande avec le code via `/track-order`
9. Admin traite la commande
10. Client reçoit notification de changement de statut

## 🔧 Configuration Technique

### Tables Supabase
- `orders` : Contient `order_number` et `tracking_code`
- `user_profiles` : Contient `role` ('customer', 'affiliate', 'admin')
- `notifications` : Table pour les notifications (à créer)

### Fonctions SQL
- `generate_order_number()` : Génère automatiquement `order_number`
- `generate_tracking_code()` : Génère automatiquement `tracking_code`
- `notify_admin_on_order()` : Trigger pour notifier l'admin (à créer)

### Services Frontend
- `authService.ts` : Gestion authentification
- `orderService.ts` : Gestion commandes
- `notificationService.ts` : Gestion notifications (à créer)
