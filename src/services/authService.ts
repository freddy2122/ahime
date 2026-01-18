import { supabase } from '../lib/supabase'
import { User, Session } from '@supabase/supabase-js'

export interface SignUpData {
  email: string
  password: string
  first_name?: string
  last_name?: string
  phone?: string
}

export interface SignInData {
  email: string
  password: string
}

export const authService = {
  // Inscription
  async signUp(data: SignUpData) {
    console.log('🔵 authService.signUp appelé avec:', { email: data.email, hasPassword: !!data.password })
    console.log('🔵 Supabase URL:', import.meta.env.VITE_SUPABASE_URL?.substring(0, 30) + '...')
    console.log('🔵 Supabase Key existe:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
    
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone
          }
        }
      })

      console.log('🔵 Réponse Supabase signUp:', { 
        user: authData?.user ? '✅ User créé' : '❌ Pas de user',
        session: authData?.session ? '✅ Session créée' : '❌ Pas de session',
        error: error ? `❌ ${error.message}` : '✅ Pas d\'erreur'
      })

      if (error) {
        console.error('❌ Erreur Supabase signUp:', error)
        throw error
      }
      
      if (!authData) {
        console.error('❌ Aucune donnée retournée par Supabase')
        throw new Error('Aucune donnée retournée par Supabase')
      }

      return authData
    } catch (err) {
      console.error('❌ Exception dans authService.signUp:', err)
      throw err
    }
  },

  // Connexion
  async signIn(data: SignInData) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })

    if (error) throw error
    return authData
  },

  // Déconnexion
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Récupérer la session actuelle
  async getSession(): Promise<Session | null> {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  // Récupérer l'utilisateur actuel
  async getCurrentUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // Réinitialiser le mot de passe
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/change-password`
    })
    if (error) throw error
  },

  // Mettre à jour le mot de passe
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })
    if (error) throw error
  },

  // Écouter les changements d'authentification
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
