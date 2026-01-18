import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link2, Copy, Check, ExternalLink, Plus, MousePointerClick, ShoppingCart, DollarSign, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

const AffiliateLinks = () => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLinkName, setNewLinkName] = useState('')
  const [newLinkPath, setNewLinkPath] = useState('/products')

  const affiliateCode = 'AHIME123'
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ahimey.vercel.app'

  const [affiliateLinks, setAffiliateLinks] = useState([
    {
      id: '1',
      name: 'Lien général boutique',
      path: '/products',
      url: `${baseUrl}/products?ref=${affiliateCode}`,
      clicks: 456,
      conversions: 32,
      earnings: 52000,
      createdAt: '2024-11-01',
    },
    {
      id: '2',
      name: 'Électronique',
      path: '/category/electronique',
      url: `${baseUrl}/category/electronique?ref=${affiliateCode}`,
      clicks: 234,
      conversions: 18,
      earnings: 29000,
      createdAt: '2024-11-05',
    },
    {
      id: '3',
      name: 'Mode & Vêtements',
      path: '/category/mode-vetements',
      url: `${baseUrl}/category/mode-vetements?ref=${affiliateCode}`,
      clicks: 198,
      conversions: 15,
      earnings: 24000,
      createdAt: '2024-11-10',
    },
    {
      id: '4',
      name: 'Laptop HP Pavilion 15',
      path: '/product/1',
      url: `${baseUrl}/product/1?ref=${affiliateCode}`,
      clicks: 159,
      conversions: 12,
      earnings: 18000,
      createdAt: '2024-11-15',
    },
  ])

  const handleCopyLink = (url: string, linkId: string) => {
    navigator.clipboard.writeText(url)
    setCopiedLink(linkId)
    toast.success('Lien copié !')
    setTimeout(() => setCopiedLink(null), 2000)
  }

  const handleAddLink = () => {
    if (!newLinkName || !newLinkPath) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    const newLink = {
      id: Date.now().toString(),
      name: newLinkName,
      path: newLinkPath,
      url: `${baseUrl}${newLinkPath}?ref=${affiliateCode}`,
      clicks: 0,
      conversions: 0,
      earnings: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }

    setAffiliateLinks([newLink, ...affiliateLinks])
    setNewLinkName('')
    setNewLinkPath('/products')
    setShowAddForm(false)
    toast.success('Lien ajouté avec succès !')
  }

  const handleDeleteLink = (linkId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) {
      setAffiliateLinks(affiliateLinks.filter(link => link.id !== linkId))
      toast.success('Lien supprimé')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price)
  }

  const conversionRate = (clicks: number, conversions: number) => {
    return clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : '0.00'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2 flex items-center">
                <Link2 className="w-8 h-8 mr-3" />
                Mes liens d'affiliation
              </h1>
              <p className="text-gray-600">
                Gérez et suivez tous vos liens d'affiliation
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Ajouter un lien</span>
            </button>
          </div>
        </motion.div>

        {/* Formulaire d'ajout */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Nouveau lien d'affiliation</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom du lien
                </label>
                <input
                  type="text"
                  value={newLinkName}
                  onChange={(e) => setNewLinkName(e.target.value)}
                  placeholder="Ex: Promotion Électronique"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chemin de la page
                </label>
                <select
                  value={newLinkPath}
                  onChange={(e) => setNewLinkPath(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                >
                  <option value="/products">Tous les produits (/products)</option>
                  <option value="/category/electronique">Électronique</option>
                  <option value="/category/mode-vetements">Mode & Vêtements</option>
                  <option value="/category/maison-decoration">Maison & Décoration</option>
                  <option value="/category/beaute-sante">Beauté & Santé</option>
                  <option value="/category/alimentation">Alimentation</option>
                  <option value="/category/sport-loisirs">Sport & Loisirs</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleAddLink}
                  className="btn-primary flex-1"
                >
                  Créer le lien
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary flex-1"
                >
                  Annuler
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Liste des liens */}
        <div className="grid grid-cols-1 gap-6">
          {affiliateLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="font-heading text-xl font-bold text-gray-900">{link.name}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Créé le {new Date(link.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        readOnly
                        value={link.url}
                        className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm font-mono"
                      />
                      <button
                        onClick={() => handleCopyLink(link.url, link.id)}
                        className="w-10 h-10 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors"
                        aria-label="Copier le lien"
                      >
                        {copiedLink === link.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center transition-colors"
                        aria-label="Ouvrir le lien"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="ml-4 w-10 h-10 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                  aria-label="Supprimer le lien"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Statistiques */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                    <MousePointerClick className="w-4 h-4" />
                    <span className="text-xs">Clics</span>
                  </div>
                  <p className="text-2xl font-black text-gray-900">{link.clicks.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-xs">Conversions</span>
                  </div>
                  <p className="text-2xl font-black text-green-600">{link.conversions}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {conversionRate(link.clicks, link.conversions)}% de taux
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs">Gains</span>
                  </div>
                  <p className="text-2xl font-black text-accent-600">{formatPrice(link.earnings)}</p>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Panier moyen</div>
                  <p className="text-lg font-semibold text-gray-900">
                    {link.conversions > 0 ? formatPrice(link.earnings / link.conversions) : '0 FCFA'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {affiliateLinks.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Link2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun lien d'affiliation</h3>
            <p className="text-gray-600 mb-4">Créez votre premier lien d'affiliation pour commencer à gagner des commissions</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Créer un lien</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AffiliateLinks
