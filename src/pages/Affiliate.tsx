import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, DollarSign, TrendingUp, Share2, BarChart3, Gift, CheckCircle } from 'lucide-react'

const Affiliate = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Commissions attractives',
      description: 'Gagnez jusqu\'à 15% de commission sur chaque vente générée',
    },
    {
      icon: TrendingUp,
      title: 'Suivi en temps réel',
      description: 'Suivez vos performances et vos revenus en temps réel',
    },
    {
      icon: Share2,
      title: 'Liens uniques',
      description: 'Obtenez des liens d\'affiliation personnalisés faciles à partager',
    },
    {
      icon: BarChart3,
      title: 'Tableau de bord complet',
      description: 'Accédez à des statistiques détaillées sur vos ventes et conversions',
    },
    {
      icon: Gift,
      title: 'Paiements réguliers',
      description: 'Recevez vos commissions chaque mois par Mobile Money ou virement',
    },
    {
      icon: Users,
      title: 'Support dédié',
      description: 'Bénéficiez d\'un support dédié pour maximiser vos revenus',
    },
  ]

  const howItWorks = [
    {
      step: 1,
      title: 'Inscription',
      description: 'Créez votre compte affilié en quelques minutes. C\'est gratuit et sans engagement.',
    },
    {
      step: 2,
      title: 'Obtenez vos liens',
      description: 'Générez vos liens d\'affiliation uniques pour les produits ou catégories de votre choix.',
    },
    {
      step: 3,
      title: 'Partagez',
      description: 'Partagez vos liens sur vos réseaux sociaux, blog, site web ou avec votre communauté.',
    },
    {
      step: 4,
      title: 'Gagnez des commissions',
      description: 'Recevez des commissions sur chaque achat effectué via vos liens d\'affiliation.',
    },
  ]

  const requirements = [
    'Avoir au moins 18 ans',
    'Résider au Bénin ou dans un pays d\'Afrique de l\'Ouest',
    'Avoir une audience active (réseaux sociaux, blog, site web, etc.)',
    'Respecter nos conditions d\'utilisation et notre charte éthique',
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
            <Users className="w-10 h-10 text-accent-600" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Programme d'Affiliation Ahimè
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Gagnez de l'argent en recommandant nos produits. Rejoignez notre programme d'affiliation et commencez à générer des revenus passifs dès aujourd'hui.
          </p>
        </motion.div>

        {/* Bannière CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 md:p-12 text-white text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Gagnez jusqu'à 15% de commission
          </h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Rejoignez des centaines d'affiliés qui génèrent des revenus en recommandant nos produits de qualité.
          </p>
          <Link
            to="/affiliate/register"
            className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            <span>Rejoindre le programme</span>
            <TrendingUp className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Avantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8 text-center">
            Pourquoi devenir affilié ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 mb-4">
                    <Icon className="w-6 h-6 text-accent-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Comment ça marche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8 text-center">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="bg-white rounded-xl shadow-md p-6 text-center relative"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 mt-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-8 mb-12"
        >
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
            Conditions d'éligibilité
          </h2>
          <div className="space-y-4">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{requirement}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Structure des commissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-8 mb-12"
        >
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
            Structure des commissions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-primary-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-black text-primary-600 mb-2">10%</div>
              <div className="text-gray-600 font-semibold mb-1">Niveau Débutant</div>
              <div className="text-sm text-gray-500">0 - 10 ventes/mois</div>
            </div>
            <div className="border-2 border-accent-500 rounded-lg p-6 text-center bg-accent-50">
              <div className="text-3xl font-black text-accent-600 mb-2">12%</div>
              <div className="text-gray-900 font-semibold mb-1">Niveau Intermédiaire</div>
              <div className="text-sm text-gray-600">11 - 50 ventes/mois</div>
            </div>
            <div className="border-2 border-primary-600 rounded-lg p-6 text-center bg-primary-50">
              <div className="text-3xl font-black text-primary-700 mb-2">15%</div>
              <div className="text-gray-900 font-semibold mb-1">Niveau Expert</div>
              <div className="text-sm text-gray-600">50+ ventes/mois</div>
            </div>
          </div>
        </motion.div>

        {/* FAQ rapide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-8 mb-12"
        >
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Quand suis-je payé ?
              </h3>
              <p className="text-gray-600">
                Les commissions sont calculées mensuellement et payées le 15 de chaque mois pour les ventes du mois précédent. Le paiement minimum est de 10 000 FCFA.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment sont suivies les ventes ?
              </h3>
              <p className="text-gray-600">
                Chaque lien d'affiliation contient un identifiant unique. Les ventes sont automatiquement attribuées à votre compte lorsqu'un client clique sur votre lien et effectue un achat dans les 30 jours.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Puis-je promouvoir n'importe quel produit ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez promouvoir tous les produits disponibles sur Ahimè. Certains produits peuvent avoir des commissions spéciales, indiquées dans votre tableau de bord.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl shadow-lg p-8 text-white text-center"
        >
          <h2 className="font-heading text-3xl font-bold mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Rejoignez notre programme d'affiliation dès aujourd'hui et commencez à générer des revenus en recommandant des produits de qualité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/affiliate/register"
              className="inline-flex items-center justify-center space-x-2 bg-white text-accent-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              <span>S'inscrire maintenant</span>
              <Users className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center space-x-2 bg-white/25 backdrop-blur-md text-white border-2 border-white/60 px-8 py-4 rounded-lg font-semibold hover:bg-white/35 transition-colors text-lg"
            >
              <span>Nous contacter</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Affiliate
