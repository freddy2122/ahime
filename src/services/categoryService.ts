import { supabase } from '../lib/supabase'

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parent_id?: string
  order_index: number
  status: 'active' | 'inactive'
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  created_at?: string
  updated_at?: string
}

export const categoryService = {
  // Récupérer toutes les catégories actives
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data as Category[]
  },

  // Récupérer les catégories principales (sans parent)
  async getMainCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('status', 'active')
      .is('parent_id', null)
      .order('order_index', { ascending: true })

    if (error) throw error
    return data as Category[]
  },

  // Récupérer les sous-catégories d'une catégorie
  async getSubCategories(parentId: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('parent_id', parentId)
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data as Category[]
  },

  // Récupérer une catégorie par slug
  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .single()

    if (error) throw error
    return data as Category
  },

  // Créer une catégorie (admin)
  async create(category: Partial<Category>) {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single()

    if (error) throw error
    return data as Category
  },

  // Mettre à jour une catégorie (admin)
  async update(id: string, updates: Partial<Category>) {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Category
  },

  // Supprimer une catégorie (admin)
  async delete(id: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
