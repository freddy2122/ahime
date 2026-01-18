import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Save, Store, Mail, CreditCard, Bell, Shield, Globe } from 'lucide-react'

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    storeName: 'Ahimè',
    storeEmail: 'contact@ahime.bj',
    storePhone: '+229 XX XX XX XX',
    currency: 'XOF',
    timezone: 'Africa/Porto-Novo',
    language: 'fr',
    emailNotifications: true,
    smsNotifications: false,
    paymentMethods: {
      mobile_money: true,
      card: true,
      bank_transfer: true,
    },
  })

  const tabs = [
    { id: 'general', label: 'Général', icon: Store },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Paiement', icon: CreditCard },
    { id: 'security', label: 'Sécurité', icon: Shield },
  ]

  const handleSave = () => {
    // TODO: Sauvegarder dans Supabase
    alert('Paramètres sauvegardés avec succès!')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-primary-600 mb-2 flex items-center">
                <Settings className="w-8 h-8 mr-3" />
                Paramètres
              </h1>
              <p className="text-gray-600">
                Gérez les paramètres de votre boutique
              </p>
            </div>
            <button onClick={handleSave} className="btn-primary flex items-center space-x-2 mt-4 md:mt-0">
              <Save className="w-5 h-5" />
              <span>Sauvegarder</span>
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
        >
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 flex items-center space-x-2 font-semibold border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600 bg-primary-50'
                      : 'border-transparent text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          <div className="p-6">
            {/* Onglet Général */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom de la boutique</label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email de contact</label>
                  <input
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={settings.storePhone}
                    onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Devise</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    >
                      <option value="XOF">XOF (Franc CFA)</option>
                      <option value="EUR">EUR (Euro)</option>
                      <option value="USD">USD (Dollar)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Fuseau horaire</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    >
                      <option value="Africa/Porto-Novo">Porto-Novo (GMT+1)</option>
                      <option value="Africa/Lagos">Lagos (GMT+1)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">Notifications email</p>
                    <p className="text-sm text-gray-600">Recevoir des notifications par email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">Notifications SMS</p>
                    <p className="text-sm text-gray-600">Recevoir des notifications par SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Onglet Paiement */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">Mobile Money</p>
                    <p className="text-sm text-gray-600">Activer les paiements Mobile Money</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.paymentMethods.mobile_money}
                      onChange={(e) => setSettings({
                        ...settings,
                        paymentMethods: { ...settings.paymentMethods, mobile_money: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">Carte bancaire</p>
                    <p className="text-sm text-gray-600">Activer les paiements par carte</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.paymentMethods.card}
                      onChange={(e) => setSettings({
                        ...settings,
                        paymentMethods: { ...settings.paymentMethods, card: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">Virement bancaire</p>
                    <p className="text-sm text-gray-600">Activer les virements bancaires</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.paymentMethods.bank_transfer}
                      onChange={(e) => setSettings({
                        ...settings,
                        paymentMethods: { ...settings.paymentMethods, bank_transfer: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Onglet Sécurité */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Authentification à deux facteurs</h3>
                  <p className="text-sm text-gray-600 mb-4">Sécurisez votre compte avec l'authentification à deux facteurs</p>
                  <button className="btn-secondary">Activer 2FA</button>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Changer le mot de passe</h3>
                  <button className="btn-secondary">Modifier le mot de passe</button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminSettings
