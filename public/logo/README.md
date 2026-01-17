# Logos Ahimè

Ce dossier contient les différentes versions du logo "ahimè" en format SVG.

## Versions disponibles

- **logo-white-bg.svg** - Logo sur fond blanc
- **logo-transparent.svg** - Logo avec fond transparent
- **logo-dark-bg.svg** - Logo blanc sur fond bleu nuit
- **logo-colored.svg** - Logo avec couleurs alternées (bleu/orange)
- **logo-orange-bg.svg** - Logo blanc sur fond orange

## Génération des formats PNG et JPG

### Option 1: Utiliser le script Node.js (Recommandé)

1. Installer sharp:
```bash
npm install sharp
```

2. Exécuter le script:
```bash
node scripts/generate-logos.js
```

Le script générera automatiquement:
- PNG en tailles: 16x16, 32x32, 64x64, 128x128, 256x256, 512x512, 1024x1024
- JPG en tailles: 16x16, 32x32, 64x64, 128x128, 256x256, 512x512, 1024x1024

Les fichiers seront créés dans `public/logo/output/`

### Option 2: Utiliser un convertisseur en ligne

1. Allez sur https://cloudconvert.com/svg-to-png ou https://convertio.co/svg-png/
2. Uploadez les fichiers SVG
3. Choisissez les tailles souhaitées
4. Téléchargez les fichiers PNG/JPG

### Option 3: Utiliser Inkscape (ligne de commande)

```bash
# Installer Inkscape
brew install inkscape  # macOS
# ou
sudo apt-get install inkscape  # Linux

# Convertir en PNG
inkscape logo-white-bg.svg --export-filename=logo-white-bg-512x512.png --export-width=512 --export-height=512

# Convertir en JPG (via ImageMagick)
convert logo-white-bg-512x512.png logo-white-bg-512x512.jpg
```

## Structure des fichiers générés

```
output/
├── logo-white-bg-16x16.png
├── logo-white-bg-16x16.jpg
├── logo-white-bg-32x32.png
├── logo-white-bg-32x32.jpg
├── ...
├── logo-transparent-16x16.png
├── logo-transparent-16x16.jpg
└── ...
```

## Utilisation

- **PNG avec transparence**: Pour les sites web, applications
- **JPG avec fond blanc**: Pour les documents, impressions
- **PNG 16x16, 32x32**: Pour les favicons
- **PNG 512x512, 1024x1024**: Pour les réseaux sociaux, app stores
