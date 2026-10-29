import { useState } from "react"
import { Icon } from "./components/Icon"
import { navItems, pageTitles } from "./config"
import { Reception } from "./modules/Reception"
import { Processing } from "./modules/Processing"
import { Representation } from "./modules/Representation"
import { Similarity } from "./modules/Similarity"
import { Results } from "./modules/Results"
import type { Page } from "./types"

export default function App() {
  const [page, setPage] = useState<Page>("recepcion")
  const [mobileOpen, setMobileOpen] = useState(false)
  const current = pageTitles[page]
  const activeStep = navItems.find((item) => item.id === page)?.step ?? 1
  const go = (destination: Page) => {
    setPage(destination)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            S<span>Q</span>
          </div>
          <div>
            <b>
              Semanti<span>Q</span>
            </b>
            <small>Análisis semántico</small>
          </div>
          <button className="mobile-close" onClick={() => setMobileOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <div className="nav-label">Flujo de análisis</div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              onClick={() => go(item.id)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              <small>{item.step}</small>
            </button>
          ))}
        </nav>
        <div className="scope-note">
          <Icon name="info" size={16} />
          <p>
            SemantiQ identifica posibles similitudes para apoyar la revisión
            humana. No emite dictámenes de plagio.
          </p>
        </div>
        <div className="version">SemantiQ · Versión prototipo 1.0</div>
      </aside>
      {mobileOpen && (
        <div className="backdrop" onClick={() => setMobileOpen(false)} />
      )}
      <main className="main">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileOpen(true)}>
            <Icon name="menu" />
          </button>
          <div className="page-title">
            <div className="breadcrumb">
              SemantiQ <Icon name="chevron" size={12} /> Etapa {activeStep} de 5
            </div>
            <h1>{current.title}</h1>
            <p>{current.subtitle}</p>
          </div>
          <div className="top-actions">
            <div className="system-state">
              <span />
              <div>
                <small>Estado del sistema</small>
                <b>Operativo</b>
              </div>
            </div>
            <button className="notification" aria-label="Notificaciones">
              <Icon name="bell" />
            </button>
            <div className="user-menu">
              <div className="avatar">AM</div>
              <div>
                <b>Andrea Martínez</b>
                <span>Acceso autorizado</span>
              </div>
            </div>
          </div>
        </header>
        <div className="content">
          {page === "recepcion" && <Reception go={go} />}
          {page === "procesamiento" && <Processing go={go} />}
          {page === "representacion" && <Representation go={go} />}
          {page === "similitud" && <Similarity go={go} />}
          {page === "resultados" && <Results go={go} />}
        </div>
      </main>
    </div>
  )
}
