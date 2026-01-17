import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout/Layout'
import Hero from './components/Hero/Hero'
import CategoriesSection from './components/sections/CategoriesSection'
import FeaturesSection from './components/sections/FeaturesSection'
import FeaturedProducts from './components/sections/FeaturedProducts'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'
import HelpCenter from './pages/HelpCenter'
import Delivery from './pages/Delivery'
import Returns from './pages/Returns'
import FAQ from './pages/FAQ'
import About from './pages/About'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import Blog from './pages/Blog'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Cookies from './pages/Cookies'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="-mt-20 md:-mx-0 overflow-x-hidden">
                  <Hero />
                </div>
                <CategoriesSection />
                <FeaturedProducts />
                <FeaturesSection />
              </>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/boutique" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/favoris" element={<Favorites />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/livraison" element={<Delivery />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/retours" element={<Returns />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/carrieres" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/confidentialite" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/conditions" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
      </Layout>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e2d5f',
            color: '#fff',
          },
        }}
      />
    </Router>
  )
}

export default App
