import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrumbs = ({ items, className = '' }: BreadcrumbsProps) => {
  const allItems = [
    { label: 'Accueil', path: '/' },
    ...items,
  ]

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          
          return (
            <li key={index} className="flex items-center">
              {index === 0 ? (
                <Link
                  to={item.path || '/'}
                  className="flex items-center text-gray-500 hover:text-primary-600 transition-colors"
                  aria-label="Accueil"
                >
                  <Home className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                  {isLast ? (
                    <span className="text-gray-900 font-semibold" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      to={item.path || '#'}
                      className="text-gray-500 hover:text-primary-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
