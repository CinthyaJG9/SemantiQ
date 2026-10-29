import { useState } from "react"
import type { Page, Tone } from "../types"
import { Icon } from "../components/Icon"
import {
  Button,
  Card,
  CardHeader,
  DemoTag,
  FlowBar,
  Notice,
  Status,
} from "../components/ui"

const matches: {
  id: string
  sourceFragment: string
  relatedFragment: string
  document: string
  score: string
  level: string
  tone: Tone
  originPosition: string
  relatedPosition: string
}[] = [
  {
    id: "COI-008",
    sourceFragment: "FRG-0184-002",
    relatedFragment: "FRG-0142-021",
    document: "fundamentos_redes_neuronales.pdf",
    score: "0.87",
    level: "Similitud alta",
    tone: "danger",
    originPosition: "Página 3 · posición 2",
    relatedPosition: "Página 12 · posición 21",
  },
  {
    id: "COI-003",
    sourceFragment: "FRG-0184-001",
    relatedFragment: "FRG-0098-014",
    document: "introduccion_aprendizaje.pdf",
    score: "0.79",
    level: "Similitud alta",
    tone: "danger",
    originPosition: "Página 3 · posición 1",
    relatedPosition: "Página 8 · posición 14",
  },
  {
    id: "COI-011",
    sourceFragment: "FRG-0184-003",
    relatedFragment: "FRG-0142-008",
    document: "fundamentos_redes_neuronales.pdf",
    score: "0.68",
    level: "Similitud media",
    tone: "warning",
    originPosition: "Página 4 · posición 3",
    relatedPosition: "Página 5 · posición 8",
  },
]

export function Results({ go }: { go: (page: Page) => void }) {
  const [selected, setSelected] = useState(0)
  const match = matches[selected]
  return (
    <div className="page-stack">
      <FlowBar active={5} onNavigate={go} />
      <div className="result-hero">
        <div className="result-title">
          <span className="result-icon">
            <Icon name="chart" size={24} />
          </span>
          <div>
            <span>Análisis finalizado correctamente</span>
            <h2>AN-2025-0048</h2>
            <p>propuesta_protocolo_semantiq.pdf · DOC-2025-0184</p>
          </div>
        </div>
        <div className="result-meta">
          <div>
            <span>Fecha de análisis</span>
            <b>14 may 2025 · 11:42</b>
          </div>
          <div>
            <span>Estado</span>
            <Status tone="success">Completado</Status>
          </div>
          <div>
            <span>Configuración</span>
            <b>SIM-CONFIG-03</b>
          </div>
        </div>
      </div>
      <div className="result-overview">
        <Card>
          <span>Documentos comparados</span>
          <b>2</b>
          <small>Documentos distintos</small>
        </Card>
        <Card>
          <span>Fragmentos relacionados</span>
          <b>3</b>
          <small>Disponibles para revisión</small>
        </Card>
        <Card className="primary-score">
          <span>Mayor valor observado</span>
          <b>0.87</b>
          <Status tone="danger">Similitud alta</Status>
        </Card>
        <Notice tone="info" title="Posible caso que requiere revisión">
          Una similitud elevada es un indicador para revisión humana; no es
          prueba definitiva de copia ni un dictamen de plagio.
        </Notice>
      </div>
      <Card>
        <CardHeader
          title="Fragmentos relacionados"
          subtitle="Selecciona una coincidencia para consultar su contexto"
          action={<DemoTag />}
        />
        <div className="table-wrap results-table">
          <table>
            <thead>
              <tr>
                <th>Documento relacionado</th>
                <th>Fragmento analizado</th>
                <th>Fragmento relacionado</th>
                <th>Valor</th>
                <th>Nivel de similitud</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {matches.map((row, index) => (
                <tr
                  key={row.id}
                  className={selected === index ? "selected" : ""}
                  onClick={() => setSelected(index)}
                >
                  <td>
                    <b>{row.document}</b>
                    <small>{row.id}</small>
                  </td>
                  <td className="mono">{row.sourceFragment}</td>
                  <td className="mono">{row.relatedFragment}</td>
                  <td>
                    <b className="large-score">{row.score}</b>
                  </td>
                  <td>
                    <Status tone={row.tone}>{row.level}</Status>
                  </td>
                  <td>
                    <Icon name="chevron" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="comparison-detail">
        <CardHeader
          title="Comparación de fragmentos"
          subtitle={`${match.id} · nivel de similitud: ${match.level}`}
          action={<span className="score-detail">{match.score}</span>}
        />
        <div className="compare-head">
          <div>
            <span>Propuesta de protocolo analizada</span>
            <b>propuesta_protocolo_semantiq.pdf</b>
            <small>
              DOC-2025-0184 · {match.sourceFragment} · {match.originPosition}
            </small>
          </div>
          <div className="match-link">
            <Icon name="compare" size={20} />
          </div>
          <div>
            <span>Documento relacionado</span>
            <b>{match.document}</b>
            <small>
              {match.relatedFragment} · {match.relatedPosition}
            </small>
          </div>
        </div>
        <div className="side-texts">
          <div>
            <p>
              Los modelos de representación semántica permiten convertir
              unidades textuales en vectores numéricos, conservando relaciones
              de significado entre palabras y fragmentos.
            </p>
          </div>
          <div>
            <p>
              Las representaciones semánticas transforman fragmentos de texto en
              vectores que conservan las relaciones de significado presentes
              entre distintas unidades lingüísticas.
            </p>
          </div>
        </div>
        <div className="review-note">
          <Icon name="info" size={17} />
          <span>
            Los fragmentos se muestran para apoyar su interpretación contextual.
            El resultado requiere revisión humana.
          </span>
        </div>
      </Card>
      <div className="bottom-action">
        <Button variant="ghost" onClick={() => go("similitud")}>
          Volver al análisis
        </Button>
        <span>
          <Icon name="lock" size={13} /> Consulta disponible únicamente para
          usuarios autorizados
        </span>
      </div>
    </div>
  )
}
