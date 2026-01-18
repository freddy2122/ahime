import { supabase } from '../lib/supabase'

export interface OrderItem {
  product_id: string
  product_name: string
  quantity: number
  price: number
  image?: string
}

export interface Order {
  id: string
  order_number: string
  tracking_code?: string // Code de suivi unique pour les clients non connectés
  user_id?: string
  customer_email: string
  customer_name: string
  customer_phone?: string
  shipping_address: any
  billing_address?: any
  items: OrderItem[]
  subtotal: number
  shipping_cost: number
  discount: number
  total: number
  payment_method?: 'mobile_money' | 'card' | 'bank_transfer' | 'cash_on_delivery'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_reference?: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  tracking_number?: string
  notes?: string
  affiliate_id?: string
  referral_code?: string
  created_at: string
  updated_at: string
}

export const orderService = {
  // Créer une commande
  async create(order: Partial<Order>) {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()

    if (error) throw error
    return data as Order
  },

  // Récupérer toutes les commandes d'un utilisateur
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Order[]
  },

  // Récupérer une commande par ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Order
  },

  // Récupérer une commande par numéro
  async getByOrderNumber(orderNumber: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .single()

    if (error) throw error
    return data as Order
  },

  // Récupérer une commande par code de suivi (pour clients non connectés)
  async getByTrackingCode(trackingCode: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('tracking_code', trackingCode)
      .single()

    if (error) throw error
    return data as Order
  },

  // Mettre à jour le statut d'une commande
  async updateStatus(id: string, status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Order
  },

  // Mettre à jour le statut de paiement
  async updatePaymentStatus(id: string, paymentStatus: Order['payment_status'], paymentReference?: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        payment_status: paymentStatus,
        payment_reference: paymentReference 
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Order
  },

  // Récupérer toutes les commandes (admin)
  async getAll(limit?: number, offset?: number) {
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (limit) query = query.limit(limit)
    if (offset) query = query.range(offset, offset + (limit || 50) - 1)

    const { data, error } = await query
    if (error) throw error
    return data as Order[]
  },

  // Filtrer par statut (admin)
  async getByStatus(status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Order[]
  }
}
