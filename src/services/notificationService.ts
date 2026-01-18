import { supabase } from '../lib/supabase'

export interface Notification {
  id: string
  user_id?: string
  type: 'order_created' | 'order_status_changed' | 'payment_received' | 'order_shipped' | 'order_delivered' | 'system'
  title: string
  message: string
  data?: any
  read: boolean
  created_at: string
}

export const notificationService = {
  // Récupérer les notifications de l'utilisateur actuel
  async getMyNotifications(limit?: number) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (limit) query = query.limit(limit)

    const { data, error } = await query
    if (error) throw error
    return data as Notification[]
  },

  // Récupérer les notifications non lues
  async getUnreadNotifications() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .eq('read', false)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Notification[]
  },

  // Compter les notifications non lues
  async getUnreadCount() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return 0

    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('read', false)

    if (error) throw error
    return count || 0
  },

  // Marquer une notification comme lue
  async markAsRead(notificationId: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    return data as Notification
  },

  // Marquer toutes les notifications comme lues
  async markAllAsRead() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    const { error } = await supabase.rpc('mark_notifications_read', {
      user_uuid: user.id
    })

    if (error) {
      // Fallback si la fonction n'existe pas encore
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false)
    }
  },

  // Supprimer une notification
  async delete(notificationId: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', user.id)

    if (error) throw error
  },

  // Créer une notification (admin uniquement)
  async create(notification: Partial<Notification>) {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single()

    if (error) throw error
    return data as Notification
  }
}
