# Guide des Logos Ahimè

## 📁 Structure des fichiers

Tous les logos sont disponibles dans différents formats et tailles :

### Formats disponibles
- **SVG** : Format vectoriel (dans `/public/logo/`)
- **PNG** : Format raster avec transparence (dans `/public/logo/output/`)
- **JPG** : Format raster avec fond blanc (dans `/public/logo/output/`)

### Tailles disponibles
- 16x16 px (favicon)
- 32x32 px (favicon)
- 64x64 px (icône)
- 128x128 px (icône)
- 256x256 px (icône)
- 512x512 px (réseaux sociaux)
- 1024x1024 px (haute résolution)

## 🎨 Versions de couleurs

### 1. Logo Blanc (logo-white-bg)
- **Fond** : Blanc
- **Texte** : Bleu nuit (#1e2d5f)
- **Points** : Orange et bleu
- **Usage** : Documents, impressions sur fond clair

### 2. Logo Transparent (logo-transparent)
- **Fond** : Transparent
- **Texte** : Bleu nuit (#1e2d5f)
- **Points** : Orange et bleu
- **Usage** : Sites web, applications, superpositions

### 3. Logo Fond Sombre (logo-dark-bg)
- **Fond** : Bleu nuit (#1e2d5f)
- **Texte** : Blanc
- **Points** : Orange et blanc
- **Usage** : Headers sombres, applications dark mode

### 4. Logo Coloré (logo-colored)
- **Fond** : Transparent
- **Texte** : "ahi" en bleu, "mè" en orange
- **Points** : Orange et bleu
- **Usage** : Version créative, marketing

### 5. Logo Fond Orange (logo-orange-bg)
- **Fond** : Orange (#ff9000)
- **Texte** : Blanc
- **Points** : Blanc et bleu
- **Usage** : Accents, call-to-action

## 📱 Utilisation recommandée par taille

| Taille | Usage |
|--------|-------|
| 16x16, 32x32 | Favicons, icônes de barre d'outils |
| 64x64, 128x128 | Icônes d'application, notifications |
| 256x256 | Icônes de bureau, app stores |
| 512x512 | Réseaux sociaux (Facebook, Twitter) |
| 1024x1024 | Bannières, haute résolution, impressions |

## 🔄 Régénérer les logos

Pour régénérer tous les logos en PNG et JPG :

```bash
npm run generate-logos
```

Ou directement :

```bash
node scripts/generate-logos.js
```

## 📝 Notes importantes

- Les fichiers PNG conservent la transparence
- Les fichiers JPG ont un fond blanc
- Les fichiers SVG sont vectoriels et s'adaptent à toutes les tailles
- Pour les favicons, utilisez les versions 16x16 ou 32x32 en PNG

## 🎯 Exemples d'utilisation

### Favicon
```html
<link rel="icon" type="image/png" sizes="32x32" href="/logo/output/logo-transparent-32x32.png">
```

### Réseaux sociaux
- Facebook : 512x512 PNG
- Twitter : 512x512 PNG
- Instagram : 512x512 PNG

### Application mobile
- iOS : 1024x1024 PNG
- Android : 512x512 PNG
