import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

interface Slide {
  id: number
  title: string
  subtitle?: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  bgGradient: string
}

// Slides pour desktop
const desktopSlides: Slide[] = [
  {
    id: 1,
    title: 'Ahimè - Votre marché africain',
    subtitle: '🇧🇯 Made in Bénin',
    description: 'Découvrez l\'authenticité africaine avec nos produits locaux et artisanaux. De Cotonou à Parakou, nous vous livrons partout au Bénin.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
    buttonText: 'Explorer',
    buttonLink: '/products',
    bgGradient: 'from-primary-600/95 to-accent-500/95',
  },
  {
    id: 2,
    title: 'Produits locaux authentiques',
    subtitle: '🌾 Agriculture & Artisanat',
    description: 'Soutenez l\'économie locale avec nos produits 100% béninois. Riz, igname, pagnes, bijoux artisanaux et bien plus encore.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop',
    buttonText: 'Découvrir les produits locaux',
    buttonLink: '/products?local=true',
    bgGradient: 'from-accent-500/95 to-primary-600/95',
  },
  {
    id: 3,
    title: 'Électronique & Technologies',
    subtitle: '📱 Innovation au Bénin',
    description: 'Smartphones, ordinateurs, accessoires électroniques. Restez connecté avec les dernières technologies disponibles au Bénin.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1920&h=1080&fit=crop',
    buttonText: 'Voir l\'électronique',
    buttonLink: '/category/electronique',
    bgGradient: 'from-primary-700/95 to-accent-600/95',
  },
]

// Slides pour mobile avec nouvelles images
const mobileSlides: Slide[] = [
  {
    id: 1,
    title: 'Ordinateurs & Laptops',
    
    description: 'Découvrez notre sélection d\'ordinateurs portables et de bureau pour tous vos besoins.',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=1200&fit=crop',
    buttonText: 'Voir les ordinateurs',
    buttonLink: '/category/electronique',
    bgGradient: 'from-primary-600/90 to-accent-500/90',
  },
  {
    id: 2,
    title: 'Smartphones & Tablettes',
    
    description: 'Les derniers smartphones et tablettes des meilleures marques disponibles au Bénin.',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=1200&fit=crop',
    buttonText: 'Voir les smartphones',
    buttonLink: '/category/electronique',
    bgGradient: 'from-accent-500/90 to-primary-600/90',
  },
  {
    id: 3,
    title: 'Électroménager',
   
    description: 'Frigos, climatiseurs, machines à laver et tous les appareils pour votre foyer.',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=1200&fit=crop',
    buttonText: 'Voir l\'électroménager',
    buttonLink: '/category/electromenager',
    bgGradient: 'from-primary-700/90 to-accent-600/90',
  },
  {
    id: 4,
    title: 'Mode & Accessoires',
    
    description: 'Découvrez notre collection de vêtements et accessoires pour tous les goûts.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1200&fit=crop',
    buttonText: 'Voir la mode',
    buttonLink: '/category/mode',
    bgGradient: 'from-accent-600/90 to-primary-700/90',
  },
  {
    id: 5,
    title: 'Tous vos produits',
    description: 'Explorez notre catalogue complet de produits disponibles partout au Bénin.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1200&fit=crop',
    buttonText: 'Explorer',
    buttonLink: '/products',
    bgGradient: 'from-primary-600/90 to-accent-500/90',
  },
]

