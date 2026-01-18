import { useState } from 'react'
import { Search, Package, CheckCircle, Clock, XCircle, Truck } from 'lucide-react'
import { orderService } from '../services/orderService'
import { Order } from '../services/orderService'
import SEO from '../components/SEO/SEO'

const TrackOrder = () => {
  const [trackingCode, setTrackingCode] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingCode.trim()) return

    setLoading(true)
    setError(null)

    try {
      const foundOrder = await orderService.getByTrackingCode(trackingCode.trim().toUpperCase())
      setOrder(foundOrder)
    } catch (err: any) {
      setError('Commande non trouvée. Vérifiez votre code de suivi.')
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'shipped':
        return <Truck className="w-6 h-6 text-blue-500" />
      case 'processing':
        return <Clock className="w-6 h-6 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-500" />
      default:
        return <Package className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusLabel = (status: Order['status']) => {
    const labels: Record<Order['status'], string> = {
      pending: 'En attente',
      processing: 'En traitement',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    }
    return labels[status] || status
  }

  const getPaymentStatusLabel = (status: Order['payment_status']) => {
    const labels: Record<Order['payment_status'], string> = {
      pending: 'En attente',
      paid: 'Payée',
      failed: 'Échouée',
      refunded: 'Remboursée'
    }
    return labels[status] || status
  }

  return (
    <>
      <SEO
        title="Suivre ma commande - Ahimè"
        description="Suivez l'état de votre commande avec votre code de suivi unique"
        keywords="suivre commande, suivi colis, code de suivi, ahimè"
        url="https://ahimey.vercel.app/track-order"
      />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary-600 mb-4">
              Suivre ma commande
            </h1>
            <p className="text-gray-600">
              Entrez votre code de suivi pour connaître l'état de votre commande
            </p>
          </div>

          {/* Formulaire de recherche */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  placeholder="AHM-XXXXXX"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg"
                  maxLength={10}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !trackingCode.trim()}
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Recherche...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Rechercher
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* Résultats */}
          {order && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* En-tête */}
              <div className="bg-primary-600 text-white p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm opacity-90">Numéro de commande</p>
                    <p className="text-2xl font-bold">{order.order_number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Code de suivi</p>
                    <p className="text-2xl font-bold">{order.tracking_code}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Statut de la commande */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Statut de la commande
                  </h2>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    {getStatusIcon(order.status)}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {getStatusLabel(order.status)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.updated_at && new Date(order.updated_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statut du paiement */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Statut du paiement
                  </h2>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900">
                      {getPaymentStatusLabel(order.payment_status)}
                    </p>
                    {order.payment_method && (
                      <p className="text-sm text-gray-600 mt-1">
                        Méthode : {order.payment_method === 'mobile_money' ? 'Mobile Money' : 
                                   order.payment_method === 'cash_on_delivery' ? 'Paiement à la livraison' :
                                   order.payment_method === 'card' ? 'Carte bancaire' :
                                   order.payment_method}
                      </p>
                    )}
                    {order.payment_reference && (
                      <p className="text-sm text-gray-600 mt-1">
                        Référence : {order.payment_reference}
                      </p>
                    )}
                  </div>
                </div>

                {/* Informations client */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Informations client
                  </h2>
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <p><span className="font-semibold">Nom :</span> {order.customer_name}</p>
                    <p><span className="font-semibold">Email :</span> {order.customer_email}</p>
                    {order.customer_phone && (
                      <p><span className="font-semibold">Téléphone :</span> {order.customer_phone}</p>
                    )}
                  </div>
                </div>

                {/* Articles */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Articles commandés
                  </h2>
                  <div className="space-y-3">
                    {order.items && Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.product_name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.product_name}</p>
                          <p className="text-sm text-gray-600">
                            Quantité : {item.quantity} × {item.price} FCFA
                          </p>
                        </div>
                        <p className="font-semibold text-primary-600">
                          {(item.quantity * item.price).toLocaleString()} FCFA
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary-600 text-2xl">
                      {order.total.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>

                {/* Numéro de suivi */}
                {order.tracking_number && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <span className="font-semibold">Numéro de suivi transporteur :</span> {order.tracking_number}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TrackOrder
