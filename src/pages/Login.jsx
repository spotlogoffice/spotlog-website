import { useState } from 'react'
import './Login.css'

export default function Login({ onLogin, onNavigate }) {
  const [email, setEmail] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setError('Unesite validnu email adresu')
      return
    }

    onLogin(email)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>SPOT/LOG</h1>
            <p>{isSignup ? 'Kreiraj nalog' : 'Prijavi se'}</p>
          </div>

          <div className="login-tabs">
            <button
              className={`tab ${!isSignup ? 'active' : ''}`}
              onClick={() => {
                setIsSignup(false)
                setError('')
              }}
            >
              Prijava
            </button>
            <button
              className={`tab ${isSignup ? 'active' : ''}`}
              onClick={() => {
                setIsSignup(true)
                setError('')
              }}
            >
              Registracija
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email adresa</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                placeholder="tvoj@email.com"
              />
            </div>

            {isSignup && (
              <div className="form-group">
                <label htmlFor="password">Lozinka</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  disabled
                  title="Firebase će se dodati kasnije"
                />
                <small style={{ color: 'var(--color-gray)' }}>
                  Za MVP, prijavite se samo sa email-om
                </small>
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn btn-primary">
              {isSignup ? 'REGISTRUJ SE' : 'PRIJAVI SE'}
            </button>
          </form>

          <div className="login-divider">
            <span>ili nastavi sa</span>
          </div>

          <button className="btn-google">
            <span>G</span>
            Google
          </button>

          <div className="login-footer">
            <button
              className="back-btn"
              onClick={() => onNavigate('landing')}
            >
              ← Nazad
            </button>
          </div>
        </div>

        <div className="login-info">
          <h2>Zaštitite vaše graditeljske projekte</h2>
          <ul>
            <li>📸 Automatska organizacija fotografija</li>
            <li>🗺️ GPS detekcija lokacije</li>
            <li>☁️ Cloud backup svih podataka</li>
            <li>🔒 Sigurnost i privatnost</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
