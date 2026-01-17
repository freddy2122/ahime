import { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '../data/products'

interface FavoritesContextType {
  favorites: Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: string) => void
  isFavorite: (productId: string) => boolean
  toggleFavorite: (product: Product) => void
  clearFavorites: () => void
  getTotalFavorites: () => number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([])

  const addToFavorites = (product: Product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((item) => item.id === product.id)) {
        return prevFavorites
      }
      return [...prevFavorites, product]
    })
  }

  const removeFromFavorites = (productId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== productId))
  }

  const isFavorite = (productId: string) => {
    return favorites.some((item) => item.id === productId)
  }

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  const getTotalFavorites = () => {
    return favorites.length
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        clearFavorites,
        getTotalFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
