import { supabase } from '../lib/supabase'

export interface Product {
  id: string
  name: string
  slug: string
  short_description?: string
  description: string
  price: number
  promo_price?: number
  is_on_sale?: boolean
  promo_start_date?: string
  promo_end_date?: string
  sku?: string
  category_id?: string
  sub_category?: string
  stock: number
  weight?: number
  dimensions?: { length: number; width: number; height: number }
  images?: string[]
  colors?: string[]
  sizes?: string[]
  brand?: string
  warranty?: string
  return_policy?: string
  tags?: string[]
  rating?: number
  rating_count?: number
  status: 'active' | 'inactive' | 'draft'
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  created_at?: string
  updated_at?: string
}

export const productService = {
  // Récupérer tous les produits actifs
  async getAll(limit?: number, offset?: number) {
    let query = supabase
      .from('products')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (limit) query = query.limit(limit)
    if (offset) query = query.range(offset, offset + (limit || 20) - 1)

    const { data, error } = await query
    if (error) throw error
    return data as Product[]
  },

  // Récupérer un produit par ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Product
  },

  // Récupérer un produit par slug
  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .single()

    if (error) throw error
    return data as Product
  },

  // Récupérer par catégorie
  async getByCategory(categorySlug: string, limit?: number) {
    // D'abord récupérer la catégorie
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()

    if (!category) return []

    let query = supabase
      .from('products')
      .select('*')
      .eq('category_id', category.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (limit) query = query.limit(limit)

    const { data, error } = await query
    if (error) throw error
    return data as Product[]
  },

  // Rechercher des produits
  async search(searchTerm: string, limit = 20) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'active')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .limit(limit)

    if (error) throw error
    return data as Product[]
  },

  // Récupérer les produits en promotion
  async getOnSale(limit?: number) {
    let query = supabase
      .from('products')
      .select('*')
      .eq('status', 'active')
      .eq('is_on_sale', true)
      .order('created_at', { ascending: false })

    if (limit) query = query.limit(limit)

    const { data, error } = await query
    if (error) throw error
    return data as Product[]
  },

  // Créer un produit (admin)
  async create(product: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()

    if (error) throw error
    return data as Product
  },

  // Mettre à jour un produit (admin)
  async update(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Product
  },

  // Supprimer un produit (admin)
  async delete(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Mettre à jour le stock
  async updateStock(id: string, quantity: number) {
    const { data, error } = await supabase
      .from('products')
      .update({ stock: quantity })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Product
  }
}
