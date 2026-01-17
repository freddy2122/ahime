import { motion } from 'framer-motion'
import { Truck, MapPin, Clock, Shield } from 'lucide-react'

const Delivery = () => {
  const deliveryInfo = [
    {
      icon: MapPin,
      title: 'Zones de livraison',
      description: 'Nous livrons dans tout le Bénin : Cotonou, Porto-Novo, Parakou, Abomey-Calavi et toutes les villes principales.',
    },
    {
      icon: Clock,
      title: 'Délais de livraison',
      description: 'Livraison express : 24h (Cotonou), 48h (villes principales), 3-5 jours (autres zones).',
    },
    {
      icon: Shield,
      title: 'Livraison sécurisée',
      description: 'Tous nos produits sont emballés avec soin et assurés pendant le transport.',
    },
    {
      icon: Truck,
      title: 'Suivi en temps réel',
      description: 'Suivez votre colis en temps réel avec notre système de tracking avancé.',
    },
  ]

  const deliveryZones = [
    {
      zone: 'Cotonou et environs',
      price: '5 000 XOF',
      delay: '24h',
    },
    {
      zone: 'Porto-Novo, Abomey-Calavi, Sèmè-Podji',
      price: '7 000 XOF',
      delay: '48h',
    },
    {
      zone: 'Parakou, Djougou, Natitingou',
      price: '10 000 XOF',
      delay: '3-5 jours',
    },
    {
      zone: 'Autres villes',
      price: '15 000 XOF',
      delay: '5-7 jours',
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
            <Truck className="w-10 h-10 text-accent-600" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Livraison
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Livraison rapide et sécurisée partout au Bénin
          </p>
        </motion.div>

        {/* Informations de livraison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {deliveryInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-50 mb-4">
                  <Icon className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{info.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Tarifs de livraison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8"
        >
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">
            Tarifs et délais de livraison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Zone de livraison</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Frais</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Délai</th>
                </tr>
              </thead>
              <tbody>
                {deliveryZones.map((zone, index) => (
                  <motion.tr
                    key={zone.zone}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-gray-700">{zone.zone}</td>
                    <td className="py-4 px-4 font-semibold text-primary-600">{zone.price}</td>
                    <td className="py-4 px-4 text-gray-600">{zone.delay}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Informations importantes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl shadow-md p-8 text-white"
        >
          <h2 className="font-heading text-3xl font-bold mb-4">
            Informations importantes
          </h2>
          <ul className="space-y-3 max-w-3xl">
            <li className="flex items-start space-x-3">
              <span className="mt-1">✓</span>
              <span>La livraison est gratuite pour les commandes supérieures à 50 000 XOF dans les grandes villes.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="mt-1">✓</span>
              <span>Vous recevrez un SMS ou un appel avant la livraison pour confirmer votre disponibilité.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="mt-1">✓</span>
              <span>En cas d'absence, le livreur repassera le lendemain. Trois tentatives seront effectuées.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="mt-1">✓</span>
              <span>Vérifiez votre colis avant de signer la réception. En cas de problème, contactez-nous immédiatement.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default Delivery
