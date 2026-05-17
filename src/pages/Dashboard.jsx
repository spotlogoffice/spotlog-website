import { useState, useRef } from 'react'
import './Dashboard.css'

export default function Dashboard({ user, onLogout }) {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Stambeni kompleks - Novi Beograd',
      location: 'Beograd, Srbija',
      photos: 247,
      status: 'Aktivan',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Poslovni objekat - BW Galerija',
      location: 'Beograd, Srbija',
      photos: 1203,
      status: 'Aktivan',
      createdDate: '2023-11-20'
    }
  ])

  const [selectedProject, setSelectedProject] = useState(projects[0])
  const [photos, setPhotos] = useState([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handlePhotoUpload = (e) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)

    // Simuliraj upload
    setTimeout(() => {
      const newPhotos = Array.from(files).map((file, idx) => ({
        id: Date.now() + idx,
        name: file.name,
        date: new Date().toLocaleDateString('sr-RS'),
        time: new Date().toLocaleTimeString('sr-RS'),
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      }))

      setPhotos([...newPhotos, ...photos])
      setSelectedProject({
        ...selectedProject,
        photos: selectedProject.photos + files.length
      })

      setUploading(false)
    }, 1500)
  }

  const handleCreateProject = () => {
    const newProject = {
      id: Date.now(),
      name: 'Novi projekat',
      location: 'Lokacija',
      photos: 0,
      status: 'Aktivan',
      createdDate: new Date().toISOString().split('T')[0]
    }
    setProjects([...projects, newProject])
    setSelectedProject(newProject)
    setPhotos([])
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>SPOT/LOG</h1>
        </div>
        <div className="header-right">
          <span className="user-email">{user.email}</span>
          <button className="btn btn-secondary logout-btn" onClick={onLogout}>
            ← Odjava
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h2>Projekti</h2>
            <button
              className="btn btn-primary btn-small"
              onClick={handleCreateProject}
            >
              + Novi
            </button>
          </div>

          <div className="projects-list">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`project-list-item ${
                  selectedProject.id === project.id ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedProject(project)
                  setPhotos([])
                }}
              >
                <div className="project-list-header">
                  <h3>{project.name}</h3>
                </div>
                <div className="project-list-meta">
                  <span className="location">📍 {project.location}</span>
                </div>
                <div className="project-list-stats">
                  <span className="photo-count">
                    📸 {project.photos}
                  </span>
                  <span className={`status ${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {selectedProject && (
            <>
              {/* Project Header */}
              <div className="project-header">
                <div className="project-info">
                  <h1>{selectedProject.name}</h1>
                  <p className="project-location">📍 {selectedProject.location}</p>
                </div>
                <div className="project-actions">
                  <button className="btn btn-secondary">📤 Deli projekat</button>
                </div>
              </div>

              {/* Photos Section */}
              <section className="photos-section">
                <div className="section-header">
                  <div>
                    <h2>Fotografije ({selectedProject.photos})</h2>
                    <select className="grouping-select">
                      <option>Bez grupiranja</option>
                      <option>Po danima</option>
                      <option>Po nedeljama</option>
                      <option>Po mesecima</option>
                    </select>
                  </div>
                  <div className="section-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? '⏳ Uploadovanje...' : '⬆️ Dodaj fotografiju'}
                    </button>
                    <button className="btn btn-secondary">⬇️ Skini sve</button>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />

                {photos.length > 0 ? (
                  <div className="photos-grid">
                    {photos.map((photo) => (
                      <div key={photo.id} className="photo-item">
                        <div className="photo-placeholder">📷</div>
                        <div className="photo-info">
                          <p className="photo-name">{photo.name}</p>
                          <p className="photo-meta">{photo.date} {photo.time}</p>
                          <p className="photo-size">{photo.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📸</div>
                    <h3>Još nema fotografija</h3>
                    <p>Klikni na "Dodaj fotografiju" da počneš sa dokumentacijom</p>
                  </div>
                )}
              </section>

              {/* Activity Log */}
              <section className="activity-section">
                <h2>⏱️ Aktivnost</h2>
                <div className="activity-item">
                  <span className="activity-dot"></span>
                  <div className="activity-content">
                    <p className="activity-action">Projekat kreiran</p>
                    <p className="activity-date">{selectedProject.createdDate}</p>
                  </div>
                </div>
                {photos.slice(0, 3).map((photo) => (
                  <div key={photo.id} className="activity-item">
                    <span className="activity-dot"></span>
                    <div className="activity-content">
                      <p className="activity-action">Fotografija uploadovana: {photo.name}</p>
                      <p className="activity-date">{photo.date} {photo.time}</p>
                    </div>
                  </div>
                ))}
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
