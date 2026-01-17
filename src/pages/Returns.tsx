import { motion } from 'framer-motion'
import { RotateCcw, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const Returns = () => {
  const returnSteps = [
    {
      icon: CheckCircle,
      step: '1',
      title: 'Vérifier l\'éligibilité',
      description: 'Vérifiez que votre article est éligible au retour (dans les 14 jours, non utilisé, avec emballage d\'origine).',
    },
    {
      icon: RotateCcw,
      step: '2',
      title: 'Initier le retour',
      description: 'Connectez-vous à votre compte, allez dans "Mes commandes" et cliquez sur "Demander un retour".',
    },
    {
      icon: Clock,
      step: '3',
      title: 'Emballer et renvoyer',
      description: 'Emballez soigneusement l\'article avec tous ses accessoires. Notre livreur viendra le récupérer à votre adresse.',
    },
    {
      icon: CheckCircle,
      step: '4',
      title: 'Remboursement',
      description: 'Une fois l\'article vérifié, le remboursement sera effectué sous 5 à 7 jours ouvrables sur votre compte ou mode de paiement original.',
    },
  ]

  const returnConditions = [
    {
      icon: CheckCircle,
      title: 'Articles éligibles',
      items: [
        'Articles non utilisés et en parfait état',
        'Avec emballage d\'origine et étiquettes',
        'Dans les 14 jours suivant la livraison',
        'Avec tous les accessoires et manuels',
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: AlertCircle,
      title: 'Articles non éligibles',
      items: [
        'Articles personnalisés ou sur mesure',
        'Produits périssables ou alimentaires',
        'Articles endommagés par le client',
        'Sous-vêtements et articles d\'hygiène personnelle',
      ],
      color: 'text-red-600',
      bgColor: 'bg-red-50',
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
            <RotateCcw className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Politique de retours
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Retours faciles et remboursements rapides dans les 14 jours
          </p>
        </motion.div>

        {/* Processus de retour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8 text-center">
            Comment retourner un article ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow relative"
                >
                  <div className="absolute -top-4 left-6 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="mt-4 mb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Conditions de retour */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {returnConditions.map((condition, index) => {
            const Icon = condition.icon
            return (
              <motion.div
                key={condition.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className={`bg-white rounded-xl shadow-md p-6 md:p-8 ${condition.bgColor}`}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Icon className={`w-8 h-8 ${condition.color}`} />
                  <h2 className={`font-heading text-2xl font-bold ${condition.color}`}>
                    {condition.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {condition.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 + itemIndex * 0.05, duration: 0.5 }}
                      className="flex items-start space-x-3"
                    >
                      <span className={`mt-1 ${condition.color}`}>•</span>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Informations supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-md p-8 text-white"
        >
          <h2 className="font-heading text-3xl font-bold mb-4">
            Informations importantes
          </h2>
          <ul className="space-y-3 max-w-3xl">
            <li className="flex items-start space-x-3">
              <span className="mt-1">✓</span>
              <span>Les frais de retour sont gratuits pour les articles défectueux ou incorrects.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="mt-1">✓</span>
              <span>Pour les retours "changement d'avis", les frais de retour sont à la charge du client (5 000 XOF).</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="mt-1">✓</span>
              <span>Le remboursement sera effectué sur le même mode de paiement que celui utilisé pour la commande.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="mt-1">✓</span>
              <span>En cas de problème ou de question, contactez notre service client au +229 XX XX XX XX.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default Returns
