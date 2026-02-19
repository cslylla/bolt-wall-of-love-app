import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Button from './Button'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        setUser(session?.user ?? null)
      })()
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setShowDropdown(false)
    navigate('/')
  }

  const getInitials = (email) => {
    if (!email) return 'U'
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bolt-bg/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Bolt Logo" className="h-8" />
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {location.pathname === '/' && (
                <Link to="/wall">
                  <Button variant="primary">Go to Wall</Button>
                </Link>
              )}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 rounded-full bg-bolt-blue text-white font-medium flex items-center justify-center hover:bg-opacity-90 transition-all"
                >
                  {getInitials(user.email)}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1f] border border-white/10 rounded-lg shadow-xl overflow-hidden">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-white hover:bg-white/5 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/auth?mode=signin">
                <Button variant="secondary">Sign in</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button variant="primary">Get started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
