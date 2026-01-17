import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    shop: [
      { name: 'Tous les produits', href: '/products' },
      { name: 'Nouveautés', href: '/products?new=true' },
      { name: 'Promotions', href: '/products?sale=true' },
      { name: 'Meilleures ventes', href: '/products?bestsellers=true' },
    ],
    categories: [
      { name: 'Électronique', href: '/category/electronique' },
      { name: 'Mode & Vêtements', href: '/category/mode-vetements' },
      { name: 'Maison & Décoration', href: '/category/maison-decoration' },
      { name: 'Beauté & Santé', href: '/category/beaute-sante' },
    ],
    support: [
      { name: 'Centre d\'aide', href: '/help' },
      { name: 'Livraison', href: '/delivery' },
      { name: 'Retours', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
    company: [
      { name: 'À propos', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Carrières', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Affiliation', href: '/affiliate' },
    ],
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white mt-auto pb-20 lg:pb-0">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-display text-3xl font-bold mb-3">
              Restez informé de nos offres
            </h3>
            <p className="text-gray-300 mb-6">
              Recevez nos dernières promotions et nouveautés directement dans votre boîte mail
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button
                type="submit"
                className="btn-primary bg-primary-500 hover:bg-primary-600 whitespace-nowrap"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {/* Texte du logo en script, minuscule et gras */}
                  <div className="relative">
                    <span className="font-script text-3xl text-white font-bold lowercase tracking-wide hover:text-accent-400 transition-colors duration-300">
                      ahimè
                    </span>
                  </div>
                  
                  {/* Points décoratifs */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full border-2 border-gray-800 shadow-md"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-400 rounded-full border border-gray-800"></div>
                </div>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Votre marché en ligne au Bénin. Découvrez une large gamme de produits 
              avec livraison rapide et sécurisée dans tout le pays.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <MapPin className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <span>Bénin, Afrique de l'Ouest</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <Phone className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <span>+229 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <Mail className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <span>contact@lorele-commerce.bj</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Boutique</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-accent-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Catégories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-accent-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-accent-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-accent-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Lorele Commerce. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Conditions
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
