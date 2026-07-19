import { useState, useMemo } from 'react';
import './Dashboard.css';

// Pomocna funkcija: ISO broj nedelje (1-52/53)
function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

// Pomocna funkcija: YYYYMMDD_XXX imenovanje
function formatFilename(date, index) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const n = String(index).padStart(3, '0');
  return `${y}${m}${d}_${n}`;
}

// Pomocna funkcija: format datuma
function formatDate(date) {
  const meseci = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'];
  return `${date.getDate()}. ${meseci[date.getMonth()]} ${date.getFullYear()}.`;
}

// Mock projekti (kasnije ide iz Supabase)
const MOCK_PROJECTS = [
  {
    id: 1,
    name: 'Poslovni objekat - BW Galerija',
    location: 'Beograd, Srbija',
    photoCount: 1203,
    status: 'aktivan',
    activeFrom: '15.03.2026'
  },
  {
    id: 2,
    name: 'Stambeni kompleks - Novi Beograd',
    location: 'Beograd, Srbija',
    photoCount: 247,
    status: 'aktivan',
    activeFrom: '02.06.2026'
  },
  {
    id: 3,
    name: 'Stambena zgrada - Dedinje',
    location: 'Beograd, Srbija',
    photoCount: 856,
    status: 'zavrsen',
    activeFrom: '10.01.2025'
  },
  {
    id: 4,
    name: 'CNC fabrika - Ruma',
    location: 'Ruma, Srbija',
    photoCount: 2847,
    status: 'aktivan',
    activeFrom: '20.09.2025'
  }
];

// Mock fotografije za prvi projekat (kasnije ide iz Supabase)
function generateMockPhotos() {
  const photos = [];
  const now = new Date();
  const gradijenti = [
    'linear-gradient(135deg, #E8E8E8 0%, #D0D0D0 100%)',
    'linear-gradient(135deg, #DCE4E8 0%, #B8C4CC 100%)',
    'linear-gradient(135deg, #E4DCC8 0%, #C8B896 100%)',
    'linear-gradient(135deg, #D8D8D8 0%, #B8B8B8 100%)',
    'linear-gradient(135deg, #E8DDD0 0%, #C4B098 100%)',
    'linear-gradient(135deg, #D4DCE0 0%, #A8B4BC 100%)'
  ];
  
  // Napravi ~30 fotografija u poslednjih 45 dana
  for (let day = 0; day < 45; day++) {
    const photosThisDay = Math.floor(Math.random() * 4) + 2;
    for (let i = 1; i <= photosThisDay; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - day);
      photos.push({
        id: `${day}-${i}`,
        date: date,
        filename: formatFilename(date, i),
        gradient: gradijenti[(day + i) % gradijenti.length]
      });
    }
  }
  return photos;
}

const MOCK_PHOTOS = generateMockPhotos();

