import { motion } from 'framer-motion'
import { Target, Users, Award, Heart } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Notre Mission',
      description: 'Offrir un accès facile et rapide à une large gamme de produits de qualité pour tous les Béninois, en simplifiant l\'expérience d\'achat en ligne.',
    },
    {
      icon: Users,
      title: 'Notre Vision',
      description: 'Devenir la plateforme e-commerce de référence au Bénin, en favorisant l\'économie locale et en démocratisant le commerce électronique.',
    },
    {
      icon: Award,
      title: 'Nos Valeurs',
      description: 'Qualité, transparence, rapidité et service client au cœur de tout ce que nous faisons. Votre satisfaction est notre priorité absolue.',
    },
    {
      icon: Heart,
      title: 'Notre Engagement',
      description: 'Soutenir l\'économie béninoise, créer des emplois locaux et offrir une expérience d\'achat exceptionnelle à chaque client.',
    },
  ]

  const stats = [
    { number: '5000+', label: 'Clients satisfaits' },
    { number: '2000+', label: 'Produits disponibles' },
    { number: '50+', label: 'Villes desservies' },
    { number: '24/7', label: 'Support client' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 lg:pb-0">
      <div className="container mx-auto px-4 py-12">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-primary-600 mb-6">
            À propos de Ahimè
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Votre marché en ligne au Bénin. Nous sommes passionnés par l'innovation 
            et engagés à rendre le shopping en ligne accessible, rapide et agréable pour tous.
          </p>
        </motion.div>

        {/* Histoire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Notre Histoire
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
            <p>
              Fondé en 2024, <strong className="text-primary-600">Ahimè</strong> est né de la volonté 
              de révolutionner l'expérience d'achat en ligne au Bénin. Face au manque d'options 
              locales de qualité, nous avons décidé de créer une plateforme qui allie innovation, 
              accessibilité et service client exceptionnel.
            </p>
            <p>
              Aujourd'hui, nous sommes fiers d'être devenus une référence dans l'e-commerce béninois, 
              avec des milliers de produits disponibles, une livraison rapide dans tout le pays, 
              et un engagement inébranlable envers la satisfaction de nos clients.
            </p>
            <p>
              Notre nom <strong className="text-primary-600">Ahimè</strong> signifie "Marché" en langue locale, 
              symbolisant notre mission de créer un véritable marché en ligne accessible à tous, 
              où tradition et modernité se rencontrent harmonieusement.
            </p>
          </div>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-md p-6 text-center text-white"
            >
              <div className="font-heading text-3xl md:text-4xl font-black mb-2">
                {stat.number}
              </div>
              <div className="text-white/90 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Valeurs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Ce qui nous définit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md p-6 md:p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl shadow-md p-8 md:p-12 text-white text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Rejoignez l'aventure Ahimè
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
            Découvrez nos produits, profitez de nos offres exclusives et faites partie d'une communauté 
            qui grandit chaque jour. Votre satisfaction est au cœur de notre mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/boutique"
              className="inline-flex items-center justify-center space-x-2 bg-white text-accent-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              <span>Découvrir nos produits</span>
            </a>
            <a
              href="/careers"
              className="inline-flex items-center justify-center space-x-2 bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors text-lg"
            >
              <span>Nous rejoindre</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
