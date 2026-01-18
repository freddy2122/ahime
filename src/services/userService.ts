import { supabase } from '../lib/supabase'

export interface UserProfile {
  id: string
  first_name?: string
  last_name?: string
  phone?: string
  avatar_url?: string
  role: 'customer' | 'affiliate' | 'admin'
  status: 'active' | 'inactive' | 'suspended'
  created_at?: string
  updated_at?: string
}

export interface Address {
  id: string
  user_id: string
  type: 'shipping' | 'billing'
  first_name: string
  last_name: string
  phone: string
  address_line1: string
  address_line2?: string
  city: string
  postal_code?: string
  country: string
  is_default: boolean
  created_at?: string
  updated_at?: string
}

export const userService = {
  // Récupérer le profil de l'utilisateur actuel
  async getCurrentProfile(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) throw error
    return data as UserProfile
  },

  // Récupérer un profil par ID
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data as UserProfile
  },

  // Mettre à jour le profil
  async updateProfile(updates: Partial<UserProfile>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error
    return data as UserProfile
  },

  // Récupérer les adresses de l'utilisateur
  async getAddresses() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Address[]
  },

  // Ajouter une adresse
  async addAddress(address: Partial<Address>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    // Si c'est la première adresse ou si is_default est true, désactiver les autres
    if (address.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
    }

    const { data, error } = await supabase
      .from('addresses')
      .insert({ ...address, user_id: user.id })
      .select()
      .single()

    if (error) throw error
    return data as Address
  },

  // Mettre à jour une adresse
  async updateAddress(addressId: string, updates: Partial<Address>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    // Si on définit cette adresse comme défaut, désactiver les autres
    if (updates.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
        .neq('id', addressId)
    }

    const { data, error } = await supabase
      .from('addresses')
      .update(updates)
      .eq('id', addressId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    return data as Address
  },

  // Supprimer une adresse
  async deleteAddress(addressId: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', addressId)
      .eq('user_id', user.id)

    if (error) throw error
  },

  // Récupérer toutes les adresses (admin)
  async getAllAddresses() {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Address[]
  }
}
