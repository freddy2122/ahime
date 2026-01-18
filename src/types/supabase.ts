// Types TypeScript pour Supabase
// Générés automatiquement ou définis manuellement

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image: string | null
          parent_id: string | null
          order_index: number
          status: 'active' | 'inactive'
          meta_title: string | null
          meta_description: string | null
          meta_keywords: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image?: string | null
          parent_id?: string | null
          order_index?: number
          status?: 'active' | 'inactive'
          meta_title?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image?: string | null
          parent_id?: string | null
          order_index?: number
          status?: 'active' | 'inactive'
          meta_title?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          short_description: string | null
          description: string
          price: number
          promo_price: number | null
          is_on_sale: boolean
          promo_start_date: string | null
          promo_end_date: string | null
          sku: string | null
          category_id: string | null
          sub_category: string | null
          stock: number
          weight: number | null
          dimensions: any
          images: any
          colors: any
          sizes: any
          brand: string | null
          warranty: string | null
          return_policy: string | null
          tags: any
          rating: number
          rating_count: number
          status: 'active' | 'inactive' | 'draft'
          meta_title: string | null
          meta_description: string | null
          meta_keywords: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          short_description?: string | null
          description: string
          price: number
          promo_price?: number | null
          is_on_sale?: boolean
          promo_start_date?: string | null
          promo_end_date?: string | null
          sku?: string | null
          category_id?: string | null
          sub_category?: string | null
          stock?: number
          weight?: number | null
          dimensions?: any
          images?: any
          colors?: any
          sizes?: any
          brand?: string | null
          warranty?: string | null
          return_policy?: string | null
          tags?: any
          rating?: number
          rating_count?: number
          status?: 'active' | 'inactive' | 'draft'
          meta_title?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          short_description?: string | null
          description?: string
          price?: number
          promo_price?: number | null
          is_on_sale?: boolean
          promo_start_date?: string | null
          promo_end_date?: string | null
          sku?: string | null
          category_id?: string | null
          sub_category?: string | null
          stock?: number
          weight?: number | null
          dimensions?: any
          images?: any
          colors?: any
          sizes?: any
          brand?: string | null
          warranty?: string | null
          return_policy?: string | null
          tags?: any
          rating?: number
          rating_count?: number
          status?: 'active' | 'inactive' | 'draft'
          meta_title?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          shipping_address: any
          billing_address: any | null
          items: any
          subtotal: number
          shipping_cost: number
          discount: number
          total: number
          payment_method: string | null
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_reference: string | null
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          tracking_number: string | null
          notes: string | null
          affiliate_id: string | null
          referral_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number?: string
          user_id?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          shipping_address: any
          billing_address?: any | null
          items: any
          subtotal: number
          shipping_cost?: number
          discount?: number
          total: number
          payment_method?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_reference?: string | null
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          tracking_number?: string | null
          notes?: string | null
          affiliate_id?: string | null
          referral_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          shipping_address?: any
          billing_address?: any | null
          items?: any
          subtotal?: number
          shipping_cost?: number
          discount?: number
          total?: number
          payment_method?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_reference?: string | null
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          tracking_number?: string | null
          notes?: string | null
          affiliate_id?: string | null
          referral_code?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
