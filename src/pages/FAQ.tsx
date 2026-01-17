import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqCategories = [
    {
      category: 'Commandes',
      questions: [
        {
          q: 'Comment passer une commande ?',
          a: 'Pour passer une commande, parcourez notre catalogue, ajoutez les produits à votre panier, puis procédez au paiement. Vous recevrez une confirmation par email avec le numéro de suivi de votre commande.',
        },
        {
          q: 'Puis-je modifier ma commande après validation ?',
          a: 'Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant sa validation, à condition qu\'elle n\'ait pas encore été expédiée. Contactez notre service client pour toute modification.',
        },
        {
          q: 'Comment suivre ma commande ?',
          a: 'Une fois votre commande passée, vous recevrez un numéro de suivi par email. Vous pouvez également suivre votre commande dans votre espace client dans la section "Mes commandes".',
        },
      ],
    },
    {
      category: 'Paiement',
      questions: [
        {
          q: 'Quels modes de paiement sont acceptés ?',
          a: 'Nous acceptons plusieurs modes de paiement : Mobile Money (MTN, Moov), Carte bancaire, Virement bancaire et Paiement à la livraison dans certaines zones. Tous les paiements sont sécurisés et cryptés.',
        },
        {
          q: 'Le paiement est-il sécurisé ?',
          a: 'Oui, tous les paiements sont sécurisés via des passerelles de paiement certifiées et cryptées. Nous ne stockons jamais vos informations bancaires complètes sur nos serveurs.',
        },
        {
          q: 'Puis-je payer à la livraison ?',
          a: 'Oui, le paiement à la livraison est disponible pour les commandes dans les grandes villes (Cotonou, Porto-Novo). Les frais supplémentaires sont de 2 000 XOF.',
        },
      ],
    },
    {
      category: 'Livraison',
      questions: [
        {
          q: 'Quels sont les délais de livraison ?',
          a: 'Les délais de livraison varient selon la zone : 24h pour Cotonou, 48h pour les villes principales, et 3-5 jours pour les autres zones du Bénin.',
        },
        {
          q: 'Quels sont les frais de livraison ?',
          a: 'Les frais de livraison varient selon la zone (entre 5 000 et 15 000 XOF). La livraison est gratuite pour les commandes supérieures à 50 000 XOF dans les grandes villes.',
        },
        {
          q: 'Puis-je choisir l\'heure de livraison ?',
          a: 'Oui, lors de la commande, vous pouvez indiquer vos préférences d\'horaire. Notre livreur vous contactera également avant la livraison pour confirmer votre disponibilité.',
        },
      ],
    },
    {
      category: 'Retours et remboursements',
      questions: [
        {
          q: 'Puis-je retourner un article ?',
          a: 'Oui, vous avez 14 jours pour retourner un article non utilisé, en parfait état, avec son emballage d\'origine. Les retours sont gratuits pour les articles défectueux.',
        },
        {
          q: 'Comment initier un retour ?',
          a: 'Connectez-vous à votre compte, allez dans "Mes commandes", sélectionnez la commande concernée et cliquez sur "Demander un retour". Notre équipe validera votre demande sous 24h.',
        },
        {
          q: 'Quand serai-je remboursé ?',
          a: 'Une fois l\'article retourné et vérifié, le remboursement sera effectué sous 5 à 7 jours ouvrables sur votre compte ou mode de paiement original.',
        },
      ],
    },
    {
      category: 'Produits',
      questions: [
        {
          q: 'Les produits sont-ils neufs ?',
          a: 'Oui, tous nos produits sont neufs, d\'origine et garantis par les fabricants. Nous ne vendons jamais de produits reconditionnés ou d\'occasion sans l\'indiquer clairement.',
        },
        {
          q: 'Y a-t-il une garantie sur les produits ?',
          a: 'Oui, tous nos produits électroniques bénéficient de la garantie constructeur. La durée de garantie varie selon le produit et le fabricant (généralement 1 à 2 ans).',
        },
        {
          q: 'Puis-je voir les produits avant de les acheter ?',
          a: 'Nous proposons des photos haute qualité et des descriptions détaillées pour chaque produit. Pour certains articles volumineux, une visite en showroom peut être organisée sur rendez-vous.',
        },
      ],
    },
  ]

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  let questionIndex = 0

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
            <HelpCircle className="w-10 h-10 text-accent-600" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Questions fréquentes (FAQ)
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions
          </p>
        </motion.div>

        {/* FAQ par catégories */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6">
                <h2 className="font-heading text-2xl font-bold text-white">
                  {category.category}
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {category.questions.map((faq) => {
                  const currentIndex = questionIndex++
                  const isOpen = openIndex === currentIndex

                  return (
                    <div key={faq.q} className="overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(currentIndex)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact supplémentaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl shadow-md p-8 text-white text-center max-w-4xl mx-auto"
        >
          <h2 className="font-heading text-3xl font-bold mb-4">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p className="text-white/90 mb-6">
            Notre équipe de support est là pour vous aider. Contactez-nous et nous vous répondrons dans les plus brefs délais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/help"
              className="inline-flex items-center justify-center space-x-2 bg-white text-accent-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Centre d'aide</span>
            </a>
            <a
              href="mailto:support@lorele-commerce.bj"
              className="inline-flex items-center justify-center space-x-2 bg-white/10 border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              <span>Nous contacter</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ
