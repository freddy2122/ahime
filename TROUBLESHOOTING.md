# 🔧 Guide de Dépannage - Erreurs Courantes

## ❌ Erreur 1 : "Configuration Supabase manquante" sur Netlify

### Problème
```
❌ Configuration Supabase manquante. Vérifiez votre fichier .env dans frontend/ et redémarrez le serveur.
```

### Cause
Les variables d'environnement ne sont pas configurées dans Netlify.

### Solution

1. **Récupérer vos clés Supabase** :
   - Allez dans Supabase Dashboard → Settings → API
   - Copiez le **Project URL** et la clé **anon public**

2. **Configurer dans Netlify** :
   - Netlify Dashboard → Votre site → **Site settings**
   - **Environment variables** (Variables d'environnement)
   - Cliquez sur **Add a variable**
   - Ajoutez :
     - **Key** : `VITE_SUPABASE_URL`
     - **Value** : `https://niwkiaukvhivclmnjsce.supabase.co`
   - Ajoutez :
     - **Key** : `VITE_SUPABASE_ANON_KEY`
     - **Value** : Votre clé anon complète
   - **Scopes** : Sélectionnez tous (Production, Deploy previews, Branch deploys)
   - Cliquez sur **Save**

3. **Redéployer** :
   - Allez dans **Deploys**
   - Cliquez sur **Trigger deploy** > **Deploy site**

4. **Vérifier** :
   - Ouvrez la console sur votre site Netlify
   - Vous devriez voir : "✅ Variables d'environnement Supabase configurées"

---

## ❌ Erreur 2 : "Invalid login credentials" en local

### Problème
```
❌ Invalid login credentials
POST https://niwkiaukvhivclmnjsce.supabase.co/auth/v1/token?grant_type=password 400 (Bad Request)
```

### Causes possibles

1. **L'utilisateur n'existe pas dans Supabase**
2. **Le mot de passe est incorrect**
3. **L'email n'est pas confirmé** (si confirmation activée)

### Solutions

#### Solution A : Vérifier si l'utilisateur existe

1. Allez dans **Supabase Dashboard** → **Authentication** → **Users**
2. Recherchez `admin@admin.com`
3. Si l'utilisateur n'existe pas → Créez-le (voir Solution B)
4. Si l'utilisateur existe → Vérifiez :
   - **Email confirmed** : doit être `true` (ou désactivez la confirmation)
   - **Created at** : date de création

#### Solution B : Créer l'utilisateur admin

**Option 1 : Via l'interface Supabase (Recommandé)**

1. **Supabase Dashboard** → **Authentication** → **Users**
2. Cliquez sur **Add user** (ou **Ajouter un utilisateur**)
3. Remplissez :
   - **Email** : `admin@admin.com`
   - **Password** : Votre mot de passe
   - **Auto Confirm User** : ✅ (cochez cette case)
4. Cliquez sur **Create user**

5. **Créer le profil** :
   - Allez dans **Table Editor** → **user_profiles**
   - Cliquez sur **Insert row** (ou **Insérer une ligne**)
   - Remplissez :
     - **id** : Copiez l'ID de l'utilisateur depuis Authentication > Users
     - **first_name** : `Admin`
     - **last_name** : `Ahimè`
     - **role** : `admin`
     - **status** : `active`
   - Cliquez sur **Save**

**Option 2 : Via SQL (Rapide)**

1. Allez dans **SQL Editor**
2. Exécutez ce script (remplacez le mot de passe) :

```sql
-- Créer l'utilisateur admin
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@admin.com',
  crypt('VOTRE_MOT_DE_PASSE', gen_salt('bf')), -- Remplacez VOTRE_MOT_DE_PASSE
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"first_name":"Admin","last_name":"Ahimè"}',
  false,
  '',
  ''
)
ON CONFLICT (email) DO NOTHING
RETURNING id;

-- Créer le profil admin (remplacez l'ID par celui retourné ci-dessus)
INSERT INTO user_profiles (id, first_name, last_name, role, status)
SELECT 
  u.id,
  'Admin',
  'Ahimè',
  'admin',
  'active'
FROM auth.users u
WHERE u.email = 'admin@admin.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin', status = 'active';
```

**Option 3 : Via l'inscription sur le site**

1. Allez sur `/register`
2. Inscrivez-vous avec `admin@admin.com`
3. Allez dans Supabase → **Table Editor** → **user_profiles**
4. Trouvez votre utilisateur et modifiez `role` en `admin`

#### Solution C : Désactiver la confirmation d'email

Si l'email n'est pas confirmé :

1. **Supabase Dashboard** → **Authentication** → **Providers** → **Email**
2. Désactivez **"Enable email confirmations"**
3. Sauvegardez
4. Réessayez de vous connecter

Ou confirmez manuellement :

1. **Authentication** → **Users**
2. Trouvez votre utilisateur
3. Cliquez sur **"..."** → **"Confirm email"**

---

## ✅ Vérification Rapide

### Checklist pour la connexion

- [ ] Variables d'environnement configurées (local ET Netlify)
- [ ] Utilisateur existe dans Supabase (Authentication > Users)
- [ ] Email confirmé (ou confirmation désactivée)
- [ ] Profil créé dans user_profiles
- [ ] Rôle = `admin` dans user_profiles
- [ ] Mot de passe correct

### Test de connexion

1. Ouvrez la console (F12)
2. Allez sur `/login`
3. Entrez vos identifiants
4. Regardez les logs dans la console :
   - ✅ "Connexion réussie!" → OK
   - ❌ "Invalid login credentials" → Utilisateur n'existe pas ou mot de passe incorrect

---

## 🔍 Debug Avancé

### Vérifier l'utilisateur dans Supabase

```sql
-- Voir tous les utilisateurs
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  u.created_at,
  up.role,
  up.status
FROM auth.users u
LEFT JOIN user_profiles up ON u.id = up.id
ORDER BY u.created_at DESC;
```

### Réinitialiser le mot de passe

1. Allez sur `/forgot-password`
2. Entrez votre email
3. Vérifiez votre boîte email
4. Cliquez sur le lien de réinitialisation

---

**Une fois ces étapes suivies, la connexion devrait fonctionner !**
