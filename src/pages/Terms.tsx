import { motion } from 'framer-motion'
import { FileText, ShoppingCart, CreditCard, AlertCircle } from 'lucide-react'

const Terms = () => {
  const termsSections = [
    {
      icon: ShoppingCart,
      title: '1. Conditions d\'utilisation',
      content: [
        'En accédant et en utilisant le site Ahimè, vous acceptez d\'être lié par les présentes conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser notre site.',
        'Le site est destiné aux personnes de 18 ans et plus. En utilisant notre service, vous déclarez avoir atteint l\'âge légal pour contracter dans votre juridiction.',
        'Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur le site.',
      ],
    },
    {
      icon: CreditCard,
      title: '2. Commandes et paiement',
      content: [
        'Toute commande passée sur notre site constitue une offre d\'achat. Nous nous réservons le droit d\'accepter ou de refuser toute commande à notre discrétion.',
        'Les prix affichés sont en francs CFA (XOF) et incluent la TVA lorsque applicable. Nous nous réservons le droit de modifier les prix à tout moment, mais les produits déjà commandés seront facturés au prix en vigueur au moment de la commande.',
        'Le paiement doit être effectué intégralement avant l\'expédition de la commande. Nous acceptons plusieurs modes de paiement : Mobile Money, carte bancaire, virement bancaire, paiement à la livraison (dans certaines zones).',
        'En cas de non-paiement ou de paiement refusé, nous nous réservons le droit d\'annuler votre commande.',
      ],
    },
    {
      icon: FileText,
      title: '3. Livraison et risque',
      content: [
        'Les délais de livraison indiqués sont approximatifs et peuvent varier selon la zone et les circonstances. Nous ne garantissons pas de délai précis, mais nous nous efforçons de respecter les délais annoncés.',
        'Le risque de perte et de dommage des produits vous est transféré dès la livraison à l\'adresse indiquée lors de la commande.',
        'En cas de non-disponibilité d\'un produit après validation de votre commande, nous vous en informerons et vous proposerons une solution de remplacement ou un remboursement intégral.',
      ],
    },
    {
      icon: AlertCircle,
      title: '4. Retours et remboursements',
      content: [
        'Conformément à notre politique de retour, vous disposez de 14 jours pour retourner un article non utilisé, en parfait état, avec son emballage d\'origine.',
        'Les frais de retour sont à la charge du client sauf en cas de produit défectueux ou incorrect.',
        'Le remboursement sera effectué sous 5 à 7 jours ouvrables sur le même mode de paiement que celui utilisé pour la commande.',
        'Certains produits ne sont pas éligibles au retour (produits personnalisés, produits périssables, sous-vêtements).',
      ],
    },
  ]

  const legalInfo = [
    {
      title: '5. Propriété intellectuelle',
      content: 'Tous les contenus présents sur le site (textes, images, logos, design) sont la propriété exclusive d\'Ahimè ou de ses partenaires et sont protégés par les lois sur la propriété intellectuelle. Toute reproduction non autorisée est interdite.',
    },
    {
      title: '6. Responsabilité',
      content: 'Ahimè ne saurait être tenu responsable des dommages directs ou indirects résultant de l\'utilisation ou de l\'impossibilité d\'utiliser le site, des retards de livraison, ou des erreurs dans les informations affichées.',
    },
    {
      title: '7. Loi applicable',
      content: 'Les présentes conditions d\'utilisation sont régies par la législation béninoise. Tout litige sera soumis aux tribunaux compétents du Bénin.',
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-100 mb-6">
            <FileText className="w-10 h-10 text-accent-600" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Conditions d'utilisation
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
            Les présentes conditions d'utilisation régissent l'utilisation du site web <strong className="text-primary-600">Ahimè</strong> 
            et de tous les services associés. En utilisant notre site, vous acceptez ces conditions dans leur intégralité.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            Veuillez lire attentivement ces conditions avant d'utiliser notre service. 
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
          </p>
        </motion.div>

        {/* Sections principales */}
        <div className="space-y-6 mb-8">
          {termsSections.map((section, index) => {
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
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-50 flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent-600" />
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

        {/* Informations légales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {legalInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                {info.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">{info.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl shadow-md p-8 text-white text-center"
        >
          <h2 className="font-heading text-3xl font-bold mb-4">
            Questions sur nos conditions d'utilisation ?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Si vous avez des questions concernant nos conditions d'utilisation, n'hésitez pas à nous contacter.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center space-x-2 bg-white text-accent-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            <span>Nous contacter</span>
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Terms
