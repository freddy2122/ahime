import { motion } from 'framer-motion'
import { HelpCircle, Mail, Phone, MessageCircle } from 'lucide-react'

const HelpCenter = () => {
  const helpSections = [
    {
      title: 'Comment passer une commande ?',
      content: 'Pour passer une commande, parcourez notre catalogue, ajoutez les produits souhaités à votre panier, puis procédez au paiement. Vous recevrez une confirmation par email une fois votre commande validée.',
    },
    {
      title: 'Comment suivre ma commande ?',
      content: 'Une fois votre commande passée, vous recevrez un numéro de suivi par email. Vous pouvez également suivre votre commande dans votre espace client dans la section "Mes commandes".',
    },
    {
      title: 'Puis-je modifier ou annuler ma commande ?',
      content: 'Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant sa validation, à condition qu\'elle n\'ait pas encore été expédiée. Contactez notre service client pour toute modification.',
    },
    {
      title: 'Quels modes de paiement sont acceptés ?',
      content: 'Nous acceptons plusieurs modes de paiement : Mobile Money (MTN, Moov), Carte bancaire, Virement bancaire et Paiement à la livraison dans certaines zones.',
    },
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: 'Appelez-nous',
      description: 'Lun - Ven : 8h - 18h',
      contact: '+229 XX XX XX XX',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Réponse sous 24h',
      contact: 'support@lorele-commerce.bj',
    },
    {
      icon: MessageCircle,
      title: 'Chat en direct',
      description: 'Disponible 24/7',
      contact: 'Cliquez pour discuter',
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 mb-6">
            <HelpCircle className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Centre d'aide
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions ou contactez notre équipe support
          </p>
        </motion.div>

        {/* Méthodes de contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-4">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                <p className="text-primary-600 font-semibold">{method.contact}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Questions fréquentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8"
        >
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {helpSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Informations supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-md p-8 text-white text-center"
        >
          <h2 className="font-heading text-3xl font-bold mb-4">
            Besoin d'aide supplémentaire ?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Notre équipe de support est là pour vous aider. N'hésitez pas à nous contacter par téléphone, email ou chat en direct.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+229XXXXXXXX"
              className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Nous appeler</span>
            </a>
            <a
              href="mailto:support@lorele-commerce.bj"
              className="inline-flex items-center justify-center space-x-2 bg-white/10 border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Envoyer un email</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HelpCenter
