import { Truck, Shield, HeadphonesIcon, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'

interface Feature {
  icon: React.ElementType
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    icon: Truck,
    title: 'Livraison Rapide',
    description: 'Livraison dans tout le Bénin en 24-48h',
    color: 'text-primary-600',
  },
  {
    icon: Shield,
    title: 'Paiement Sécurisé',
    description: 'Transactions 100% sécurisées et protégées',
    color: 'text-accent-500',
  },
  {
    icon: HeadphonesIcon,
    title: 'Support 24/7',
    description: 'Notre équipe est à votre service',
    color: 'text-primary-600',
  },
  {
    icon: CreditCard,
    title: 'Paiement Flexible',
    description: 'Plusieurs modes de paiement disponibles',
    color: 'text-accent-500',
  },
]

const FeaturesSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Pourquoi Choisir Ahimè ?
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            Des services de qualité pour une expérience d'achat exceptionnelle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-50 mb-4 sm:mb-6 group-hover:bg-accent-50 transition-colors">
                  <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${feature.color}`} />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
