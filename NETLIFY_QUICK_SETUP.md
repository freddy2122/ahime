# ⚡ Configuration Rapide Netlify - Variables d'Environnement

## 🚨 Problème
```
❌ Configuration Supabase manquante
  - URL: ❌ MANQUANT
  - Key: ❌ MANQUANTE
```

## ✅ Solution en 3 Étapes

### Étape 1 : Ouvrir Netlify Dashboard
1. Allez sur [https://app.netlify.com](https://app.netlify.com)
2. Sélectionnez votre site (`ahimey`)

### Étape 2 : Ajouter les Variables
1. Cliquez sur **Site settings** (Paramètres du site)
2. Dans le menu de gauche, cliquez sur **Environment variables**
3. Cliquez sur **Add a variable** (Ajouter une variable)

**Variable 1 :**
- **Key** : `VITE_SUPABASE_URL`
- **Value** : `https://niwkiaukvhivclmnjsce.supabase.co`
- **Scopes** : ✅ Production, ✅ Deploy previews, ✅ Branch deploys
- Cliquez sur **Save**

**Variable 2 :**
- **Key** : `VITE_SUPABASE_ANON_KEY`
- **Value** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pd2tpYXVrdmhpdmNsbW5qc2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MDgyMzksImV4cCI6MjA4NDI4NDIzOX0.7IcFn0ZM8pao1vSoyWNN1cB6fV1K2-fX9Hzg63hsxHQ`
- **Scopes** : ✅ Production, ✅ Deploy previews, ✅ Branch deploys
- Cliquez sur **Save**

### Étape 3 : Redéployer
1. Allez dans l'onglet **Deploys**
2. Cliquez sur **Trigger deploy** (Déclencher un déploiement)
3. Sélectionnez **Deploy site** (Déployer le site)
4. Attendez la fin du déploiement (2-3 minutes)

## ✅ Vérification

Après le déploiement :
1. Allez sur votre site Netlify
2. Ouvrez la console (F12)
3. Vous devriez voir : `✅ Variables d'environnement Supabase configurées`

---

## 📸 Emplacement dans Netlify

```
Netlify Dashboard
  └─ Votre site (ahimey)
      └─ Site settings
          └─ Environment variables
              └─ Add a variable
```

---

**Une fois configuré, votre site Netlify pourra se connecter à Supabase !**
