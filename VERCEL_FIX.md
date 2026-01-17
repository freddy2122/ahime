# Guide Complet : Résolution de l'erreur 404 sur Vercel

## 1. 🔧 La Solution

### Fichier `vercel.json` simplifié

J'ai simplifié le fichier `vercel.json` pour ne garder que l'essentiel :

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Pourquoi cette simplification ?**
- Vercel détecte automatiquement Vite et configure le build
- Les paramètres `buildCommand`, `outputDirectory`, etc. sont redondants
- Seuls les `rewrites` sont nécessaires pour React Router

## 2. 🎯 La Cause Racine

### Le Problème : SPA vs Serveur Web Traditionnel

**Ce qui se passe actuellement :**
1. Vous tapez `https://ahimey.vercel.app/products` dans le navigateur
2. Le navigateur envoie une requête HTTP GET à `/products`
3. Vercel cherche un fichier physique `products.html` ou un dossier `products/`
4. ❌ Ce fichier n'existe pas → Erreur 404

**Ce qui devrait se passer :**
1. Vous tapez `https://ahimey.vercel.app/products`
2. Le navigateur envoie une requête HTTP GET à `/products`
3. ✅ Vercel redirige vers `/index.html` (grâce aux rewrites)
4. React Router charge et détecte l'URL `/products`
5. React Router affiche le composant `<Products />`

### Le Concept : Single Page Application (SPA)

**Application Web Traditionnelle (Multi-Page) :**
```
/products → products.html (fichier physique)
/about → about.html (fichier physique)
```
Chaque route = un fichier HTML différent

**Single Page Application (React Router) :**
```
/products → index.html → React Router gère la route
/about → index.html → React Router gère la route
```
Une seule page HTML, le routage est géré côté client par JavaScript

### Pourquoi cette erreur existe ?

**Protection du serveur :**
- Empêche l'accès à des fichiers inexistants
- Sécurité : évite l'exposition de la structure du serveur
- Performance : évite de chercher des fichiers qui n'existent pas

**Le problème :**
- Les SPA modernes n'ont qu'un seul fichier HTML (`index.html`)
- Toutes les routes sont gérées par JavaScript côté client
- Le serveur ne "comprend" pas ces routes virtuelles

## 3. 📚 Le Concept : Rewrites dans Vercel

### Mental Model

**Rewrites = Redirections invisibles**

```
Requête: /products
         ↓
    Rewrite Rule
         ↓
Réponse: /index.html (mais l'URL reste /products)
         ↓
    React Router
         ↓
Affiche: Composant Products
```

**Différence avec Redirects :**
- **Redirect** : Change l'URL dans la barre d'adresse (301/302)
- **Rewrite** : Garde l'URL, mais sert un autre fichier (invisible)

### Syntaxe des Rewrites

```json
{
  "rewrites": [
    {
      "source": "/(.*)",        // Pattern : toutes les routes
      "destination": "/index.html"  // Fichier à servir
    }
  ]
}
```

- `source`: Pattern de correspondance (regex)
  - `(.*)` = n'importe quel caractère, n'importe combien de fois
  - Capture toutes les routes possibles
- `destination`: Fichier à servir à la place

### Pourquoi `(.*)` ?

- `/` → correspond
- `/products` → correspond
- `/product/123` → correspond
- `/about/team` → correspond
- Tout chemin correspond, donc tout est redirigé vers `index.html`

## 4. ⚠️ Signes d'Alerte

### Indicateurs que vous avez ce problème :

1. **404 sur les routes directes**
   - ✅ `/` fonctionne
   - ❌ `/products` → 404
   - ❌ Rafraîchir la page → 404

2. **Navigation interne fonctionne**
   - Les liens `<Link>` fonctionnent
   - Mais les URLs directes ne fonctionnent pas

3. **Console du navigateur**
   ```
   GET https://ahimey.vercel.app/products 404 (Not Found)
   ```

### Code Smells à surveiller :

1. **Pas de `vercel.json`** pour une SPA React Router
2. **Configuration Vercel incorrecte**
   - Framework mal détecté
   - Output directory incorrect
3. **Routes avec paramètres dynamiques**
   - `/product/:id` nécessite aussi les rewrites

### Patterns similaires :

- **Netlify** : Nécessite `_redirects` ou `netlify.toml`
- **Apache** : Nécessite `.htaccess` avec mod_rewrite
- **Nginx** : Nécessite configuration `try_files`
- **GitHub Pages** : Nécessite `404.html` avec redirection

## 5. 🔄 Alternatives et Trade-offs

### Option 1 : Rewrites (Solution actuelle) ✅

**Avantages :**
- Simple et direct
- URL reste propre (`/products` reste `/products`)
- SEO-friendly (URLs propres)
- Fonctionne pour toutes les routes

**Inconvénients :**
- Nécessite configuration serveur
- Toutes les requêtes passent par `index.html`

### Option 2 : Hash Router (`HashRouter`)

**Changement dans App.tsx :**
```tsx
import { HashRouter as Router } from 'react-router-dom'
// Au lieu de BrowserRouter
```

**Avantages :**
- Pas besoin de configuration serveur
- Fonctionne partout (même GitHub Pages sans config)

**Inconvénients :**
- URLs moches : `/#/products` au lieu de `/products`
- Moins SEO-friendly
- Moins professionnel

### Option 3 : Server-Side Rendering (SSR)

**Avec Next.js ou Remix :**
- Chaque route = page serveur réelle
- Pas besoin de rewrites
- Meilleur SEO

**Inconvénients :**
- Migration complète nécessaire
- Plus complexe
- Plus de ressources serveur

### Option 4 : Static Site Generation (SSG)

**Avec Vite + SSG plugin :**
- Génère un fichier HTML par route au build
- `/products` → `products.html` réel

**Avantages :**
- Pas besoin de rewrites
- Performance maximale
- SEO parfait

**Inconvénients :**
- Routes dynamiques plus complexes
- Build plus long
- Plus de fichiers générés

## 📋 Checklist de Vérification

- [ ] `vercel.json` existe à la racine du projet
- [ ] `vercel.json` contient les rewrites
- [ ] Build local fonctionne (`npm run build`)
- [ ] `dist/index.html` existe après le build
- [ ] Configuration Vercel détecte Vite
- [ ] Output directory = `dist` (ou auto-détecté)
- [ ] Redéploiement effectué après modification

## 🚀 Prochaines Étapes

1. **Vérifier le déploiement** : Attendre le redéploiement automatique
2. **Tester les routes** : Essayer `/products`, `/about`, etc.
3. **Vérifier le rafraîchissement** : Rafraîchir la page sur une route
4. **Vérifier les logs** : Dashboard Vercel → Deployments → Logs

## 💡 Leçon Apprise

**Concept clé :** Les SPA modernes nécessitent une configuration serveur pour que toutes les routes pointent vers `index.html`. C'est le prix à payer pour avoir des URLs propres et un routage côté client fluide.

**Règle d'or :** Si vous utilisez `BrowserRouter` (ou équivalent), vous DEVEZ configurer les rewrites sur votre serveur/hébergeur.
