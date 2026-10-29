import { useState } from "react"
import type { Page } from "../types"
import { Icon } from "../components/Icon"
import {
  Button,
  Card,
  CardHeader,
  FlowBar,
  Notice,
  Status,
} from "../components/ui"

export function Processing({ go }: { go: (page: Page) => void }) {
  const [documentState, setDocumentState] = useState<"ready" | "no-text">(
    "ready",
  )
  const [tab, setTab] = useState<"compare" | "fragments">("compare")
  const failed = documentState === "no-text"
  return (
    <div className="page-stack">
      <FlowBar active={2} onNavigate={go} />
      <Card className="context-bar">
        <label className="field">
          <span>Documento PDF aceptado</span>
          <select
            value={documentState}
            onChange={(event) =>
              setDocumentState(event.target.value as "ready" | "no-text")
            }
          >
            <option value="ready">
              DOC-2025-0184 · propuesta_protocolo_semantiq.pdf
            </option>
            <option value="no-text">
              DOC-2025-0179 · propuesta_escaneada.pdf
            </option>
          </select>
        </label>
        <div className="context-meta">
          <span>Estado del procesamiento</span>
          <Status tone={failed ? "danger" : "success"}>
            {failed ? "Sin texto extraíble" : "Completado"}
          </Status>
        </div>
        <div className="context-meta">
          <span>Origen</span>
          <b>Documento PDF aceptado</b>
        </div>
      </Card>
      {failed ? (
        <>
          <Notice
            tone="danger"
            icon="alert"
            title="No se encontró texto extraíble"
          >
            El PDF no contiene texto que pueda procesarse. El documento no puede
            avanzar a la generación de representaciones semánticas.
          </Notice>
          <Card className="blocked-state">
            <Icon name="text" size={32} />
            <h2>Procesamiento detenido</h2>
            <p>
              SemantiQ no incorpora reconocimiento óptico de caracteres.
              Selecciona un PDF con texto extraíble.
            </p>
            <Button variant="ghost" onClick={() => setDocumentState("ready")}>
              Seleccionar otro documento
            </Button>
          </Card>
        </>
      ) : (
        <>
          <div className="stat-strip">
            <div>
              <span>Páginas procesadas</span>
              <b>24</b>
              <small>En orden de lectura</small>
            </div>
            <div>
              <span>Fragmentos generados</span>
              <b>42</b>
              <small>Con identificador y posición</small>
            </div>
            <div>
              <span>Referencias bibliográficas</span>
              <b>Excluidas</b>
              <small>No participan en el análisis</small>
            </div>
            <div>
              <span>Estado de salida</span>
              <b>Disponible</b>
              <small>Texto almacenado</small>
            </div>
          </div>
          <Card>
            <CardHeader
              title="Resultado del procesamiento"
              subtitle="Vista parcial del texto y los fragmentos resultantes; no se muestra el documento completo"
              action={
                <div className="segmented">
                  <button
                    className={tab === "compare" ? "active" : ""}
                    onClick={() => setTab("compare")}
                  >
                    Texto
                  </button>
                  <button
                    className={tab === "fragments" ? "active" : ""}
                    onClick={() => setTab("fragments")}
                  >
                    Fragmentos
                  </button>
                </div>
              }
            />
            {tab === "compare" ? (
              <>
                <div className="page-control">
                  <span>
                    <Icon name="file" size={15} /> Muestra de la página 3 de 24
                    · orden de lectura conservado
                  </span>
                  <small>Contenido representativo</small>
                </div>
                <div className="text-comparison">
                  <div className="text-pane">
                    <div className="pane-label">Texto extraído del PDF</div>
                    <h3>2. Marco teórico</h3>
                    <p>
                      El procesamiento del lenguaje natural (PLN) es un campo de
                      la inteligencia artificial que estudia las interacciones
                      entre las computadoras y el lenguaje humano.
                    </p>
                    <p>
                      Los modelos de representación semántica permiten convertir
                      unidades textuales en vectores numéricos, conservando
                      relaciones de significado entre palabras y fragmentos.
                    </p>
                  </div>
                  <div className="text-pane processed">
                    <div className="pane-label">Texto limpio y normalizado</div>
                    <p>
                      El procesamiento del lenguaje natural (PLN) es un campo de
                      la inteligencia artificial que estudia las interacciones
                      entre las computadoras y el lenguaje humano.
                    </p>
                    <p>
                      Los modelos de representación semántica permiten convertir
                      unidades textuales en vectores numéricos, conservando
                      relaciones de significado entre palabras y fragmentos.
                    </p>
                    <div className="normalization-note">
                      <Icon name="check" size={14} /> Acentos, letra ñ y
                      caracteres del español conservados
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="partial-view-note">
                  <Icon name="info" size={15} />
                  <span>
                    Se muestran 3 fragmentos representativos de los 42
                    generados. Esta tabla no contiene el documento completo.
                  </span>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Fragmento</th>
                        <th>Documento de origen</th>
                        <th>Posición</th>
                        <th>Vista previa</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="mono">FRG-0184-001</td>
                        <td className="mono">DOC-2025-0184</td>
                        <td>Página 3 · posición 1</td>
                        <td>
                          El procesamiento del lenguaje natural es un campo...
                        </td>
                        <td>
                          <Status tone="success">Disponible</Status>
                        </td>
                      </tr>
                      <tr>
                        <td className="mono">FRG-0184-002</td>
                        <td className="mono">DOC-2025-0184</td>
                        <td>Página 3 · posición 2</td>
                        <td>
                          Los modelos de representación semántica permiten...
                        </td>
                        <td>
                          <Status tone="success">Disponible</Status>
                        </td>
                      </tr>
                      <tr>
                        <td className="mono">FRG-0184-003</td>
                        <td className="mono">DOC-2025-0184</td>
                        <td>Página 4 · posición 3</td>
                        <td>
                          La comparación de documentos requiere considerar...
                        </td>
                        <td>
                          <Status tone="success">Disponible</Status>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>
          <Card className="processing-rules">
            <CardHeader
              title="Operaciones aplicadas"
              subtitle="Trazabilidad del procesamiento textual"
            />
            <div className="rule-grid">
              {[
                "Encabezados y pies de página eliminados",
                "Números de página eliminados",
                "Saltos y espacios redundantes normalizados",
                "Caracteres del español conservados",
                "Referencias bibliográficas identificadas y excluidas",
                "Fragmentos vinculados con su origen y posición",
              ].map((rule) => (
                <div key={rule}>
                  <Icon name="check" size={15} />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="bottom-action">
            <div>
              <b>Texto y fragmentos disponibles</b>
              <span>
                Los 42 fragmentos pueden entregarse al módulo de representación
                semántica.
              </span>
            </div>
            <Button icon="arrow" onClick={() => go("representacion")}>
              Continuar
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
