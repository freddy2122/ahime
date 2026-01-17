import { motion } from 'framer-motion'
import { Briefcase, Users, TrendingUp, Heart } from 'lucide-react'

const Careers = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Croissance professionnelle',
      description: 'Opportunités d\'évolution et de développement de compétences dans un environnement dynamique.',
    },
    {
      icon: Users,
      title: 'Équipe passionnée',
      description: 'Rejoignez une équipe jeune, motivée et engagée dans la révolution du e-commerce au Bénin.',
    },
    {
      icon: Heart,
      title: 'Bien-être au travail',
      description: 'Environnement de travail agréable, horaires flexibles et équilibre vie professionnelle/personnelle.',
    },
    {
      icon: Briefcase,
      title: 'Rémunération attractive',
      description: 'Salaire compétitif, primes de performance et avantages sociaux complets.',
    },
  ]

  const openPositions = [
    {
      title: 'Développeur Full Stack',
      department: 'Technique',
      type: 'CDI - Temps plein',
      location: 'Cotonou',
      description: 'Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe technique et contribuer au développement de notre plateforme e-commerce.',
    },
    {
      title: 'Responsable Marketing Digital',
      department: 'Marketing',
      type: 'CDI - Temps plein',
      location: 'Cotonou / Télétravail',
      description: 'Poste clé pour développer notre présence digitale, gérer nos campagnes publicitaires et notre stratégie de communication sur les réseaux sociaux.',
    },
    {
      title: 'Chargé(e) de Service Client',
      department: 'Support',
      type: 'CDI - Temps plein',
      location: 'Cotonou',
      description: 'Rejoignez notre équipe support pour offrir une expérience client exceptionnelle et résoudre les problématiques de nos clients.',
    },
    {
      title: 'Responsable Logistique',
      department: 'Logistique',
      type: 'CDI - Temps plein',
      location: 'Cotonou',
      description: 'Gérer la chaîne d\'approvisionnement, optimiser les processus de livraison et coordonner avec nos partenaires de transport.',
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
          className="text-center mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Carrières chez Ahimè
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Rejoignez une équipe passionnée qui transforme le e-commerce au Bénin. 
            Nous cherchons des talents motivés pour construire l'avenir du shopping en ligne.
          </p>
        </motion.div>

        {/* Pourquoi nous rejoindre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8 text-center">
            Pourquoi nous rejoindre ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-50 mb-4">
                    <Icon className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Postes ouverts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8 text-center">
            Postes ouverts
          </h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md p-6 md:p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-semibold">
                        {position.department}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {position.type}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        📍 {position.location}
                      </span>
                    </div>
                  </div>
                  <button className="btn-primary whitespace-nowrap">
                    Postuler
                  </button>
                </div>
                <p className="text-gray-600 leading-relaxed">{position.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-md p-8 md:p-12 text-white text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Vous ne trouvez pas le poste qui vous correspond ?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
            Envoyez-nous votre candidature spontanée ! Nous sommes toujours à la recherche de talents 
            pour rejoindre notre équipe en pleine croissance.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            <span>Envoyer une candidature spontanée</span>
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Careers
