import { useState } from 'react'
import './Landing.css'

export default function Landing({ onNavigate }) {
  const [language, setLanguage] = useState('sr')

  const content = {
    sr: {
      tagline: 'DOKUMENTUJ.\nORGANIZUJ.\nDELI',
      subtitle: 'Profesionalna foto-dokumentacija građevinskih projekata',
      cta: 'POČNI SADA',
      features: [
        {
          title: 'Automatska organizacija',
          desc: 'Fotografije se automatski organizuju po danima, nedeljama, mesecima i godinama'
        },
        {
          title: 'GPS detekcija projekta',
          desc: 'Aplikacija automatski prepoznaje projekat na osnovu vaše lokacije'
        },
        {
          title: 'Jednostavno deljenje',
          desc: 'Preuzmite ili podelite fotografije pojedinačno ili po grupama'
        }
      ],
      projects: 'Vaši projekti na jednom mestu',
      stats: { users: '10,000+', projects: '50,000+' },
      download: 'Preuzmite aplikaciju',
      downloadDesc: 'Dostupno za iOS i Android uređaje'
    },
    en: {
      tagline: 'DOCUMENT.\nORGANIZE.\nSHARE',
      subtitle: 'Professional photo documentation for construction projects',
      cta: 'GET STARTED',
      features: [
        {
          title: 'Automatic Organization',
          desc: 'Photos are automatically organized by days, weeks, months and years'
        },
        {
          title: 'GPS Project Detection',
          desc: 'App automatically recognizes projects based on your location'
        },
        {
          title: 'Easy Sharing',
          desc: 'Download or share photos individually or by groups'
        }
      ],
      projects: 'All your projects in one place',
      stats: { users: '10,000+', projects: '50,000+' },
      download: 'Download the app',
      downloadDesc: 'Available for iOS and Android devices'
    }
  }

  const t = content[language]

  return (
    <div className="landing">
      {/* Header */}
      <header className="landing-header">
        <div className="header-content">
          <div className="logo">SPOT/LOG</div>
          <nav className="nav">
            <button className="nav-link" onClick={() => setLanguage(language === 'sr' ? 'en' : 'sr')}>
              {language === 'sr' ? 'EN' : 'SR'}
            </button>
            <button className="btn btn-primary" onClick={() => onNavigate('login')}>
              {language === 'sr' ? 'Prijava' : 'Login'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{t.tagline}</h1>
            <p className="hero-subtitle">{t.subtitle}</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{t.stats.users}</span>
                <span className="stat-label">{language === 'sr' ? 'korisnika' : 'users'}</span>
              </div>
              <div className="stat">
                <span className="stat-number">{t.stats.projects}</span>
                <span className="stat-label">{language === 'sr' ? 'projekata' : 'projects'}</span>
              </div>
            </div>
            <button className="btn btn-primary btn-large" onClick={() => onNavigate('login')}>
              {t.cta}
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2>{language === 'sr' ? 'Preuzimanje fotografija' : 'Photo Management'}</h2>
          <p className="section-subtitle">
            {language === 'sr' ? 'Sve što vam treba za profesionalnu dokumentaciju' : 'Everything you need for professional documentation'}
          </p>
          <div className="features-grid">
            {t.features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <h2>{t.projects}</h2>
          <p className="section-subtitle">
            {language === 'sr' ? 'Upravljajte svim projektima jednostavno i efikasno' : 'Manage all projects easily and efficiently'}
          </p>
          <div className="projects-showcase">
            <div className="project-item">
              <span className="project-dot"></span>
              <div>
                <p className="project-name">{language === 'sr' ? 'Stambeni kompleks - Novi Beograd' : 'Residential Complex - New Belgrade'}</p>
                <p className="project-location">{language === 'sr' ? 'Beograd, Srbija' : 'Belgrade, Serbia'}</p>
                <p className="project-photos">247 {language === 'sr' ? 'fotografija' : 'photos'}</p>
              </div>
            </div>
            <div className="project-item">
              <span className="project-dot"></span>
              <div>
                <p className="project-name">{language === 'sr' ? 'Poslovni objekat - BW Galerija' : 'Office Building - BW Gallery'}</p>
                <p className="project-location">{language === 'sr' ? 'Beograd, Srbija' : 'Belgrade, Serbia'}</p>
                <p className="project-photos">1,203 {language === 'sr' ? 'fotografija' : 'photos'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="download">
        <div className="container">
          <h2>{t.download}</h2>
          <p className="section-subtitle">{t.downloadDesc}</p>
          <div className="app-links">
            <a href="#" className="app-link">
              {language === 'sr' ? 'Download na App Store' : 'Download on App Store'}
            </a>
            <a href="#" className="app-link">
              {language === 'sr' ? 'Preuzmi sa Google Play' : 'Get it on Google Play'}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>SPOT/LOG</h4>
              <p>{language === 'sr' ? 'Profesionalna foto-dokumentacija za građevinske projekte' : 'Professional photo documentation for construction projects'}</p>
            </div>
            <div className="footer-section">
              <h4>{language === 'sr' ? 'Proizvod' : 'Product'}</h4>
              <ul>
                <li><a href="#">{language === 'sr' ? 'Funkcije' : 'Features'}</a></li>
                <li><a href="#">{language === 'sr' ? 'Cene' : 'Pricing'}</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>{language === 'sr' ? 'Kompanija' : 'Company'}</h4>
              <ul>
                <li><a href="#">{language === 'sr' ? 'O nama' : 'About'}</a></li>
                <li><a href="#">{language === 'sr' ? 'Kontakt' : 'Contact'}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
