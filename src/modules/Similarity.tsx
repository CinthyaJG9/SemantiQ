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

const comparisonRows: [string, string, string, string, string, Tone][] = [
  [
    "FRG-0184-002",
    "FRG-0142-021",
    "DOC-2025-0142",
    "0.87",
    "Similitud alta",
    "danger",
  ],
  [
    "FRG-0184-001",
    "FRG-0098-014",
    "DOC-2025-0098",
    "0.79",
    "Similitud alta",
    "danger",
  ],
  [
    "FRG-0184-003",
    "FRG-0142-008",
    "DOC-2025-0142",
    "0.68",
    "Similitud media",
    "warning",
  ],
]

export function Similarity({ go }: { go: (page: Page) => void }) {
  return (
    <div className="page-stack">
      <FlowBar active={4} onNavigate={go} />
      <Card>
        <CardHeader
          title="Documentos participantes"
          subtitle="Solo se comparan fragmentos de documentos distintos"
        />
        <div className="comparison-inputs">
          <div className="fixed-document">
            <span className="fixed-document-icon">
              <Icon name="file" size={18} />
            </span>
            <div>
              <span>Documento analizado en el flujo actual</span>
              <b>propuesta_protocolo_semantiq.pdf</b>
              <small>
                DOC-2025-0184 · 42 fragmentos con representaciones válidas
              </small>
            </div>
            <Status tone="success">Preparado</Status>
          </div>
          <span className="compare-symbol">
            <Icon name="compare" size={20} />
          </span>
          <div className="corpus-input">
            <div className="corpus-heading">
              <span className="corpus-icon">
                <Icon name="grid" size={18} />
              </span>
              <div>
                <span>Corpus de referencia del sistema</span>
                <b>Todos los documentos disponibles</b>
              </div>
              <Status tone="success">Disponible</Status>
            </div>
            <div className="corpus-counts">
              <div>
                <b>24</b>
                <span>documentos de referencia</span>
              </div>
              <div>
                <b>812</b>
                <span>fragmentos compatibles</span>
              </div>
            </div>
            <small>
              El sistema incluye automáticamente todos los documentos con
              representaciones válidas y compatibles.
            </small>
          </div>
        </div>
        <div className="analysis-configuration">
          <div>
            <span>Configuración utilizada</span>
            <b className="mono">SIM-CONFIG-03</b>
          </div>
          <div>
            <span>Modelo de representación</span>
            <b>SEM-ES · v2.1</b>
          </div>
          <div>
            <span>Estado del análisis</span>
            <Status tone="info">Procesamiento automático</Status>
          </div>
        </div>
      </Card>
      <Notice tone="info" title="Comparación con el corpus disponible">
        El documento se compara con todos los documentos de referencia cargados
        por el sistema. Las representaciones incompatibles se excluyen del
        cálculo y se reportan sin generar resultados parciales. Los valores
        mostrados son ejemplos y no constituyen una conclusión de plagio.
      </Notice>
      <Card>
        <CardHeader
          title="Pares de fragmentos comparados"
          subtitle="Resultados asociados con documentos, fragmentos y configuración"
          action={
            <>
              <Status tone="success">Análisis completado</Status>
              <DemoTag />
            </>
          }
        />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Fragmento analizado</th>
                <th>Fragmento relacionado</th>
                <th>Documento relacionado</th>
                <th>Valor de similitud</th>
                <th>Nivel de similitud</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={`${row[0]}-${row[1]}`}>
                  <td className="mono">{row[0]}</td>
                  <td className="mono">{row[1]}</td>
                  <td className="mono">{row[2]}</td>
                  <td>
                    <b className="large-score">{row[3]}</b>
                  </td>
                  <td>
                    <Status tone={row[5]}>{row[4]}</Status>
                  </td>
                  <td>
                    <button
                      className="text-button"
                      onClick={() => go("resultados")}
                    >
                      Consultar <Icon name="chevron" size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="bottom-action">
        <div>
          <b>Análisis AN-2025-0048 completado</b>
          <span>
            Los resultados están disponibles para revisión contextual.
          </span>
        </div>
        <Button icon="arrow" onClick={() => go("resultados")}>
          Ver resultados
        </Button>
      </div>
    </div>
  )
}
