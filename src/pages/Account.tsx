import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  User, Mail, Phone, MapPin, Package, Heart, CreditCard, 
  Settings, LogOut, Edit, Save, X, Lock, ShoppingBag
} from 'lucide-react'
import { toast } from 'react-hot-toast'

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)

  // TODO: Récupérer depuis le contexte utilisateur ou Supabase
  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+229 XX XX XX XX',
    address: 'Cotonou, Bénin',
    avatar: '',
  })

  const handleSave = () => {
    // TODO: Sauvegarder les modifications dans Supabase
    setIsEditing(false)
    toast.success('Profil mis à jour avec succès !')
  }

  const handleLogout = () => {
    // TODO: Déconnexion via Supabase
    toast.success('Déconnexion réussie')
    // navigate('/')
  }

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'orders', label: 'Commandes', icon: Package },
    { id: 'favorites', label: 'Favoris', icon: Heart },
    { id: 'addresses', label: 'Adresses', icon: MapPin },
    { id: 'payment', label: 'Paiements', icon: CreditCard },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2">
              Mon compte
            </h1>
            <p className="text-gray-600">Gérez vos informations personnelles et vos préférences</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                {/* Avatar */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 text-primary-600 mb-3">
                    <User className="w-10 h-10" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {userInfo.firstName} {userInfo.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">{userInfo.email}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary-50 text-primary-600 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>

                {/* Déconnexion */}
                <button
                  onClick={handleLogout}
                  className="w-full mt-6 flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-3">
              {/* Profil */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-2xl font-bold text-gray-900">
                      Informations personnelles
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Modifier</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="btn-secondary flex items-center space-x-2"
                        >
                          <X className="w-4 h-4" />
                          <span>Annuler</span>
                        </button>
                        <button
                          onClick={handleSave}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>Enregistrer</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={userInfo.firstName}
                          onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom
                        </label>
                        <input
                          type="text"
                          value={userInfo.lastName}
                          onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Adresse
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          value={userInfo.address}
                          onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                          disabled={!isEditing}
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                    </div>
                  </form>

                  {/* Changer mot de passe */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <Link
                      to="/change-password"
                      className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      <Lock className="w-5 h-5" />
                      <span>Changer le mot de passe</span>
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Commandes */}
              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                    Mes commandes
                  </h2>
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Vous n'avez pas encore passé de commande</p>
                    <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
                      <ShoppingBag className="w-5 h-5" />
                      <span>Commencer les achats</span>
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Favoris */}
              {activeTab === 'favorites' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                    Mes favoris
                  </h2>
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Vous n'avez pas encore de produits favoris</p>
                    <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
                      <span>Découvrir nos produits</span>
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Adresses */}
              {activeTab === 'addresses' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-2xl font-bold text-gray-900">
                      Mes adresses
                    </h2>
                    <button className="btn-primary">
                      Ajouter une adresse
                    </button>
                  </div>
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Aucune adresse enregistrée</p>
                  </div>
                </motion.div>
              )}

              {/* Paiements */}
              {activeTab === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-2xl font-bold text-gray-900">
                      Méthodes de paiement
                    </h2>
                    <button className="btn-primary">
                      Ajouter une carte
                    </button>
                  </div>
                  <div className="text-center py-12">
                    <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Aucune méthode de paiement enregistrée</p>
                  </div>
                </motion.div>
              )}

              {/* Paramètres */}
              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                    Paramètres
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <h3 className="font-semibold text-gray-900">Notifications email</h3>
                        <p className="text-sm text-gray-600">Recevoir des emails sur les nouvelles commandes et promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <h3 className="font-semibold text-gray-900">Notifications SMS</h3>
                        <p className="text-sm text-gray-600">Recevoir des SMS sur le statut de vos commandes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <h3 className="font-semibold text-gray-900">Langue</h3>
                        <p className="text-sm text-gray-600">Choisissez votre langue préférée</p>
                      </div>
                      <select className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none">
                        <option>Français</option>
                        <option>English</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