export default function Dashboard() {
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isDark, setIsDark] = useState(false);

  const selectedProject = MOCK_PROJECTS.find(p => p.id === selectedProjectId);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  };

  // Grupise fotografije po aktivnom filteru
  const groupedPhotos = useMemo(() => {
    const groups = {};
    
    MOCK_PHOTOS.forEach(photo => {
      let key;
      let label;
      const d = photo.date;
      
      if (activeFilter === 'all' || activeFilter === 'day') {
        key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        label = formatDate(d);
      } else if (activeFilter === 'week') {
        const week = getISOWeek(d);
        key = `${d.getFullYear()}-W${week}`;
        label = `${week}`;
      } else if (activeFilter === 'month') {
        key = `${d.getFullYear()}-${d.getMonth()}`;
        const meseci = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
        label = `${meseci[d.getMonth()]} ${d.getFullYear()}.`;
      } else if (activeFilter === 'year') {
        key = `${d.getFullYear()}`;
        label = `${d.getFullYear()}.`;
      }
      
      if (!groups[key]) {
        groups[key] = { label, photos: [], key };
      }
      groups[key].photos.push(photo);
    });
    
    return Object.values(groups).sort((a, b) => {
      return b.photos[0].date - a.photos[0].date;
    });
  }, [activeFilter]);

  const filterLabels = {
    all: 'Sve fotografije',
    day: 'Grupisano po danu',
    week: 'Grupisano po nedelji',
    month: 'Grupisano po mesecu',
    year: 'Grupisano po godini'
  };

  // Preuzimanje grupe (placeholder - kasnije ZIP)
  const handleDownloadGroup = (group) => {
    const projectSlug = selectedProject.name.split(' - ')[1] || selectedProject.name;
    let zipName;
    if (activeFilter === 'week') {
      zipName = `${projectSlug}_W${group.label}_${group.photos[0].date.getFullYear()}.zip`;
    } else if (activeFilter === 'month') {
      const m = String(group.photos[0].date.getMonth() + 1).padStart(2, '0');
      zipName = `${projectSlug}_${group.photos[0].date.getFullYear()}_${m}.zip`;
    } else if (activeFilter === 'year') {
      zipName = `${projectSlug}_${group.label.replace('.', '')}.zip`;
    } else {
      zipName = `${projectSlug}_${group.photos[0].filename.split('_')[0]}.zip`;
    }
    alert(`Preuzimanje: ${zipName}\n(${group.photos.length} fotografija)\n\nZIP funkcija se dodaje kasnije.`);
  };

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div className="dash-logo">SPOT<span className="slash">/</span>LOG</div>
        <nav className="dash-nav">
          <a href="#projects">Projekti</a>
          <a href="#photos">Fotografije</a>
          <a href="#settings">Podešavanja</a>
        </nav>
        <div className="dash-header-right">
          <button className="dash-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>
          <span className="dash-lang"><strong>SR</strong> | EN</span>
          <div className="dash-avatar">MN</div>
        </div>
      </header>

      <div className="dash-body">
        {/* SIDEBAR - lista projekata */}
        <aside className="dash-sidebar">
          <div className="sidebar-title-row">
            <div className="sidebar-title">Projekti</div>
            <button className="btn-icon" aria-label="Novi projekat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>
          <div className="sidebar-subtitle">
            {MOCK_PROJECTS.filter(p => p.status === 'aktivan').length} aktivna · {MOCK_PROJECTS.filter(p => p.status === 'zavrsen').length} završen
          </div>

          <div className="projects-list">
            {MOCK_PROJECTS.map(project => (
              <div
                key={project.id}
                className={`project-item ${project.id === selectedProjectId ? 'selected' : ''}`}
                onClick={() => setSelectedProjectId(project.id)}
              >
                <div className="project-name">{project.name}</div>
                <div className="project-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{project.location}</span>
                </div>
                <div className="project-footer">
                  <span className="project-count">{project.photoCount.toLocaleString('sr-RS')} fotografija</span>
                  <span className={`project-status status-${project.status}`}>
                    {project.status === 'aktivan' ? 'AKTIVAN' : 'ZAVRŠEN'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN - fotografije */}
        <main className="dash-main">
          <div className="main-header">
            <div className="main-title-row">
              <div>
                <div className="main-project-name">{selectedProject.name}</div>
                <div className="main-project-meta">
                  <span className="meta-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {selectedProject.location}
                  </span>
                  <span className="meta-dot">·</span>
                  <span>{selectedProject.photoCount.toLocaleString('sr-RS')} fotografija</span>
                  <span className="meta-dot">·</span>
                  <span>{selectedProject.status === 'aktivan' ? 'Aktivan' : 'Završen'} od {selectedProject.activeFrom}</span>
                </div>
              </div>
              <div className="main-actions">
                <button className="btn-outline">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Otpremi
                </button>
                <button className="btn-outline">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Preuzmi
                </button>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-tabs">
                {['all', 'day', 'week', 'month', 'year'].map(filter => (
                  <button
                    key={filter}
                    className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter === 'all' ? 'Sve' : filter === 'day' ? 'Dan' : filter === 'week' ? 'Nedelja' : filter === 'month' ? 'Mesec' : 'Godina'}
                  </button>
                ))}
              </div>
              <div className="filter-meta">
                <span>{filterLabels[activeFilter]}</span>
              </div>
            </div>
          </div>

          <div className="photos-content">
            {groupedPhotos.map(group => (
              <div key={group.key} className="photo-group">
                <div className="group-header">
                  <div className="group-label">{group.label}</div>
                  <div className="group-meta">
                    <span className="group-count">{group.photos.length} fotografija</span>
                    {(activeFilter === 'week' || activeFilter === 'month' || activeFilter === 'year') && (
                      <button
                        className="btn-icon-small"
                        onClick={() => handleDownloadGroup(group)}
                        aria-label="Preuzmi grupu"
                        title={`Preuzmi ceo ${activeFilter === 'week' ? 'nedeljni' : activeFilter === 'month' ? 'mesečni' : 'godišnji'} folder`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                <div className="photo-grid">
                  {group.photos.slice(0, 12).map(photo => (
                    <div key={photo.id} className="photo-tile" style={{ background: photo.gradient }}>
                      <span className="photo-label">{photo.filename}</span>
                    </div>
                  ))}
                  {group.photos.length > 12 && (
                    <div className="photo-tile photo-more">
                      <span className="photo-more-label">+{group.photos.length - 12}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
