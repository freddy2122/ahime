import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { toast } from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation d'envoi
    toast.success('Votre message a été envoyé avec succès ! Nous vous répondrons sous 24h.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['Bénin, Afrique de l\'Ouest', 'Cotonou, Zone industrielle'],
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['+229 XX XX XX XX', 'Lun - Ven : 8h - 18h'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@lorele-commerce.bj', 'support@lorele-commerce.bj'],
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: ['Lundi - Vendredi : 8h - 18h', 'Samedi : 9h - 15h'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0">
      <div className="container mx-auto px-4 py-12">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Contactez-nous
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Une question ? Une suggestion ? Notre équipe est là pour vous aider. 
            N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm mb-1">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="+229 XX XX XX XX"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="question">Question générale</option>
                    <option value="order">Commande</option>
                    <option value="delivery">Livraison</option>
                    <option value="return">Retour / Remboursement</option>
                    <option value="technical">Problème technique</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                    placeholder="Votre message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center space-x-2 text-lg"
                >
                  <Send className="w-5 h-5" />
                  <span>Envoyer le message</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
