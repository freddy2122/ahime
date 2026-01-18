import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, User, Mail, Phone, MapPin, CreditCard, Lock, Bell, Globe, Save } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

const AffiliateSettings = () => {
  const [isSaving, setIsSaving] = useState(false)

  // TODO: Récupérer depuis Supabase
  const [settings, setSettings] = useState({
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+229 XX XX XX XX',
      address: 'Cotonou, Bénin',
    },
    payment: {
      method: 'mobile_money',
      mobileMoneyNumber: '+229 XX XX XX XX',
      bankAccount: '',
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      commissionAlerts: true,
      weeklyReport: true,
    },
    preferences: {
      language: 'fr',
      currency: 'XOF',
      timezone: 'Africa/Porto-Novo',
    },
  })

  const handleChange = (section: string, field: string, value: any) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section as keyof typeof settings],
        [field]: value,
      },
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    // TODO: Sauvegarder dans Supabase
    setTimeout(() => {
      setIsSaving(false)
      toast.success('Paramètres sauvegardés avec succès !')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2 flex items-center">
            <Settings className="w-8 h-8 mr-3" />
            Paramètres
          </h1>
          <p className="text-gray-600">
            Gérez vos informations personnelles et vos préférences
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Informations personnelles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary-600" />
              Informations personnelles
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={settings.profile.firstName}
                    onChange={(e) => handleChange('profile', 'firstName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={settings.profile.lastName}
                    onChange={(e) => handleChange('profile', 'lastName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
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
                    value={settings.profile.email}
                    onChange={(e) => handleChange('profile', 'email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
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
                    value={settings.profile.phone}
                    onChange={(e) => handleChange('profile', 'phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
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
                    value={settings.profile.address}
                    onChange={(e) => handleChange('profile', 'address', e.target.value)}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Méthode de paiement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-primary-600" />
              Méthode de paiement
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Méthode de paiement
                </label>
                <select
                  value={settings.payment.method}
                  onChange={(e) => handleChange('payment', 'method', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                >
                  <option value="mobile_money">Mobile Money</option>
                  <option value="bank_transfer">Virement bancaire</option>
                </select>
              </div>
              {settings.payment.method === 'mobile_money' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Numéro Mobile Money
                  </label>
                  <input
                    type="tel"
                    value={settings.payment.mobileMoneyNumber}
                    onChange={(e) => handleChange('payment', 'mobileMoneyNumber', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              )}
              {settings.payment.method === 'bank_transfer' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Coordonnées bancaires
                  </label>
                  <textarea
                    value={settings.payment.bankAccount}
                    onChange={(e) => handleChange('payment', 'bankAccount', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    placeholder="Banque, IBAN, Nom du titulaire..."
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-primary-600" />
              Notifications
            </h2>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                  <div>
                    <h3 className="font-semibold text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {key === 'emailNotifications' && 'Recevoir des notifications par email'}
                      {key === 'smsNotifications' && 'Recevoir des notifications par SMS'}
                      {key === 'commissionAlerts' && 'Alertes lors de nouvelles commissions'}
                      {key === 'weeklyReport' && 'Rapport hebdomadaire par email'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value as boolean}
                      onChange={(e) => handleChange('notifications', key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Préférences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-primary-600" />
              Préférences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Langue
                </label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handleChange('preferences', 'language', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Devise
                </label>
                <select
                  value={settings.preferences.currency}
                  onChange={(e) => handleChange('preferences', 'currency', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                >
                  <option value="XOF">FCFA (XOF)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="USD">Dollar (USD)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fuseau horaire
                </label>
                <select
                  value={settings.preferences.timezone}
                  onChange={(e) => handleChange('preferences', 'timezone', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                >
                  <option value="Africa/Porto-Novo">Porto-Novo (GMT+1)</option>
                  <option value="Africa/Lagos">Lagos (GMT+1)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Sécurité */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-primary-600" />
              Sécurité
            </h2>
            <div className="space-y-4">
              <Link
                to="/change-password"
                className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 hover:border-primary-300 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-gray-600 group-hover:text-primary-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Changer le mot de passe</h3>
                    <p className="text-sm text-gray-600">Mettez à jour votre mot de passe</p>
                  </div>
                </div>
                <span className="text-primary-600 group-hover:text-primary-700">Modifier</span>
              </Link>
            </div>
          </motion.div>

          {/* Bouton de sauvegarde */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-end"
          >
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sauvegarde...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Enregistrer les modifications</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AffiliateSettings
