import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover"
import { 
  User2, 
  LogOut, 
  Settings, 
  Briefcase, 
  Building2, 
  Menu,
  X,
  Search,
  Bell,
  ChevronDown
} from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Browse', path: '/browse' },
  ]

  const isActiveLink = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-gradient-to-r from-slate-900/98 via-gray-900/98 to-slate-800/98 shadow-2xl border-b border-cyan-400/20' 
        : 'bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-slate-800/95'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo with Enhanced Design */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Briefcase className="w-5 h-5 text-white transform group-hover:scale-105 transition-transform duration-300" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Job<span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Portal</span>
              </h1>
              <p className="text-xs text-gray-300 -mt-1 group-hover:text-cyan-400 transition-colors duration-300">Find your dream job</p>
            </div>
          </Link>

          {/* Desktop Navigation with Enhanced Styling */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-500 group overflow-hidden ${
                  isActiveLink(link.path)
                    ? 'text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/25'
                    : 'text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {!isActiveLink(link.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/15 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-xl"></div>
                )}
                {isActiveLink(link.path) && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-cyan-300/60 via-blue-300 to-purple-300/60 rounded-full shadow-sm"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions with Enhanced Design */}
          <div className="flex items-center space-x-3">
            
            {/* Search Button with Animation */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60 transition-all duration-300 rounded-xl group border border-slate-600/50 hover:border-cyan-400/50"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform duration-300 group-hover:text-cyan-400" />
              <span className="group-hover:text-cyan-400 transition-colors duration-300">Search Jobs</span>
            </Button>

            {isAuthenticated ? (
              <>
                {/* Notifications with Pulse Animation */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60 transition-all duration-300 rounded-xl p-3 border border-slate-600/50 hover:border-cyan-400/50"
                >
                  <Bell className="w-5 h-5 hover:text-cyan-400 transition-colors duration-300" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full animate-pulse shadow-lg">
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping opacity-75"></span>
                  </span>
                </Button>

                {/* Enhanced User Menu */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60 transition-all duration-300 rounded-xl p-2 group border border-slate-600/50 hover:border-cyan-400/50"
                    >
                      <Avatar className="h-8 w-8 ring-2 ring-slate-600/50 group-hover:ring-cyan-400/50 transition-all duration-300">
                        <AvatarImage src={user?.profile?.profilePicture} className="object-cover" />
                        <AvatarFallback className="bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white text-sm font-medium shadow-lg">
                          {user?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-0 mr-4 shadow-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/98 via-slate-900/98 to-slate-800/98 rounded-2xl overflow-hidden">
                    {/* User Info Header */}
                    <div className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-b border-slate-700/50">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 ring-2 ring-cyan-400/20">
                          <AvatarImage src={user?.profile?.profilePicture} className="object-cover" />
                          <AvatarFallback className="bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white font-medium">
                            {user?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-white">{user?.fullName}</p>
                          <p className="text-sm text-gray-300">{user?.email}</p>
                          <span className="inline-block mt-1 px-2 py-1 text-xs font-medium text-cyan-400 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full shadow-sm">
                            {user?.role === 'recruiter' ? 'Recruiter' : 'Student'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="p-3">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:text-white rounded-xl transition-all duration-300 group border-b border-slate-700/30"
                      >
                        <User2 className="w-4 h-4 group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-300" />
                        <span>View Profile</span>
                      </Link>
                      
                      {user?.role === 'recruiter' && (
                        <Link
                          to="/admin/companies"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:text-white rounded-xl transition-all duration-300 group border-b border-slate-700/30"
                        >
                          <Building2 className="w-4 h-4 group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-300" />
                          <span>My Companies</span>
                        </Link>
                      )}
                      
                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:text-white rounded-xl transition-all duration-300 group border-b border-slate-700/30"
                      >
                        <Settings className="w-4 h-4 group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-300" />
                        <span>Settings</span>
                      </Link>
                      
                      <hr className="my-3 border-slate-700/50" />
                      
                      <button 
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-red-400 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-rose-500/10 hover:text-red-300 rounded-xl transition-all duration-300 w-full text-left group"
                      >
                        <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              /* Enhanced Auth Buttons */
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60 transition-all duration-300 rounded-xl font-medium border border-slate-600/50 hover:border-cyan-400/50"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500 hover:scale-105 rounded-xl font-medium px-6 relative overflow-hidden group border border-cyan-500/30">
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-cyan-200/10 to-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </Button>
                </Link>
              </div>
            )}

            {/* Enhanced Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60 transition-all duration-300 rounded-xl border border-slate-600/50 hover:border-cyan-400/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-slate-900/98 via-gray-900/98 to-slate-800/98 border-b border-slate-700/50 shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActiveLink(link.path)
                      ? 'text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {!isAuthenticated && (
                <div className="pt-4 mt-4 border-t border-slate-700/50 space-y-2">
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60 rounded-xl transition-all duration-300 border border-slate-600/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white rounded-xl transition-all duration-300 text-center font-medium shadow-lg shadow-cyan-500/25"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
 