import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'

export default function Navbar() {
  const navigate = useNavigate()
  const [showClassesDropdown, setShowClassesDropdown] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const initials = user.fullName
    ? user.fullName.trim().split(/\s+/).map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'UD'

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="relative flex items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/home" className="flex-shrink-0" aria-label="E-PolitiX Home">
              <Logo size="2xl" />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1 absolute left-[75%] -translate-x-1/2">
            <Link
              to="/home"
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Dashboard
            </Link>

            <div className="relative group">
              <button
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-haspopup="true"
                aria-expanded={showClassesDropdown}
              >
                Classes
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>

              <div
                className="absolute left-0 mt-1 w-40 rounded-lg bg-white shadow-lg border border-slate-200 py-1 animate-fade-in opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150"
                onMouseEnter={() => setShowClassesDropdown(true)}
                onMouseLeave={() => setShowClassesDropdown(false)}
              >
                <Link
                  to="/classes/notes"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  onClick={() => setShowClassesDropdown(false)}
                >
                  Notes
                </Link>
                <Link
                  to="/classes/papers"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  onClick={() => setShowClassesDropdown(false)}
                >
                  Papers
                </Link>
                <Link
                  to="/classes/recordings"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  onClick={() => setShowClassesDropdown(false)}
                >
                  Recordings
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto flex-shrink-0">
            <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors" aria-label="Notifications">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.035-.586 1.421L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
              <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-semibold text-sm cursor-pointer hover:bg-sky-200 transition-colors">
                {user.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.fullName} className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  initials
                )}
              </div>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-slate-200 py-1 animate-fade-in">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900">{user.fullName || 'User'}</p>
                    <p className="text-xs text-slate-500">{user.mobile || ''}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}