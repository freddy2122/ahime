import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  MousePointerClick,
  ShoppingCart,
  DollarSign,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Calendar,
  BarChart3,
  Eye,
  Gift,
  Users,
  ArrowRight,
  Link2,
  Download,
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import ShareButtons from '../components/Share/ShareButtons'

const AffiliateDashboard = () => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'all'>('month')
  const [selectedProduct, setSelectedProduct] = useState<string>('all')

  // TODO: Récupérer depuis Supabase
  const affiliateCode = 'AHIME123' // Code d'affiliation unique
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ahimey.vercel.app'

  // Statistiques (à remplacer par données Supabase)
  const stats = {
    totalClicks: 1247,
    totalConversions: 89,
    conversionRate: 7.14,
    totalEarnings: 145000,
    pendingEarnings: 32000,
    paidEarnings: 113000,
    averageOrderValue: 165000,
    topProduct: 'Laptop HP Pavilion 15',
  }

  // Liens d'affiliation générés
  const affiliateLinks = [
    {
      id: '1',
      name: 'Lien général boutique',
      url: `${baseUrl}/products?ref=${affiliateCode}`,
      clicks: 456,
      conversions: 32,
      earnings: 52000,
    },
    {
      id: '2',
      name: 'Électronique',
      url: `${baseUrl}/category/electronique?ref=${affiliateCode}`,
      clicks: 234,
      conversions: 18,
      earnings: 29000,
    },
    {
      id: '3',
      name: 'Mode & Vêtements',
      url: `${baseUrl}/category/mode-vetements?ref=${affiliateCode}`,
      clicks: 198,
      conversions: 15,
      earnings: 24000,
    },
    {
      id: '4',
      name: 'Produit spécifique - Laptop HP',
      url: `${baseUrl}/product/1?ref=${affiliateCode}`,
      clicks: 159,
      conversions: 12,
      earnings: 18000,
    },
  ]

  // Historique des commissions (simulé)
  const commissionHistory = [
    {
      id: '1',
      date: '2024-12-15',
      orderId: 'CMD-2024-001',
      product: 'Laptop HP Pavilion 15',
      amount: 50000,
      commission: 7500,
      status: 'paid',
    },
    {
      id: '2',
      date: '2024-12-10',
      orderId: 'CMD-2024-002',
      product: 'Smartphone Samsung Galaxy A54',
      amount: 149000,
      commission: 17880,
      status: 'paid',
    },
    {
      id: '3',
      date: '2024-12-05',
      orderId: 'CMD-2024-003',
      product: 'Tailleur Femme',
      amount: 45000,
      commission: 5400,
      status: 'pending',
    },
    {
      id: '4',
      date: '2024-11-28',
      orderId: 'CMD-2024-004',
      product: 'Réfrigérateur LG 280L',
      amount: 320000,
      commission: 38400,
      status: 'paid',
    },
  ]

  const handleCopyLink = (url: string, linkId: string) => {
    navigator.clipboard.writeText(url)
    setCopiedLink(linkId)
    toast.success('Lien copié !')
    setTimeout(() => setCopiedLink(null), 2000)
  }

  const generateAffiliateLink = (path: string = '/products') => {
    return `${baseUrl}${path}?ref=${affiliateCode}`
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2">
                Tableau de bord Parrain
              </h1>
              <p className="text-gray-600">
                Gérez vos liens d'affiliation et suivez vos performances
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-accent-50 border-2 border-accent-200 rounded-lg px-4 py-3">
                <p className="text-sm text-gray-600 mb-1">Votre code d'affiliation</p>
                <p className="text-2xl font-bold text-accent-700">{affiliateCode}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">{stats.totalClicks.toLocaleString()}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold">Total de clics</h3>
            <p className="text-xs text-gray-500 mt-1">Tous les liens confondus</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">{stats.totalConversions}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold">Conversions</h3>
            <p className="text-xs text-green-600 mt-1">Taux: {stats.conversionRate}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">{formatPrice(stats.totalEarnings)}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold">Gains totaux</h3>
            <p className="text-xs text-gray-500 mt-1">{formatPrice(stats.pendingEarnings)} en attente</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">{formatPrice(stats.averageOrderValue)}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold">Panier moyen</h3>
            <p className="text-xs text-gray-500 mt-1">Par commande</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale - Liens d'affiliation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Générer un nouveau lien */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Link2 className="w-6 h-6 mr-2 text-primary-600" />
                Générer un lien d'affiliation
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type de lien
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  >
                    <option value="all">Tous les produits (/products)</option>
                    <option value="electronique">Électronique (/category/electronique)</option>
                    <option value="mode">Mode & Vêtements (/category/mode-vetements)</option>
                    <option value="maison">Maison & Décoration (/category/maison-decoration)</option>
                    <option value="beaute">Beauté & Santé (/category/beaute-sante)</option>
                    <option value="alimentation">Alimentation (/category/alimentation)</option>
                    <option value="sport">Sport & Loisirs (/category/sport-loisirs)</option>
                  </select>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Lien généré :</p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      readOnly
                      value={generateAffiliateLink(selectedProduct === 'all' ? '/products' : `/category/${selectedProduct}`)}
                      className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm"
                    />
                    <button
                      onClick={() => handleCopyLink(generateAffiliateLink(selectedProduct === 'all' ? '/products' : `/category/${selectedProduct}`), 'new')}
                      className="w-12 h-12 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors"
                      aria-label="Copier le lien"
                    >
                      {copiedLink === 'new' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Liens d'affiliation existants */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-2xl font-bold text-gray-900 flex items-center">
                  <Share2 className="w-6 h-6 mr-2 text-primary-600" />
                  Mes liens d'affiliation
                </h2>
              </div>
              <div className="space-y-4">
                {affiliateLinks.map((link) => (
                  <div
                    key={link.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{link.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <div className="flex items-center space-x-1">
                            <MousePointerClick className="w-4 h-4" />
                            <span>{link.clicks} clics</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ShoppingCart className="w-4 h-4" />
                            <span>{link.conversions} conversions</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-semibold text-primary-600">{formatPrice(link.earnings)}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopyLink(link.url, link.id)}
                        className="ml-4 w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        aria-label="Copier le lien"
                      >
                        {copiedLink === link.id ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600" />}
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-200">
                      <input
                        type="text"
                        readOnly
                        value={link.url}
                        className="flex-1 px-3 py-2 rounded border border-gray-200 bg-gray-50 text-xs"
                      />
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded bg-primary-600 hover:bg-primary-700 text-white text-xs flex items-center space-x-1 transition-colors"
                      >
                        <span>Ouvrir</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Historique des commissions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-2xl font-bold text-gray-900 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-primary-600" />
                  Historique des commissions
                </h2>
                <button className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 font-semibold">
                  <Download className="w-4 h-4" />
                  <span>Exporter</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Commande</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Produit</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Montant</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Commission</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionHistory.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-600">{formatDate(item.date)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 font-mono">{item.orderId}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{item.product}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 text-right">{formatPrice(item.amount)}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-primary-600 text-right">{formatPrice(item.commission)}</td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              item.status === 'paid'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {item.status === 'paid' ? 'Payé' : 'En attente'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Résumé rapide */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-lg p-6 text-white"
            >
              <h3 className="font-heading text-xl font-bold mb-4">Résumé du mois</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-white/80 text-sm mb-1">Gains ce mois</p>
                  <p className="text-3xl font-black">{formatPrice(stats.totalEarnings)}</p>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <p className="text-white/80 text-sm mb-1">En attente de paiement</p>
                  <p className="text-xl font-bold">{formatPrice(stats.pendingEarnings)}</p>
                </div>
              </div>
            </motion.div>

            {/* Actions rapides */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <Link
                  to="/affiliate"
                  className="flex items-center justify-between p-3 rounded-lg border-2 border-gray-200 hover:border-primary-300 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <Eye className="w-5 h-5 text-gray-600 group-hover:text-primary-600" />
                    <span className="text-sm font-semibold text-gray-700">Voir le programme</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />
                </Link>
                <Link
                  to="/products"
                  className="flex items-center justify-between p-3 rounded-lg border-2 border-gray-200 hover:border-primary-300 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <Gift className="w-5 h-5 text-gray-600 group-hover:text-primary-600" />
                    <span className="text-sm font-semibold text-gray-700">Explorer les produits</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />
                </Link>
                <Link
                  to="/account"
                  className="flex items-center justify-between p-3 rounded-lg border-2 border-gray-200 hover:border-primary-300 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-600 group-hover:text-primary-600" />
                    <span className="text-sm font-semibold text-gray-700">Mon compte</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />
                </Link>
              </div>
            </motion.div>

            {/* Partage du programme */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">Partager le programme</h3>
              <ShareButtons
                url={`${baseUrl}/affiliate?ref=${affiliateCode}`}
                title="Rejoignez le programme d'affiliation Ahimè"
                description="Gagnez jusqu'à 15% de commission en recommandant nos produits"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AffiliateDashboard