const Hero = () => {
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0)
  const [currentDesktopSlide, setCurrentDesktopSlide] = useState(0)
  const [mobileDirection, setMobileDirection] = useState(0)
  const [desktopDirection, setDesktopDirection] = useState(0)

  // Timer pour mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setMobileDirection(1)
      setCurrentMobileSlide((prev) => (prev + 1) % mobileSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  // Timer pour desktop
  useEffect(() => {
    const timer = setInterval(() => {
      setDesktopDirection(1)
      setCurrentDesktopSlide((prev) => (prev + 1) % desktopSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToMobileSlide = (index: number) => {
    setMobileDirection(index > currentMobileSlide ? 1 : -1)
    setCurrentMobileSlide(index)
  }

  const nextMobileSlide = () => {
    setMobileDirection(1)
    setCurrentMobileSlide((prev) => (prev + 1) % mobileSlides.length)
  }

  const prevMobileSlide = () => {
    setMobileDirection(-1)
    setCurrentMobileSlide((prev) => (prev - 1 + mobileSlides.length) % mobileSlides.length)
  }

  const goToDesktopSlide = (index: number) => {
    setDesktopDirection(index > currentDesktopSlide ? 1 : -1)
    setCurrentDesktopSlide(index)
  }

  const nextDesktopSlide = () => {
    setDesktopDirection(1)
    setCurrentDesktopSlide((prev) => (prev + 1) % desktopSlides.length)
  }

  const prevDesktopSlide = () => {
    setDesktopDirection(-1)
    setCurrentDesktopSlide((prev) => (prev - 1 + desktopSlides.length) % desktopSlides.length)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const slideTransition = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  }

  return (
    <>
      {/* Version Mobile */}
      <section className="relative h-[500px] md:hidden overflow-hidden">
        <AnimatePresence initial={false} custom={mobileDirection} mode="wait">
          <motion.div
            key={currentMobileSlide}
            custom={mobileDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="absolute inset-0"
          >
            {/* Image de fond */}
            <div className="absolute inset-0">
              <img
                src={mobileSlides[currentMobileSlide].image}
                alt={mobileSlides[currentMobileSlide].title}
                className="w-full h-full object-cover brightness-75"
              />
              {/* Triple overlay pour meilleur contraste */}
              <div className="absolute inset-0 bg-black/60" />
              <div className={`absolute inset-0 bg-gradient-to-r ${mobileSlides[currentMobileSlide].bgGradient}`} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
            </div>

            {/* Contenu */}
            <div className="relative z-10 h-full flex items-center py-10">
              <div className="container mx-auto px-4">
                <div className="max-w-xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="space-y-6"
                  >
                    

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="font-heading text-2xl font-black text-white leading-tight drop-shadow-2xl mb-4 px-4"
                    >
                      {mobileSlides[currentMobileSlide].title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-white text-sm leading-relaxed font-medium drop-shadow-lg mb-6 px-4"
                    >
                      {mobileSlides[currentMobileSlide].description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="pt-3 px-4"
                    >
                      <Link
                        to={mobileSlides[currentMobileSlide].buttonLink}
                        className="inline-flex items-center justify-center space-x-2 bg-accent-500 text-white px-6 py-3 rounded-lg font-cta font-bold text-sm hover:bg-accent-600 transition-all duration-300 shadow-xl hover:shadow-accent-500/50 transform hover:-translate-y-1 border-2 border-accent-400"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{mobileSlides[currentMobileSlide].buttonText}</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Boutons de navigation avec icônes pour mobile */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
          <button
            onClick={prevMobileSlide}
            className="bg-white/90 hover:bg-white text-primary-600 p-3 rounded-full transition-all duration-300 shadow-lg active:scale-95 flex items-center justify-center"
            aria-label="Slide précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-1.5">
            {mobileSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToMobileSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentMobileSlide
                    ? 'bg-accent-500 w-8 h-2 border border-white'
                    : 'bg-white/60 w-2 h-2 hover:bg-white/80'
                }`}
                aria-label={`Aller à la slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextMobileSlide}
            className="bg-white/90 hover:bg-white text-primary-600 p-3 rounded-full transition-all duration-300 shadow-lg active:scale-95 flex items-center justify-center"
            aria-label="Slide suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Overlay en bas pour le dégradé */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
      </section>

      {/* Version Desktop */}
      <section className="relative hidden md:block h-[700px] lg:h-[800px] overflow-hidden">
        <AnimatePresence initial={false} custom={desktopDirection} mode="wait">
          <motion.div
            key={currentDesktopSlide}
            custom={desktopDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="absolute inset-0"
          >
            {/* Image de fond */}
            <div className="absolute inset-0">
              <img
                src={desktopSlides[currentDesktopSlide].image}
                alt={desktopSlides[currentDesktopSlide].title}
                className="w-full h-full object-cover brightness-75"
              />
              {/* Triple overlay pour meilleur contraste */}
              <div className="absolute inset-0 bg-black/60" />
              <div className={`absolute inset-0 bg-gradient-to-r ${desktopSlides[currentDesktopSlide].bgGradient}`} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
            </div>

            {/* Contenu */}
            <div className="relative z-10 h-full flex items-center py-12 md:py-16">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="space-y-7 md:space-y-8"
                  >
                    <div className="inline-block mb-4">
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-block bg-white/25 backdrop-blur-md text-white px-6 py-3 rounded-full text-base font-bold border border-white/40 shadow-lg"
                      >
                        {desktopSlides[currentDesktopSlide].subtitle}
                      </motion.span>
                    </div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight drop-shadow-2xl mb-5 md:mb-6"
                    >
                      {desktopSlides[currentDesktopSlide].title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-white text-lg md:text-xl lg:text-2xl max-w-2xl leading-loose font-medium drop-shadow-lg mb-8 md:mb-10"
                    >
                      {desktopSlides[currentDesktopSlide].description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="flex flex-row gap-5 pt-4"
                    >
                      <Link
                        to={desktopSlides[currentDesktopSlide].buttonLink}
                        className="inline-flex items-center justify-center space-x-3 bg-accent-500 text-white px-10 py-5 rounded-xl font-cta font-bold text-lg md:text-xl hover:bg-accent-600 transition-all duration-300 shadow-2xl hover:shadow-accent-500/50 transform hover:-translate-y-1 border-2 border-accent-400"
                      >
                        <ShoppingBag className="w-6 h-6" />
                        <span>{desktopSlides[currentDesktopSlide].buttonText}</span>
                      </Link>
                      <Link
                        to="/products"
                        className="inline-flex items-center justify-center space-x-2 bg-white/25 backdrop-blur-md text-white border-2 border-white/60 px-10 py-5 rounded-xl font-cta font-bold text-lg md:text-xl hover:bg-white/35 hover:border-white transition-all duration-300 shadow-lg"
                      >
                        <span>Tout voir</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Contrôles de navigation desktop */}
        <button
          onClick={prevDesktopSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextDesktopSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Slide suivant"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicateurs de diapositives desktop */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
          {desktopSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToDesktopSlide(index)}
              className={`transition-all duration-300 rounded-full shadow-lg ${
                index === currentDesktopSlide
                  ? 'bg-accent-500 w-10 h-3 border-2 border-white'
                  : 'bg-white/60 w-3 h-3 hover:bg-white/80 border border-white/50'
              }`}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Overlay en bas pour le dégradé */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
      </section>
    </>
  )
}

export default Hero
