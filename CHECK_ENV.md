# 🔍 Vérifier la Configuration Supabase

Si l'inscription ne fonctionne pas, vérifiez ces points :

## 1. Vérifier les Variables d'Environnement

### Créer le fichier `.env`

Dans le dossier `frontend/`, créez un fichier `.env` :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-clé-anon-publique
```

### Où trouver ces valeurs ?

1. Allez dans votre **Supabase Dashboard**
2. Cliquez sur **Settings** > **API**
3. Copiez :
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### Vérifier que le fichier est bien lu

1. Redémarrez le serveur de développement :
   ```bash
   # Arrêtez le serveur (Ctrl+C)
   npm run dev
   ```

2. Ouvrez la console du navigateur (F12)
3. Vérifiez qu'il n'y a pas d'avertissement "Les variables d'environnement Supabase sont manquantes"

## 2. Vérifier que Supabase est Configuré

### Vérifier les tables

1. Allez dans **Table Editor** dans Supabase
2. Vérifiez que ces tables existent :
   - ✅ `user_profiles`
   - ✅ `auth.users` (table système Supabase)

### Vérifier le trigger

1. Allez dans **SQL Editor**
2. Exécutez cette requête pour vérifier que le trigger existe :
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
   ```
3. Si rien ne s'affiche, réexécutez `supabase-complete-setup.sql`

## 3. Vérifier les Paramètres d'Authentification

### Activer l'inscription par email

1. Allez dans **Authentication** > **Providers** dans Supabase
2. Vérifiez que **Email** est activé
3. Vérifiez les paramètres :
   - **Enable email confirmations** : Peut être activé ou désactivé
   - Si activé, l'utilisateur doit confirmer son email avant de se connecter
   - Si désactivé, l'utilisateur peut se connecter immédiatement

### Vérifier les emails (si confirmation activée)

1. Allez dans **Authentication** > **Email Templates**
2. Vérifiez que les templates sont configurés
3. Vérifiez votre boîte email (et spam) pour le lien de confirmation

## 4. Tester la Connexion

### Test simple dans la console

Ouvrez la console du navigateur (F12) et exécutez :

```javascript
// Vérifier que Supabase est bien chargé
console.log(window.supabase || 'Supabase non chargé')

// Tester une requête simple
import { supabase } from './lib/supabase'
const { data, error } = await supabase.from('categories').select('count')
console.log('Test Supabase:', { data, error })
```

## 5. Vérifier les Erreurs dans la Console

1. Ouvrez la console du navigateur (F12)
2. Allez dans l'onglet **Console**
3. Essayez de vous inscrire
4. Regardez les erreurs affichées

### Erreurs courantes

- **"Failed to fetch"** → Variables d'environnement incorrectes ou Supabase non accessible
- **"Invalid API key"** → Clé anon incorrecte
- **"User already registered"** → L'email est déjà utilisé
- **"Email not confirmed"** → Vérifiez votre email pour le lien de confirmation

## 6. Vérifier dans Supabase

### Vérifier si l'utilisateur a été créé

1. Allez dans **Authentication** > **Users** dans Supabase
2. Vérifiez si votre utilisateur apparaît dans la liste
3. Si oui, vérifiez :
   - **Email confirmed** : doit être `true` si la confirmation est désactivée
   - **Created at** : date de création

### Vérifier le profil utilisateur

1. Allez dans **Table Editor** > **user_profiles**
2. Vérifiez si votre profil a été créé automatiquement
3. Si non, le trigger `on_auth_user_created` ne fonctionne pas

## 7. Désactiver la Confirmation d'Email (pour tester)

Si vous voulez tester rapidement sans confirmation d'email :

1. Allez dans **Authentication** > **Providers** > **Email**
2. Désactivez **"Enable email confirmations"**
3. Sauvegardez
4. Réessayez de vous inscrire

⚠️ **Note** : En production, il est recommandé d'activer la confirmation d'email pour la sécurité.

## 8. Debug Avancé

### Activer les logs Supabase

Dans `frontend/src/lib/supabase.ts`, ajoutez :

```typescript
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// Log pour debug
console.log('Supabase config:', {
  url: supabaseUrl ? '✅ Configuré' : '❌ Manquant',
  key: supabaseAnonKey ? '✅ Configuré' : '❌ Manquant'
})
```

---

## ✅ Checklist

- [ ] Fichier `.env` créé dans `frontend/`
- [ ] Variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` configurées
- [ ] Serveur redémarré après création du `.env`
- [ ] Tables `user_profiles` et `auth.users` existent
- [ ] Trigger `on_auth_user_created` existe
- [ ] Provider Email activé dans Supabase
- [ ] Pas d'erreurs dans la console du navigateur
- [ ] Utilisateur apparaît dans Authentication > Users
- [ ] Profil créé dans user_profiles

---

**Si tout est vérifié et que ça ne fonctionne toujours pas, consultez les logs dans la console du navigateur et partagez l'erreur exacte.**
