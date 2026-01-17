# Lorele Commerce - Frontend

Frontend du site e-commerce Lorele Commerce pour le Bénin, construit avec React, TypeScript, Vite et Tailwind CSS.

## 🎨 Design

Le design est inspiré des couleurs du Bénin et de l'Afrique :
- **Vert** : Couleur principale (inspiré du drapeau béninois)
- **Jaune** : Accents et highlights
- **Rouge** : Éléments d'action importants
- **Tons terreux** : Pour un aspect chaleureux et authentique

### Polices
- **Playfair Display** : Pour les titres et éléments de marque (élégant, chic)
- **Inter** : Pour le corps de texte (moderne, lisible)

## 🚀 Installation

```bash
npm install
```

## 🛠️ Développement

```bash
npm run dev
```

Le serveur de développement sera accessible sur `http://localhost:3000`

## 📦 Build

```bash
npm run build
```

## ✨ Fonctionnalités

### Navbar
- **Mega Menu** : Menu déroulant avec catégories et sous-catégories
- Images représentatives pour chaque catégorie
- Recherche intégrée
- Panier avec badge de notification
- Design responsive avec menu mobile

### Footer
- Section newsletter
- Liens organisés par catégories
- Informations de contact
- Réseaux sociaux
- Design épuré et moderne

### Animations
- Transitions fluides avec Framer Motion
- Animations au survol
- Effets de scroll
- Menu mobile animé

## 🎯 Structure

```
src/
├── components/
│   └── Layout/
│       ├── Layout.tsx      # Layout principal
│       ├── Navbar.tsx     # Barre de navigation avec mega menu
│       ├── MegaMenu.tsx   # Composant mega menu
│       └── Footer.tsx     # Pied de page
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Personnalisation

Les couleurs peuvent être modifiées dans `tailwind.config.js` :
- `benin-green` : Palette de verts
- `benin-yellow` : Palette de jaunes
- `benin-red` : Palette de rouges
- `benin-earth` : Tons terreux
