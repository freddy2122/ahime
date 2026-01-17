import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface Category {
  name: string
  image: string
  subcategories: string[]
}

interface MegaMenuProps {
  category: Category
}

const MegaMenu = ({ category }: MegaMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 w-screen max-w-6xl bg-white shadow-2xl rounded-2xl mt-2 overflow-hidden border border-gray-100"
      style={{ left: '50%', transform: 'translateX(-50%)' }}
    >
      <div className="grid grid-cols-4 gap-0">
        {/* Image Section */}
        <div className="col-span-1 relative overflow-hidden group">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <Link
              to={`/category/${category.name.toLowerCase()}`}
              className="text-white font-display text-xl font-bold mb-2 block hover:underline"
            >
              {category.name}
            </Link>
            <p className="text-white/90 text-sm">
              {category.subcategories.length} catégories
            </p>
          </div>
        </div>

        {/* Subcategories Grid */}
        <div className="col-span-3 p-8">
          <div className="grid grid-cols-3 gap-6">
            {category.subcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                  className="mega-menu-item group"
                >
                  <div className="flex items-center justify-between">
                    <span className="mega-menu-subcategory">{subcategory}</span>
                    <ArrowRight className="w-4 h-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <Link
              to={`/category/${category.name.toLowerCase()}`}
              className="inline-flex items-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
            >
              <span>Voir tout dans {category.name}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MegaMenu
