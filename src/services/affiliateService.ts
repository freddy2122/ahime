import { supabase } from '../lib/supabase'

export interface Affiliate {
  id: string
  user_id?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  address?: string
  payment_method: 'mobile_money' | 'bank_transfer'
  payment_details: any
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  commission_rate: number
  total_earnings: number
  paid_earnings: number
  pending_earnings: number
  referral_code: string
  created_at?: string
  updated_at?: string
}

export interface AffiliateLink {
  id: string
  affiliate_id: string
  product_id?: string
  category_slug?: string
  link_type: 'product' | 'category' | 'general'
  custom_slug?: string
  full_url: string
  clicks: number
  conversions: number
  created_at?: string
  updated_at?: string
}

export interface AffiliateConversion {
  id: string
  affiliate_id: string
  click_id?: string
  order_id: string
  product_id?: string
  product_name?: string
  order_total: number
  commission_amount: number
  commission_rate: number
  status: 'pending' | 'confirmed' | 'paid' | 'cancelled'
  conversion_date?: string
  payment_date?: string
  created_at?: string
}

export const affiliateService = {
  // Récupérer l'affilié actuel
  async getCurrentAffiliate(): Promise<Affiliate | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('affiliates')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows
    return data as Affiliate | null
  },

  // Créer un compte affilié
  async createAffiliate(affiliateData: Partial<Affiliate>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    const { data, error } = await supabase
      .from('affiliates')
      .insert({
        ...affiliateData,
        user_id: user.id
      })
      .select()
      .single()

    if (error) throw error
    return data as Affiliate
  },

  // Récupérer les liens d'affiliation
  async getAffiliateLinks(affiliateId?: string) {
    let query = supabase
      .from('affiliate_links')
      .select('*')
      .order('created_at', { ascending: false })

    if (affiliateId) {
      query = query.eq('affiliate_id', affiliateId)
    } else {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Utilisateur non authentifié')
      
      // Récupérer l'ID de l'affilié
      const { data: affiliate } = await supabase
        .from('affiliates')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (!affiliate) throw new Error('Affilié non trouvé')
      query = query.eq('affiliate_id', affiliate.id)
    }

    const { data, error } = await query
    if (error) throw error
    return data as AffiliateLink[]
  },

  // Créer un lien d'affiliation
  async createAffiliateLink(linkData: Partial<AffiliateLink>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    // Récupérer l'ID de l'affilié
    const { data: affiliate } = await supabase
      .from('affiliates')
      .select('id, referral_code')
      .eq('user_id', user.id)
      .single()

    if (!affiliate) throw new Error('Affilié non trouvé')

    // Générer l'URL complète
    const baseUrl = window.location.origin
    let fullUrl = ''
    
    if (linkData.link_type === 'product' && linkData.product_id) {
      fullUrl = `${baseUrl}/product/${linkData.product_id}?ref=${affiliate.referral_code}`
    } else if (linkData.link_type === 'category' && linkData.category_slug) {
      fullUrl = `${baseUrl}/category/${linkData.category_slug}?ref=${affiliate.referral_code}`
    } else {
      fullUrl = `${baseUrl}?ref=${affiliate.referral_code}`
    }

    const { data, error } = await supabase
      .from('affiliate_links')
      .insert({
        ...linkData,
        affiliate_id: affiliate.id,
        full_url: fullUrl
      })
      .select()
      .single()

    if (error) throw error
    return data as AffiliateLink
  },

  // Enregistrer un clic sur un lien d'affiliation
  async trackClick(linkId: string, sessionId?: string) {
    const { data: { user } } = await supabase.auth.getUser()
    
    // Récupérer l'ID de l'affilié depuis le lien
    const { data: link } = await supabase
      .from('affiliate_links')
      .select('affiliate_id')
      .eq('id', linkId)
      .single()

    if (!link) throw new Error('Lien non trouvé')

    const { data, error } = await supabase
      .from('affiliate_clicks')
      .insert({
        affiliate_id: link.affiliate_id,
        link_id: linkId,
        session_id: sessionId,
        clicked_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error

    // Incrémenter le compteur de clics
    await supabase.rpc('increment', {
      table_name: 'affiliate_links',
      column_name: 'clicks',
      row_id: linkId
    })

    return data
  },

  // Récupérer les conversions
  async getConversions(affiliateId?: string) {
    let query = supabase
      .from('affiliate_conversions')
      .select('*')
      .order('conversion_date', { ascending: false })

    if (affiliateId) {
      query = query.eq('affiliate_id', affiliateId)
    } else {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Utilisateur non authentifié')
      
      const { data: affiliate } = await supabase
        .from('affiliates')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (!affiliate) throw new Error('Affilié non trouvé')
      query = query.eq('affiliate_id', affiliate.id)
    }

    const { data, error } = await query
    if (error) throw error
    return data as AffiliateConversion[]
  },

  // Récupérer les statistiques
  async getStats(affiliateId?: string) {
    let query = supabase
      .from('affiliate_stats')
      .select('*')

    if (affiliateId) {
      query = query.eq('id', affiliateId)
    } else {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Utilisateur non authentifié')
      
      const { data: affiliate } = await supabase
        .from('affiliates')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (!affiliate) throw new Error('Affilié non trouvé')
      query = query.eq('id', affiliate.id)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  // Récupérer tous les affiliés (admin)
  async getAllAffiliates() {
    const { data, error } = await supabase
      .from('affiliates')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Affiliate[]
  }
}
