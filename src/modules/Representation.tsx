import type { Page, Tone } from "../types"
import {
  Button,
  Card,
  CardHeader,
  DemoTag,
  FlowBar,
  Notice,
  Status,
} from "../components/ui"

const embeddingRows: [string, string, string, string, string, Tone][] = [
  [
    "EMB-0184-001",
    "FRG-0184-001",
    "Página 3 · posición 1",
    "SEM-ES · v2.1",
    "Válida",
    "success",
  ],
  [
    "EMB-0184-002",
    "FRG-0184-002",
    "Página 3 · posición 2",
    "SEM-ES · v2.1",
    "Válida · reutilizada",
    "success",
  ],
  [
    "EMB-0184-003",
    "FRG-0184-003",
    "Página 4 · posición 3",
    "SEM-ES · v2.1",
    "Válida",
    "success",
  ],
  [
    "—",
    "FRG-0184-004",
    "Página 4 · posición 4",
    "SEM-ES · v2.1",
    "Pendiente",
    "warning",
  ],
  [
    "—",
    "FRG-0184-005",
    "Página 5 · posición 5",
    "SEM-ES · v2.1",
    "Generación fallida",
    "danger",
  ],
]

export function Representation({ go }: { go: (page: Page) => void }) {
  return (
    <div className="page-stack">
      <FlowBar active={3} onNavigate={go} />
      <Card className="context-bar">
        <div className="context-document">
          <span>Documento de entrada</span>
          <b>DOC-2025-0184 · propuesta_protocolo_semantiq.pdf</b>
          <small>42 fragmentos procesados</small>
        </div>
        <div className="context-meta">
          <span>Modelo y versión</span>
          <b>
            SEM-ES · v2.1 <small>Demostración</small>
          </b>
        </div>
        <div className="context-meta">
          <span>Configuración</span>
          <b className="mono">CFG-MOD-02</b>
        </div>
        <div className="context-meta">
          <span>Estado</span>
          <Status tone="info">En generación</Status>
        </div>
      </Card>
      <div className="representation-summary">
        <Card>
          <span>Fragmentos recibidos</span>
          <b>42</b>
          <small>Desde procesamiento de texto</small>
        </Card>
        <Card>
          <span>Representaciones válidas</span>
          <b>38</b>
          <small>Compatibles con la configuración</small>
        </Card>
        <Card>
          <span>Pendientes</span>
          <b>3</b>
          <small>Aún no disponibles</small>
        </Card>
        <Card>
          <span>Fallidas</span>
          <b>1</b>
          <small>No puede usarse para comparar</small>
        </Card>
      </div>
      <Card>
        <CardHeader
          title="Representaciones por fragmento"
          subtitle="Relación entre cada embedding, su origen y su posición"
          action={<DemoTag />}
        />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Embedding</th>
                <th>Fragmento de origen</th>
                <th>Posición</th>
                <th>Modelo</th>
                <th>Estado de validación</th>
              </tr>
            </thead>
            <tbody>
              {embeddingRows.map((row, index) => (
                <tr key={`${row[1]}-${index}`}>
                  <td className="mono">{row[0]}</td>
                  <td className="mono">{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td>
                    <Status tone={row[5]}>{row[4]}</Status>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Notice
        tone="danger"
        icon="alert"
        title="Una representación no pudo generarse"
      >
        FRG-0184-005 no produjo una representación válida. Las representaciones
        pendientes o fallidas quedan excluidas del cálculo de similitud.
      </Notice>
      <div className="bottom-action">
        <div>
          <b>El documento aún no puede avanzar</b>
          <span>
            Es necesario completar la generación y validar la compatibilidad de
            todas las representaciones.
          </span>
        </div>
        <Button icon="arrow" disabled onClick={() => go("similitud")}>
          Continuar a similitud
        </Button>
      </div>
    </div>
  )
}
