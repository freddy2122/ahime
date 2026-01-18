import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'product'
  width?: string | number
  height?: string | number
  count?: number
}

const Skeleton = ({
  className = '',
  variant = 'text',
  width,
  height,
  count = 1,
}: SkeletonProps) => {
  const baseClasses = 'bg-gray-200 animate-pulse rounded'

  const variantClasses = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'w-full',
    card: 'w-full h-64',
    product: 'w-full aspect-square',
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  const skeletonElement = (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  )

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {skeletonElement}
          </motion.div>
        ))}
      </div>
    )
  }

  return skeletonElement
}

// Skeleton Product Card
export const SkeletonProductCard = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <Skeleton variant="product" className="w-full" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" height={20} count={2} />
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="40%" height={16} />
        <Skeleton variant="rectangular" height={40} />
      </div>
    </div>
  )
}

// Skeleton Product List
export const SkeletonProductList = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <SkeletonProductCard />
        </motion.div>
      ))}
    </div>
  )
}

export default Skeleton
