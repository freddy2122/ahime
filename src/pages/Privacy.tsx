import { motion } from 'framer-motion'
import { Shield, Lock, Eye, FileText } from 'lucide-react'

const Privacy = () => {
  const privacySections = [
    {
      icon: FileText,
      title: '1. Collecte des informations',
      content: [
        'Nous collectons les informations que vous nous fournissez directement lors de votre inscription, de votre commande ou de votre contact avec notre service client.',
        'Ces informations incluent : nom, prénom, adresse email, numéro de téléphone, adresse de livraison, informations de paiement.',
        'Nous collectons également automatiquement certaines informations lorsque vous utilisez notre site : adresse IP, type de navigateur, pages visitées, durée de visite.',
      ],
    },
    {
      icon: Eye,
      title: '2. Utilisation des informations',
      content: [
        'Nous utilisons vos informations pour : traiter et livrer vos commandes, communiquer avec vous concernant vos commandes, vous envoyer des communications marketing (avec votre consentement), améliorer notre site et nos services.',
        'Nous ne vendons jamais vos données personnelles à des tiers.',
        'Nous pouvons partager vos informations uniquement avec nos partenaires de confiance (livreurs, prestataires de paiement) dans le cadre strict de l\'exécution de vos commandes.',
      ],
    },
    {
      icon: Lock,
      title: '3. Protection des données',
      content: [
        'Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte, destruction ou altération.',
        'Vos informations de paiement sont cryptées et sécurisées via des passerelles de paiement certifiées. Nous ne stockons jamais vos informations bancaires complètes sur nos serveurs.',
        'Nous conservons vos données personnelles uniquement le temps nécessaire aux fins pour lesquelles elles ont été collectées, conformément à la législation en vigueur.',
      ],
    },
    {
      icon: Shield,
      title: '4. Vos droits',
      content: [
        'Conformément à la loi sur la protection des données, vous disposez des droits suivants : droit d\'accès à vos données, droit de rectification, droit à l\'effacement, droit à la limitation du traitement, droit à la portabilité des données, droit d\'opposition.',
        'Pour exercer ces droits, vous pouvez nous contacter à l\'adresse : privacy@lorele-commerce.bj ou via notre formulaire de contact.',
        'Vous pouvez également retirer votre consentement à tout moment pour les communications marketing.',
      ],
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
            <Shield className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Dernière mise à jour : 15 Janvier 2024
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8"
        >
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            Chez <strong className="text-primary-600">Ahimè</strong>, nous nous engageons à protéger votre vie privée 
            et à garantir la sécurité de vos données personnelles. Cette politique de confidentialité explique 
            comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            En utilisant notre site, vous acceptez les pratiques décrites dans cette politique. 
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {privacySections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className="bg-white rounded-xl shadow-md p-6 md:p-8"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <div className="ml-16 space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-md p-8 text-white text-center"
        >
          <h2 className="font-heading text-3xl font-bold mb-4">
            Questions sur votre confidentialité ?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Si vous avez des questions concernant notre politique de confidentialité ou vos données personnelles, 
            n'hésitez pas à nous contacter.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            <span>Nous contacter</span>
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Privacy
