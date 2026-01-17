import { Link, useLocation } from 'react-router-dom'
import { Home, Heart, ShoppingCart, User } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useFavorites } from '../../context/FavoritesContext'

const MobileBottomNav = () => {
  const location = useLocation()
  const { getTotalItems } = useCart()
  const { getTotalFavorites } = useFavorites()
  const cartItemsCount = getTotalItems()
  const favoritesCount = getTotalFavorites()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const navItems = [
    { icon: Home, label: 'Accueil', path: '/' },
    { icon: Heart, label: 'Favoris', path: '/favorites' },
    { icon: ShoppingCart, label: 'Panier', path: '/cart' },
    { icon: User, label: 'Compte', path: '/account' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ${
                active
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              <div className="relative inline-block">
                <Icon className={`w-6 h-6 ${active ? 'scale-110' : ''} transition-transform`} />
                {item.path === '/favorites' && favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold z-10">
                    {favoritesCount}
                  </span>
                )}
                {item.path === '/cart' && cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold z-10">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 ${active ? 'font-semibold' : 'font-normal'}`}>
                {item.label}
              </span>
              {active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary-600 rounded-b-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileBottomNav
