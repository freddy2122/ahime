import { supabase } from '../lib/supabase'

export interface ProductReview {
  id: string
  product_id: string
  user_id?: string
  rating: number
  title?: string
  comment?: string
  verified_purchase: boolean
  helpful_count: number
  status: 'pending' | 'approved' | 'rejected'
  created_at?: string
  updated_at?: string
}

export const reviewService = {
  // Récupérer les avis d'un produit
  async getByProduct(productId: string, limit?: number) {
    let query = supabase
      .from('product_reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (limit) query = query.limit(limit)

    const { data, error } = await query
    if (error) throw error
    return data as ProductReview[]
  },

  // Récupérer les avis d'un utilisateur
  async getByUser(userId?: string) {
    const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id
    if (!targetUserId) throw new Error('Utilisateur non authentifié')

    const { data, error } = await supabase
      .from('product_reviews')
      .select('*')
      .eq('user_id', targetUserId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as ProductReview[]
  },

  // Créer un avis
  async create(review: Partial<ProductReview>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    // Vérifier si l'utilisateur a déjà laissé un avis pour ce produit
    const { data: existing } = await supabase
      .from('product_reviews')
      .select('id')
      .eq('product_id', review.product_id!)
      .eq('user_id', user.id)
      .single()

    if (existing) {
      throw new Error('Vous avez déjà laissé un avis pour ce produit')
    }

    // Vérifier si l'utilisateur a acheté le produit (pour verified_purchase)
    const { data: orders } = await supabase
      .from('orders')
      .select('items')
      .eq('user_id', user.id)
      .eq('status', 'delivered')

    const hasPurchased = orders?.some(order => 
      Array.isArray(order.items) && 
      order.items.some((item: any) => item.product_id === review.product_id)
    )

    const { data, error } = await supabase
      .from('product_reviews')
      .insert({
        ...review,
        user_id: user.id,
        verified_purchase: hasPurchased || false,
        status: 'pending'
      })
      .select()
      .single()

    if (error) throw error
    return data as ProductReview
  },

  // Mettre à jour un avis
  async update(reviewId: string, updates: Partial<ProductReview>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    const { data, error } = await supabase
      .from('product_reviews')
      .update(updates)
      .eq('id', reviewId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    return data as ProductReview
  },

  // Supprimer un avis
  async delete(reviewId: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    const { error } = await supabase
      .from('product_reviews')
      .delete()
      .eq('id', reviewId)
      .eq('user_id', user.id)

    if (error) throw error
  },

  // Marquer un avis comme utile
  async markHelpful(reviewId: string) {
    const { data, error } = await supabase.rpc('increment_helpful_count', {
      review_id: reviewId
    })

    if (error) {
      // Si la fonction n'existe pas, on fait manuellement
      const { data: review } = await supabase
        .from('product_reviews')
        .select('helpful_count')
        .eq('id', reviewId)
        .single()

      if (review) {
        await supabase
          .from('product_reviews')
          .update({ helpful_count: (review.helpful_count || 0) + 1 })
          .eq('id', reviewId)
      }
    }

    return data
  },

  // Récupérer tous les avis (admin)
  async getAll(status?: ProductReview['status']) {
    let query = supabase
      .from('product_reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query
    if (error) throw error
    return data as ProductReview[]
  },

  // Approuver/rejeter un avis (admin)
  async moderate(reviewId: string, status: 'approved' | 'rejected') {
    const { data, error } = await supabase
      .from('product_reviews')
      .update({ status })
      .eq('id', reviewId)
      .select()
      .single()

    if (error) throw error
    return data as ProductReview
  }
}
