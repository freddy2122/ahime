/**
 * Script pour générer les logos en PNG et JPG
 * Nécessite: npm install sharp
 * Usage: node scripts/generate-logos.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoDir = path.join(__dirname, '../public/logo');
const outputDir = path.join(logoDir, 'output');

// Créer le dossier de sortie
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Tailles à générer
const sizes = [16, 32, 64, 128, 256, 512, 1024];

// Fonction pour générer les logos
async function generateLogos() {
  const svgFiles = fs.readdirSync(logoDir).filter(file => file.endsWith('.svg'));
  
  console.log('🎨 Génération des logos...\n');
  
  for (const svgFile of svgFiles) {
    const svgPath = path.join(logoDir, svgFile);
    const baseName = path.basename(svgFile, '.svg');
    
    console.log(`📄 Traitement: ${svgFile}`);
    
    // Charger le SVG
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Générer PNG pour chaque taille
    for (const size of sizes) {
      const pngPath = path.join(outputDir, `${baseName}-${size}x${size}.png`);
      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(pngPath);
      console.log(`  ✓ PNG ${size}x${size} créé`);
    }
    
    // Générer JPG pour chaque taille (avec fond blanc)
    for (const size of sizes) {
      const jpgPath = path.join(outputDir, `${baseName}-${size}x${size}.jpg`);
      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .jpeg({ quality: 95 })
        .toFile(jpgPath);
      console.log(`  ✓ JPG ${size}x${size} créé`);
    }
    
    console.log('');
  }
  
  console.log('✅ Tous les logos ont été générés dans:', outputDir);
}

// Exécuter
generateLogos().catch(console.error);
