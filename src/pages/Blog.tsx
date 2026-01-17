import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: '10 astuces pour faire du shopping en ligne au Bénin',
      excerpt: 'Découvrez nos conseils pour faire vos achats en ligne en toute sécurité et trouver les meilleures offres.',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
      category: 'Shopping',
      author: 'Équipe Ahimè',
      date: '15 Jan 2024',
      readTime: '5 min de lecture',
    },
    {
      id: 2,
      title: 'Comment choisir le bon smartphone en 2024 ?',
      excerpt: 'Guide complet pour choisir un smartphone adapté à vos besoins et votre budget au Bénin.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
      category: 'Électronique',
      author: 'Équipe Ahimè',
      date: '12 Jan 2024',
      readTime: '8 min de lecture',
    },
    {
      id: 3,
      title: 'Livraison express : tout ce que vous devez savoir',
      excerpt: 'Comprenez nos processus de livraison et comment nous assurons une livraison rapide dans tout le Bénin.',
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=600&fit=crop',
      category: 'Livraison',
      author: 'Équipe Ahimè',
      date: '10 Jan 2024',
      readTime: '6 min de lecture',
    },
    {
      id: 4,
      title: 'Les tendances mode 2024 pour hommes et femmes',
      excerpt: 'Découvrez les dernières tendances mode qui arrivent au Bénin et comment les adopter avec style.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      category: 'Mode',
      author: 'Équipe Ahimè',
      date: '8 Jan 2024',
      readTime: '7 min de lecture',
    },
    {
      id: 5,
      title: 'Économiser de l\'argent avec nos promotions',
      excerpt: 'Apprenez à profiter au maximum de nos offres promotionnelles et économisez sur vos achats quotidiens.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      category: 'Promotions',
      author: 'Équipe Ahimè',
      date: '5 Jan 2024',
      readTime: '4 min de lecture',
    },
    {
      id: 6,
      title: 'Comment équiper votre maison au meilleur prix ?',
      excerpt: 'Guide pratique pour meubler et équiper votre intérieur avec des produits de qualité à prix compétitifs.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      category: 'Maison',
      author: 'Équipe Ahimè',
      date: '3 Jan 2024',
      readTime: '10 min de lecture',
    },
  ]

  const categories = ['Tous', 'Shopping', 'Électronique', 'Mode', 'Maison', 'Livraison', 'Promotions']

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
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Blog Ahimè
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Actualités, conseils et astuces pour optimiser votre expérience d'achat en ligne
          </p>
        </motion.div>

        {/* Catégories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8"
        >
          <Tag className="w-5 h-5 text-gray-600 flex-shrink-0" />
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-200"
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles du blog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h2 className="font-heading text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold text-sm group"
                  >
                    <span>Lire la suite</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-md p-8 md:p-12 text-white text-center"
        >
          <h2 className="font-heading text-3xl font-bold mb-4">
            Restez informé de nos dernières actualités
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Abonnez-vous à notre newsletter pour recevoir nos nouveaux articles directement dans votre boîte mail.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              S'abonner
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Blog
