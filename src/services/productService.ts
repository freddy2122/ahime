import { supabase } from '../lib/supabase'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string | null
  category: string | null
  stock: number
  created_at?: string
}

export const productService = {
  // Récupérer tous les produits
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Récupérer un produit par ID
  async getProductById(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Rechercher des produits
  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    
    if (error) throw error
    return data || []
  },

  // Récupérer les produits par catégorie
  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Récupérer les catégories
  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('products')
      .select('category')
    
    if (error) throw error
    
    // Extraire les catégories uniques
    const categories = [...new Set(data?.map(item => item.category).filter(Boolean) as string[])]
    return categories
  },
}
