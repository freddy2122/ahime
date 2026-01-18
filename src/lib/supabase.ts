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

// ============================================
// TEST DE CONNEXION SUPABASE
// ============================================
// Ce test s'exécute automatiquement au chargement de l'application
// Regardez la console du navigateur pour voir les résultats
// ============================================

const testSupabaseConnection = async () => {
  console.log('')
  console.log('🔍 ============================================')
  console.log('🔍 TEST DE CONNEXION SUPABASE')
  console.log('🔍 ============================================')
  console.log('')

  // Test 1: Variables d'environnement
  console.log('📋 Test 1: Variables d\'environnement')
  console.log('  - VITE_SUPABASE_URL:', supabaseUrl ? `✅ ${supabaseUrl.substring(0, 40)}...` : '❌ MANQUANT')
  console.log('  - VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? `✅ Présente (${supabaseAnonKey.substring(0, 20)}...)` : '❌ MANQUANTE')
  
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    console.log('')
    console.log('❌ ÉCHEC: Variables d\'environnement manquantes!')
    console.log('📝 Solution: Créez frontend/.env avec:')
    console.log('   VITE_SUPABASE_URL=https://votre-projet.supabase.co')
    console.log('   VITE_SUPABASE_ANON_KEY=votre-clé-anon')
    console.log('   Puis redémarrez le serveur (npm run dev)')
    console.log('')
    return
  }

  // Test 2: Connexion à Supabase
  console.log('')
  console.log('📋 Test 2: Connexion à Supabase')
  try {
    const { data, error } = await supabase.from('categories').select('count').limit(1)
    
    if (error) {
      console.log('  ❌ Erreur:', error.message)
      console.log('  Code:', error.code)
      console.log('')
      console.log('❌ ÉCHEC: Impossible de se connecter à Supabase')
      console.log('📝 Vérifiez que:')
      console.log('   1. Les scripts SQL ont été exécutés dans Supabase')
      console.log('   2. L\'URL et la clé sont correctes')
      console.log('   3. Votre projet Supabase est actif (pas suspendu)')
      console.log('   4. La table "categories" existe')
      console.log('')
      return
    }
    
    console.log('  ✅ Connexion réussie!')
  } catch (err: any) {
    console.log('  ❌ Exception:', err.message)
    console.log('')
    console.log('❌ ÉCHEC: Erreur réseau')
    console.log('📝 Vérifiez votre connexion internet')
    console.log('')
    return
  }

  // Test 3: Authentification
  console.log('')
  console.log('📋 Test 3: Service d\'authentification')
  try {
    const { data: { session } } = await supabase.auth.getSession()
    console.log('  ✅ Service auth accessible')
    console.log('  - Session actuelle:', session ? '✅ Connecté' : '❌ Non connecté')
    if (session?.user) {
      console.log('  - User ID:', session.user.id)
      console.log('  - Email:', session.user.email)
    }
  } catch (err: any) {
    console.log('  ❌ Erreur:', err.message)
  }

  // Test 4: Tables principales
  console.log('')
  console.log('📋 Test 4: Vérification des tables')
  const tables = ['categories', 'products', 'user_profiles', 'orders']
  
  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select('count').limit(1)
      if (error) {
        console.log(`  ❌ Table "${table}":`, error.message)
      } else {
        console.log(`  ✅ Table "${table}": Accessible`)
      }
    } catch (err: any) {
      console.log(`  ❌ Table "${table}":`, err.message)
    }
  }

  // Résumé final
  console.log('')
  console.log('✅ ============================================')
  console.log('✅ TESTS TERMINÉS')
  console.log('✅ ============================================')
  console.log('')
  console.log('💡 Si tous les tests sont ✅, Supabase est bien configuré!')
  console.log('💡 Si des tests sont ❌, suivez les instructions ci-dessus')
  console.log('')
}

// Exécuter le test au chargement (uniquement en développement)
if (import.meta.env.DEV) {
  // Attendre un peu pour que tout soit chargé
  setTimeout(() => {
    testSupabaseConnection()
  }, 1000)
}
