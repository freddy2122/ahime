import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Diagnostic détaillé
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ERREUR: Variables d\'environnement Supabase manquantes!')
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✅' : '❌ MANQUANT')
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅' : '❌ MANQUANT')
  console.error('📝 Créez un fichier .env dans frontend/ avec:')
  console.error('   VITE_SUPABASE_URL=https://votre-projet.supabase.co')
  console.error('   VITE_SUPABASE_ANON_KEY=votre-clé-anon')
  console.error('   Puis redémarrez le serveur (npm run dev)')
} else {
  console.log('✅ Variables d\'environnement Supabase configurées')
  console.log('URL:', supabaseUrl.substring(0, 30) + '...')
}

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

// Test de connexion au démarrage (en développement)
if (import.meta.env.DEV && supabaseUrl && supabaseAnonKey) {
  supabase.from('categories').select('count').limit(1)
    .then(({ error }) => {
      if (error) {
        console.error('❌ Erreur de connexion à Supabase:', error.message)
        console.error('Vérifiez que:')
        console.error('1. Les scripts SQL ont été exécutés dans Supabase')
        console.error('2. L\'URL et la clé sont correctes')
        console.error('3. Votre projet Supabase est actif')
      } else {
        console.log('✅ Connexion à Supabase réussie!')
      }
    })
    .catch(err => {
      console.error('❌ Erreur lors du test de connexion:', err)
    })
}
