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
import Affiliate from './pages/Affiliate'
import CategoryProducts from './pages/CategoryProducts'
import Login from './pages/Login'
import Register from './pages/Register'
import AffiliateRegister from './pages/AffiliateRegister'
import ForgotPassword from './pages/ForgotPassword'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import ChangePassword from './pages/ChangePassword'
import AffiliateDashboard from './pages/AffiliateDashboard'
import AffiliateLinks from './pages/AffiliateLinks'
import AffiliateStats from './pages/AffiliateStats'
import AffiliateCommissions from './pages/AffiliateCommissions'
import AffiliateReports from './pages/AffiliateReports'
import AffiliateShare from './pages/AffiliateShare'
import AffiliateSettings from './pages/AffiliateSettings'
import SEO from './components/SEO/SEO'
import AffiliateLayout from './components/Layout/AffiliateLayout'
import AdminLayout from './components/Layout/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AdminOrders from './pages/AdminOrders'
import AdminUsers from './pages/AdminUsers'
import AdminAffiliates from './pages/AdminAffiliates'
import AdminPromotions from './pages/AdminPromotions'
import AdminStats from './pages/AdminStats'
import AdminReports from './pages/AdminReports'
import AdminSettings from './pages/AdminSettings'
import AdminAddProduct from './pages/AdminAddProduct'
import AdminAddCategory from './pages/AdminAddCategory'

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes Affilié/Parrain avec AffiliateLayout (sans Layout principal) */}
        <Route element={<AffiliateLayout />}>
          <Route path="/affiliate/dashboard" element={<AffiliateDashboard />} />
          <Route path="/affiliate/links" element={<AffiliateLinks />} />
          <Route path="/affiliate/stats" element={<AffiliateStats />} />
          <Route path="/affiliate/commissions" element={<AffiliateCommissions />} />
          <Route path="/affiliate/reports" element={<AffiliateReports />} />
          <Route path="/affiliate/share" element={<AffiliateShare />} />
          <Route path="/affiliate/settings" element={<AffiliateSettings />} />
          <Route path="/parrain/dashboard" element={<AffiliateDashboard />} />
          <Route path="/parrain/links" element={<AffiliateLinks />} />
          <Route path="/parrain/stats" element={<AffiliateStats />} />
          <Route path="/parrain/commissions" element={<AffiliateCommissions />} />
          <Route path="/parrain/reports" element={<AffiliateReports />} />
          <Route path="/parrain/share" element={<AffiliateShare />} />
          <Route path="/parrain/settings" element={<AffiliateSettings />} />
        </Route>
        
        {/* Routes Admin avec AdminLayout (sans Layout principal) */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/new" element={<AdminAddProduct />} />
          <Route path="/admin/categories/new" element={<AdminAddCategory />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/affiliates" element={<AdminAffiliates />} />
          <Route path="/admin/promotions" element={<AdminPromotions />} />
          <Route path="/admin/stats" element={<AdminStats />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>

        {/* Routes normales avec Layout principal (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <>
                <SEO
                  title="Ahimè - Votre marché en ligne au Bénin"
                  description="Achetez tous vos produits en ligne au Bénin. Électronique, mode, maison, beauté et plus encore. Livraison rapide et sécurisée partout au Bénin."
                  keywords="e-commerce bénin, shopping en ligne bénin, produits bénin, livraison bénin, ahimè, boutique en ligne"
                  url="https://ahimey.vercel.app/"
                />
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
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/affiliation" element={<Affiliate />} />
          <Route path="/category/:slug" element={<CategoryProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/affiliate-register" element={<AffiliateRegister />} />
          <Route path="/affiliate/register" element={<AffiliateRegister />} />
          <Route path="/inscription-parrain" element={<AffiliateRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/paiement" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/compte" element={<Account />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/changer-mot-de-passe" element={<ChangePassword />} />
        </Route>
      </Routes>
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
