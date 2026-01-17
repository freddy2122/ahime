import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X, ChevronDown, User, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import MegaMenu from './MegaMenu'

// Données des catégories avec sous-catégories et images
const categories = [
  {
    name: 'Électronique',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    subcategories: [
      'Smartphones',
      'Ordinateurs',
      'Tablettes',
      'Accessoires',
      'Audio & Hi-Fi',
      'Télévisions',
    ],
  },
  {
    name: 'Mode & Vêtements',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    subcategories: [
      'Homme',
      'Femme',
      'Enfant',
      'Chaussures',
      'Accessoires',
      'Bijoux',
    ],
  },
  {
    name: 'Maison & Décoration',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    subcategories: [
      'Mobilier',
      'Décoration',
      'Luminaires',
      'Textile',
      'Cuisine',
      'Jardin',
    ],
  },
  {
    name: 'Beauté & Santé',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    subcategories: [
      'Soins visage',
      'Soins corps',
      'Parfums',
      'Maquillage',
      'Cheveux',
      'Bien-être',
    ],
  },
  {
    name: 'Alimentation',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
    subcategories: [
      'Épicerie',
      'Fruits & Légumes',
      'Boissons',
      'Produits locaux',
      'Bio',
      'Surgelés',
    ],
  },
  {
    name: 'Sport & Loisirs',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    subcategories: [
      'Fitness',
      'Running',
      'Sports collectifs',
      'Randonnée',
      'Natation',
      'Yoga',
    ],
  },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const megaMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null)
      }
    }

    if (activeMegaMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeMegaMenu])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigation vers la page de recherche
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              {/* Texte du logo en script, minuscule et gras */}
              <div className="relative">
                <span className="font-script text-3xl text-primary-600 font-bold lowercase tracking-wide group-hover:text-primary-700 transition-colors duration-300">
                  ahimè
                </span>
              </div>
              
              {/* Points décoratifs */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full border-2 border-white shadow-md animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-500 rounded-full border border-white"></div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-primary-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary-500 transition-colors" />
            </div>
          </form>

          {/* Actions - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/favorites"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Heart className="w-6 h-6" />
            </Link>
            <Link
              to="/account"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <User className="w-6 h-6" />
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary-600 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Categories Menu - Desktop */}
        <div className="hidden lg:block border-t border-gray-100">
          <div className="flex items-center space-x-1" ref={megaMenuRef}>
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => setActiveMegaMenu(category.name)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center space-x-1 px-4 py-4 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 group">
                  <span>{category.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeMegaMenu === category.name ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeMegaMenu === category.name && (
                    <MegaMenu category={category} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40 top-20"
            />
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="lg:hidden fixed top-20 left-0 right-0 bg-white border-t border-gray-100 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto"
            >
              <div className="container mx-auto px-4 py-4">
              {/* Close Button */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </form>

              {/* Mobile Categories */}
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() =>
                        setActiveMegaMenu(
                          activeMegaMenu === category.name ? null : category.name
                        )
                      }
                      className="w-full flex items-center justify-between py-3 text-gray-700 font-medium"
                    >
                      <span>{category.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeMegaMenu === category.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeMegaMenu === category.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 pb-2 space-y-2"
                        >
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub}
                              to={`/category/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-sm text-gray-600 hover:text-primary-600 py-1"
                            >
                              {sub}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
