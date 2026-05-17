import { useState, useEffect } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [user, setUser] = useState(null)

  // Učitaj korisnika iz localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('spotlog_user')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setCurrentPage('dashboard')
      } catch (e) {
        localStorage.removeItem('spotlog_user')
      }
    }
  }, [])

  const handleLogin = (email) => {
    const userData = {
      id: Date.now().toString(),
      email: email,
      loginDate: new Date().toISOString(),
      projects: []
    }
    localStorage.setItem('spotlog_user', JSON.stringify(userData))
    setUser(userData)
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('spotlog_user')
    setUser(null)
    setCurrentPage('landing')
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="app">
      {currentPage === 'landing' && (
        <Landing onNavigate={handleNavigate} />
      )}
      {currentPage === 'login' && (
        <Login onLogin={handleLogin} onNavigate={handleNavigate} />
      )}
      {currentPage === 'dashboard' && user && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  )
}
