import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileBottomNav from './MobileBottomNav'

interface LayoutProps {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <Navbar />
      <main className="flex-grow pt-20 pb-16 lg:pb-0 w-full overflow-x-hidden">
        {children || <Outlet />}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}

export default Layout
