import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Category {
  name: string
  slug: string
  image: string
  productCount: string
}

const categories: Category[] = [
  {
    name: 'Électronique',
    slug: 'electronique',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
    productCount: '500+ produits',
  },
  {
    name: 'Mode & Vêtements',
    slug: 'mode-vetements',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    productCount: '300+ produits',
  },
  {
    name: 'Maison & Décoration',
    slug: 'maison-decoration',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    productCount: '250+ produits',
  },
  {
    name: 'Beauté & Santé',
    slug: 'beaute-sante',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
    productCount: '200+ produits',
  },
  {
    name: 'Alimentation',
    slug: 'alimentation',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
    productCount: '400+ produits',
  },
  {
    name: 'Sport & Loisirs',
    slug: 'sport-loisirs',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    productCount: '150+ produits',
  },
]

const CategoriesSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-primary-600 mb-4">
            Nos Catégories
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            Explorez notre large gamme de produits organisés par catégories
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/category/${category.slug}`}
                className="group block relative overflow-hidden rounded-xl bg-gray-100 aspect-square shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                  <h3 className="font-heading text-white text-lg sm:text-xl font-bold mb-1 sm:mb-2 group-hover:text-accent-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mb-3">
                    {category.productCount}
                  </p>
                  <div className="flex items-center text-accent-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Voir plus</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection
