import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

/**
 * Home page - Main dashboard for logged-in students.
 * Displays time-based greeting and welcome section with WhatsApp join button.
 * Connected to route "/home" in App.jsx - accessed after successful login.
 */
export default function Home() {
  // Greeting state - updates based on current time
  // Why: Provides personalized, time-aware UX for students
  const [greeting, setGreeting] = useState('')

  // Student name from localStorage (set during login)
  // Why: Persists user session across page reloads without backend
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const firstName = user.fullName ? user.fullName.trim().split(/\s+/)[0] : 'Student'

  // Compute greeting based on current hour
  // Why: Runs on mount and updates if component stays mounted past time boundaries
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 12) setGreeting('Good Morning')
      else if (hour >= 12 && hour < 17) setGreeting('Good Afternoon')
      else if (hour >= 17 && hour < 21) setGreeting('Good Evening')
      else setGreeting('Good Night')
    }
    updateGreeting()
    // Check every minute to catch time boundary changes
    // Why: Keeps greeting accurate without page refresh
    const interval = setInterval(updateGreeting, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation bar with logo, tabs, notifications, profile/logout */}
      {/* Why: Provides consistent app navigation and user session controls */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting Box - Time-aware personalized welcome */}
        {/* Why: Creates welcoming, human-first impression for students */}
        <div className="mb-6 rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {greeting}, {firstName}!
              </p>
              <p className="text-slate-500 text-sm">Ready to continue learning?</p>
            </div>
          </div>
        </div>

        {/* Welcome Box - Platform branding and WhatsApp CTA */}
        {/* Why: Reinforces brand identity and drives community engagement */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                WELCOME TO E-PolitiX LEARNING MANAGEMENT SYSTEM
              </h2>
              <p className="text-slate-300">
                Access your classes, notes, papers and recordings all in one place
              </p>
            </div>
            {/* WhatsApp join button - placeholder link for community group */}
            {/* Why: Low-friction way to connect students to peer support network */}
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.48-1.653-1.653-.173-.172-.227-.373-.074-.643.199-.174.864-.747 1.062-.94.198-.198.149-.397.15-.671-.099-.272-.818-1.733-.966-2.03-.148-.296-.054-.444.053-.655.189-.422.85-1.688 1.037-1.92.188-.233.37-.27.56-.27.289 0 .578.06.964.243 1.106.514 2.583 2.62 3.003 2.932.188.138.334.254.44.383.187.23.292.373.33.76.04.438-.05.76-.24 1.138-.208.41-.533.93-.903 1.642-.075.12-.12.243-.12.362 0 .147.12.294.218.422.276.36.635.636.904.936.215.24.29.31.36.31.37 0 .798-.203 1.005-.31.267-.15.56-.315.94-.68.34-.34.68-.615.93-.93.215-.215.29-.42.29-.744 0-.426-.137-.746-.43-.963-.097-.073-.188-.148-.276-.227a.525.525 0 00-.21-.11c-.08-.034-.267-.043-.4-.038-.15.006-.3.025-.434.067-.205.06-.39.163-.527.277-.14.11-.287.27-.35.63-.03.193-.02.38.02.55.03.14.14.25.315.338.113.06.443.183.956.366 1.389.494 1.993.758 2.17.81.206.06.442.07.555.055.243-.025.56-.25.78-.68.163-.308.213-.647.21-.844-.01-.056-.01-.11-.01-.163 0-.24-.01-.51-.03-.745" />
              </svg>
              Join via WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}