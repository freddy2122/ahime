# 🔧 Configuration des Variables d'Environnement sur Netlify

## Problème
Sur Netlify, vous obtenez l'erreur : "Configuration Supabase manquante"

Cela signifie que les variables d'environnement ne sont pas configurées dans Netlify.

## Solution

### Étape 1 : Récupérer vos clés Supabase

1. Allez dans votre **Supabase Dashboard**
2. Cliquez sur **Settings** > **API**
3. Copiez :
   - **Project URL** : `https://xxxxx.supabase.co`
   - **anon public** key : `eyJhbGc...` (clé longue)

### Étape 2 : Configurer dans Netlify

1. Allez dans votre **Netlify Dashboard**
2. Sélectionnez votre site (`ahimey`)
3. Allez dans **Site settings** (ou **Paramètres du site**)
4. Dans le menu de gauche, cliquez sur **Environment variables** (ou **Variables d'environnement**)
5. Cliquez sur **Add a variable** (ou **Ajouter une variable**)
6. Ajoutez les deux variables :

   **Variable 1 :**
   - **Key** : `VITE_SUPABASE_URL`
   - **Value** : `https://niwkiaukvhivclmnjsce.supabase.co` (votre URL)
   - **Scopes** : Tous les environnements (Production, Deploy previews, Branch deploys)

   **Variable 2 :**
   - **Key** : `VITE_SUPABASE_ANON_KEY`
   - **Value** : Votre clé anon publique complète
   - **Scopes** : Tous les environnements

7. Cliquez sur **Save** (ou **Enregistrer**)

### Étape 3 : Redéployer

1. Après avoir ajouté les variables, allez dans **Deploys**
2. Cliquez sur **Trigger deploy** > **Deploy site**
3. Attendez que le déploiement se termine

### Étape 4 : Vérifier

1. Allez sur votre site Netlify
2. Ouvrez la console (F12)
3. Vous devriez voir : "✅ Variables d'environnement Supabase configurées"

---

## ⚠️ Important

- Les variables doivent commencer par `VITE_` pour être accessibles dans le code
- Ne partagez JAMAIS votre clé `service_role` (seulement `anon`)
- Les variables sont visibles dans le code compilé, c'est normal pour `VITE_*`

---

## 📸 Capture d'écran (Guide visuel)

```
Netlify Dashboard
  └─ Site settings
      └─ Environment variables
          └─ Add a variable
              ├─ Key: VITE_SUPABASE_URL
              │   Value: https://xxxxx.supabase.co
              │
              └─ Key: VITE_SUPABASE_ANON_KEY
                  Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

**Une fois configuré, votre site Netlify pourra se connecter à Supabase !**
