import React, { useState } from 'react';
import './Landing.css';

export default function Landing() {
  const [language, setLanguage] = useState('sr');
  const [scrolled, setScrolled] = useState(false);

  const content = {
    sr: {
      nav: ['Početna', 'Funkcije', 'Cene', 'Kontakt'],
      features_title: 'Preuzimanje fotografija',
      features_subtitle: 'Sve što vam treba za profesionalnu dokumentaciju',
      features: [
        { title: 'Automatska organizacija', desc: 'Po danima, nedeljama, mesecima i godinama' },
        { title: 'GPS detekcija projekta', desc: 'Automatski prepoznaje projekat na osnovu lokacije' },
        { title: 'Jednostavno deljenje', desc: 'Preuzmite ili podelite fotografije' },
        { title: 'Automatsko imenovanje', desc: 'DDMMYYYY_XXX format' },
        { title: 'Sekvencijalno numerisanje', desc: 'Automatsko brojanje' },
        { title: 'Grupno preuzimanje', desc: 'Jednim klikom' },
        { title: 'Cloud sinhronizacija', desc: 'Uvek dostupno' }
      ],
      login_btn: 'Prijava'
    },
    en: {
      nav: ['Home', 'Features', 'Pricing', 'Contact'],
      features_title: 'Photo Download',
      features_subtitle: 'Everything you need for professional documentation',
      features: [
        { title: 'Automatic organization', desc: 'By days, weeks, months and years' },
        { title: 'GPS project detection', desc: 'Auto-recognizes projects by location' },
        { title: 'Easy sharing', desc: 'Download or share photos' },
        { title: 'Automatic naming', desc: 'DDMMYYYY_XXX format' },
        { title: 'Sequential numbering', desc: 'Auto counting' },
        { title: 'Batch download', desc: 'One click' },
        { title: 'Cloud sync', desc: 'Always available' }
      ],
      login_btn: 'Login'
    }
  };

  const t = content[language];

  const handleScroll = (e) => {
    setScrolled(window.scrollY > 0);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing">
      {/* STICKY HEADER */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-logo">
          <span className="logo-spot">SPOT</span>
          <span className="logo-slash">/</span>
          <span className="logo-log">LOG</span>
        </div>

        <nav className="header-nav">
          {t.nav.map((item) => (
            <a key={item} href="#" className="nav-link">{item}</a>
          ))}
        </nav>

        <div className="header-right">
          <button className="theme-toggle">🌙</button>
          <div className="lang-toggle">
            <button 
              className={`lang-btn ${language === 'sr' ? 'active' : ''}`}
              onClick={() => setLanguage('sr')}
            >SR</button>
            <span>|</span>
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >EN</button>
          </div>
          <button className="login-btn">{t.login_btn}</button>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="features-header">
          <h2 className="features-title">{t.features_title}</h2>
          <p className="features-subtitle">{t.features_subtitle}</p>
        </div>

        <div className="features-grid">
          {t.features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">
                {['📋', '📍', '🔗', '📝', '🔢', '⬇️', '☁️'][idx]}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}