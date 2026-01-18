# 🔍 Diagnostic - Problème d'Inscription

Si rien n'apparaît dans la base de données après inscription, suivez ce guide étape par étape.

## ✅ Checklist Rapide

### 1. Variables d'Environnement

**Vérifiez que le fichier `.env` existe dans `frontend/` :**

```bash
cd frontend
ls -la .env
```

**Si le fichier n'existe pas, créez-le :**

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-clé-anon-publique
```

**Où trouver ces valeurs :**
1. Supabase Dashboard → Settings → API
2. Copiez le **Project URL** et la clé **anon public**

**⚠️ IMPORTANT : Redémarrez le serveur après création/modification du `.env`**

```bash
# Arrêtez le serveur (Ctrl+C)
npm run dev
```

### 2. Vérifier la Console du Navigateur

1. Ouvrez la console (F12 ou Cmd+Option+I)
2. Regardez les messages :
   - ✅ "Variables d'environnement Supabase configurées" → OK
   - ❌ "Variables d'environnement Supabase manquantes" → Problème
   - ✅ "Connexion à Supabase réussie!" → OK
   - ❌ "Erreur de connexion à Supabase" → Problème

### 3. Tester l'Inscription avec Debug

1. Ouvrez la console (F12)
2. Allez sur `/register`
3. Remplissez le formulaire
4. Cliquez sur "Créer mon compte"
5. **Regardez les messages dans la console :**
   - 🔄 "Début de l'inscription..."
   - 📤 "Envoi de la requête à Supabase..."
   - 📥 "Réponse de Supabase:"
   - ✅ ou ❌ selon le résultat

### 4. Vérifier dans Supabase

#### A. Authentication > Users

1. Allez dans Supabase Dashboard
2. **Authentication** → **Users**
3. Vérifiez si votre utilisateur apparaît
4. Si oui, notez :
   - **Email confirmed** : true/false
   - **Created at** : date

#### B. Table Editor > user_profiles

1. **Table Editor** → **user_profiles**
2. Vérifiez si votre profil existe
3. Si non, le trigger `on_auth_user_created` ne fonctionne pas

#### C. SQL Editor - Vérifier manuellement

Exécutez cette requête pour voir tous les utilisateurs :

```sql
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  u.created_at,
  up.first_name,
  up.last_name,
  up.role,
  up.status
FROM auth.users u
LEFT JOIN user_profiles up ON u.id = up.id
ORDER BY u.created_at DESC
LIMIT 10;
```

### 5. Vérifier les Scripts SQL

#### A. Vérifier que les tables existent

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_profiles', 'categories', 'products', 'orders');
```

#### B. Vérifier que le trigger existe

```sql
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

Si rien ne s'affiche, réexécutez `supabase-complete-setup.sql`

### 6. Vérifier les Paramètres d'Authentification

1. **Authentication** → **Providers** → **Email**
2. Vérifiez que **Email** est activé
3. Vérifiez **"Enable email confirmations"** :
   - Si **activé** : L'utilisateur doit confirmer son email avant de se connecter
   - Si **désactivé** : L'utilisateur peut se connecter immédiatement

### 7. Test de Connexion Directe

Dans la console du navigateur (F12), exécutez :

```javascript
// Importer Supabase (si possible)
import { supabase } from './src/lib/supabase'

// Tester une requête simple
const { data, error } = await supabase.from('categories').select('count')
console.log('Test Supabase:', { data, error })

// Tester l'authentification
const { data: authData, error: authError } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'test123456'
})
console.log('Test Auth:', { authData, authError })
```

## 🐛 Erreurs Courantes et Solutions

### Erreur: "Variables d'environnement Supabase manquantes"

**Solution :**
1. Créez `frontend/.env`
2. Ajoutez vos clés Supabase
3. Redémarrez le serveur

### Erreur: "Failed to fetch" ou "Network error"

**Solutions :**
1. Vérifiez votre connexion internet
2. Vérifiez que l'URL Supabase est correcte (pas de typo)
3. Vérifiez que votre projet Supabase est actif (pas suspendu)
4. Vérifiez les CORS dans Supabase Settings

### Erreur: "Invalid API key"

**Solution :**
1. Vérifiez que vous utilisez la clé **anon public** (pas la service_role)
2. Recopiez la clé depuis Supabase Dashboard
3. Vérifiez qu'il n'y a pas d'espaces avant/après dans le `.env`

### Utilisateur créé mais pas de profil dans user_profiles

**Solution :**
1. Vérifiez que le trigger `on_auth_user_created` existe (voir étape 5.B)
2. Si le trigger n'existe pas, réexécutez `supabase-complete-setup.sql`
3. Créez manuellement le profil si nécessaire :

```sql
-- Remplacer 'email@exemple.com' par votre email
INSERT INTO user_profiles (id, first_name, last_name, role, status)
SELECT 
  u.id,
  u.raw_user_meta_data->>'first_name',
  u.raw_user_meta_data->>'last_name',
  'customer',
  'active'
FROM auth.users u
WHERE u.email = 'email@exemple.com'
AND NOT EXISTS (SELECT 1 FROM user_profiles WHERE id = u.id);
```

### Email de confirmation requis

**Si la confirmation d'email est activée :**
1. Vérifiez votre boîte email (et spam)
2. Cliquez sur le lien de confirmation
3. Puis connectez-vous

**Pour désactiver temporairement (test) :**
1. Authentication → Providers → Email
2. Désactivez "Enable email confirmations"
3. Sauvegardez

## 📝 Rapport de Diagnostic

Si rien ne fonctionne, collectez ces informations :

1. **Console du navigateur** : Copiez tous les messages d'erreur
2. **Variables d'environnement** : Vérifiez que `.env` existe et contient les bonnes valeurs (sans afficher les clés complètes)
3. **Supabase** : 
   - L'utilisateur apparaît-il dans Authentication > Users ?
   - Le profil apparaît-il dans user_profiles ?
4. **Scripts SQL** : Avez-vous exécuté tous les scripts SQL ?
5. **Erreurs spécifiques** : Quel message d'erreur exact voyez-vous ?

---

**Une fois ces vérifications faites, vous devriez identifier le problème !**
