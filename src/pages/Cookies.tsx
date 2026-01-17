import { motion } from 'framer-motion'
import { Cookie, Settings, Shield, Info } from 'lucide-react'

const Cookies = () => {
  const cookieTypes = [
    {
      icon: Settings,
      title: 'Cookies essentiels',
      description: 'Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés. Ils sont généralement définis en réponse à des actions que vous effectuez et qui équivalent à une demande de services.',
      examples: [
        'Mémorisation de vos préférences de langue',
        'Authentification et sécurité de session',
        'Fonctionnalités de base du panier d\'achat',
      ],
      required: true,
    },
    {
      icon: Info,
      title: 'Cookies analytiques',
      description: 'Ces cookies nous permettent de compter les visites et les sources de trafic afin d\'améliorer les performances de notre site. Ils nous aident à savoir quelles pages sont les plus populaires.',
      examples: [
        'Analyse du comportement des visiteurs',
        'Mesure de l\'efficacité des campagnes marketing',
        'Amélioration de l\'expérience utilisateur',
      ],
      required: false,
    },
    {
      icon: Shield,
      title: 'Cookies de préférences',
      description: 'Ces cookies permettent au site de se souvenir des informations qui modifient la façon dont le site se comporte ou s\'affiche, comme votre langue préférée ou la région dans laquelle vous vous trouvez.',
      examples: [
        'Mémorisation de vos préférences d\'affichage',
        'Personnalisation du contenu',
        'Sauvegarde de vos paramètres de recherche',
      ],
      required: false,
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
            <Cookie className="w-10 h-10 text-accent-600" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Politique des cookies
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
            Chez <strong className="text-primary-600">Ahimè</strong>, nous utilisons des cookies et technologies similaires 
            pour améliorer votre expérience de navigation, analyser le trafic de notre site et personnaliser le contenu.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            Cette politique explique ce que sont les cookies, comment nous les utilisons et comment vous pouvez les gérer.
          </p>
        </motion.div>

        {/* Qu'est-ce qu'un cookie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Qu'est-ce qu'un cookie ?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette ou smartphone) 
            lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos actions et préférences 
            pendant une certaine période, afin que vous n'ayez pas à les ressaisir à chaque fois que vous revenez sur le site.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Les cookies ne peuvent pas endommager votre appareil ni contenir de virus. Ils sont essentiels au fonctionnement 
            de nombreux sites web modernes et améliorent votre expérience de navigation.
          </p>
        </motion.div>

        {/* Types de cookies */}
        <div className="space-y-6 mb-8">
          {cookieTypes.map((cookie, index) => {
            const Icon = cookie.icon
            return (
              <motion.div
                key={cookie.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="bg-white rounded-xl shadow-md p-6 md:p-8"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 ${
                    cookie.required ? 'bg-primary-50' : 'bg-accent-50'
                  }`}>
                    <Icon className={`w-6 h-6 ${cookie.required ? 'text-primary-600' : 'text-accent-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
                        {cookie.title}
                      </h3>
                      {cookie.required && (
                        <span className="bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded">
                          Requis
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      {cookie.description}
                    </p>
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Exemples :</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                        {cookie.examples.map((example, i) => (
                          <li key={i}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Gestion des cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Comment gérer vos cookies ?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Vous pouvez contrôler et gérer les cookies de plusieurs façons. Veuillez noter que la suppression ou le blocage 
            de cookies peut avoir un impact sur votre expérience utilisateur et certaines parties du site peuvent ne plus fonctionner correctement.
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Paramètres du navigateur :</h4>
              <p className="text-gray-600 text-sm">
                La plupart des navigateurs vous permettent de voir, supprimer et bloquer les cookies. 
                Consultez les paramètres de votre navigateur pour plus d'informations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Notre bannière de cookies :</h4>
              <p className="text-gray-600 text-sm">
                Lors de votre première visite, une bannière vous permet de choisir quels types de cookies vous acceptez. 
                Vous pouvez modifier vos préférences à tout moment via les paramètres de votre compte.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-md p-8 text-white text-center"
        >
          <h2 className="font-heading text-3xl font-bold mb-4">
            Questions sur les cookies ?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Si vous avez des questions concernant notre utilisation des cookies, n'hésitez pas à nous contacter.
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

export default Cookies
