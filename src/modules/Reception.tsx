import { useRef, useState, type ChangeEvent } from "react"
import type { Page } from "../types"
import { Icon } from "../components/Icon"
import {
  Button,
  Card,
  CardHeader,
  DemoTag,
  FlowBar,
  Status,
} from "../components/ui"

type UploadState = "empty" | "accepted" | "format" | "size" | "damaged" | "password" | "duplicate"

const uploadErrors: Record<Exclude<UploadState, "empty" | "accepted">, {
  title: string
  detail: string
}> = {
  format: {
    title: "Formato no admitido",
    detail:
      "El archivo seleccionado no es un PDF. Selecciona un documento con extensión .pdf.",
  },
  size: {
    title: "El archivo excede el tamaño permitido",
    detail: "El documento supera el límite de 30 MB y no puede registrarse.",
  },
  damaged: {
    title: "No fue posible abrir el PDF",
    detail: "El archivo parece estar dañado o no corresponde a un PDF válido.",
  },
  password: {
    title: "El PDF está protegido por contraseña",
    detail:
      "Selecciona una copia sin protección para permitir la extracción del texto.",
  },
  duplicate: {
    title: "El documento ya está registrado",
    detail:
      "Se encontró un documento idéntico. No se creó un registro duplicado.",
  },
}

export function Reception({ go }: { go: (page: Page) => void }) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [uploadState, setUploadState] = useState<UploadState>("empty")
  const [fileName, setFileName] = useState("")

  const inspectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    const normalized = file.name.toLowerCase()
    if (file.type !== "application/pdf" && !normalized.endsWith(".pdf"))
      setUploadState("format")
    else if (file.size > 30 * 1024 * 1024) setUploadState("size")
    else if (
      normalized.includes("protegido") ||
      normalized.includes("password")
    )
      setUploadState("password")
    else if (
      normalized.includes("dañado") ||
      normalized.includes("danado") ||
      normalized.includes("corrupto")
    )
      setUploadState("damaged")
    else if (normalized === "propuesta_protocolo_ia.pdf")
      setUploadState("duplicate")
    else setUploadState("accepted")
    event.target.value = ""
  }

  const rejected = uploadState !== "empty" && uploadState !== "accepted"
  return (
    <div className="page-stack">
      <FlowBar active={1} onNavigate={go} />
      <div className="two-col wide-right">
        <Card>
          <CardHeader
            title="Cargar propuesta de protocolo"
            subtitle="Únicamente archivos PDF sin contraseña"
            action={
              <span className="privacy-label">
                <Icon name="lock" size={14} /> Documento confidencial
              </span>
            }
          />
          <input
            ref={fileInput}
            className="hidden-file-input"
            type="file"
            accept=".pdf,application/pdf"
            onChange={inspectFile}
          />
          <div
            className={`dropzone ${
              uploadState === "accepted" ? "has-file" : ""
            } ${rejected ? "has-error" : ""}`}
            onClick={() => fileInput.current?.click()}
          >
            <span className="drop-icon">
              <Icon
                name={
                  uploadState === "accepted"
                    ? "check"
                    : rejected
                      ? "alert"
                      : "upload"
                }
                size={24}
              />
            </span>
            {uploadState === "empty" && (
              <>
                <b>Arrastra y suelta un archivo PDF aquí</b>
                <p>o selecciónalo desde tu equipo</p>
                <Button variant="secondary">Seleccionar PDF</Button>
                <small>Formato admitido: PDF · Tamaño máximo: 30 MB</small>
              </>
            )}
            {uploadState === "accepted" && (
              <>
                <b>{fileName}</b>
                <p>PDF · El archivo cumple las validaciones de recepción</p>
                <Status tone="success">Documento aceptado</Status>
              </>
            )}
            {rejected && (
              <>
                <b>{fileName}</b>
                <p>
                  El archivo no puede registrarse ni avanzar al procesamiento
                </p>
                <Status tone="danger">Documento rechazado</Status>
              </>
            )}
          </div>
          {rejected && (
            <div className="upload-message">
              <Icon name="alert" size={18} />
              <div>
                <b>
                  {
                    uploadErrors[(uploadState as keyof typeof uploadErrors)]
                      .title
                  }
                </b>
                <p>
                  {
                    uploadErrors[(uploadState as keyof typeof uploadErrors)]
                      .detail
                  }
                </p>
              </div>
              <button onClick={() => setUploadState("empty")}>
                Elegir otro archivo
              </button>
            </div>
          )}
          {uploadState === "accepted" && (
            <div className="accepted-document">
              <div>
                <span>Identificador</span>
                <b className="mono">DOC-2025-0185</b>
              </div>
              <div>
                <span>Nombre original</span>
                <b>{fileName}</b>
              </div>
              <div>
                <span>Fecha de recepción</span>
                <b>14 may 2025 · 12:08</b>
              </div>
              <div>
                <span>Estado</span>
                <Status tone="success">Aceptado</Status>
              </div>
            </div>
          )}
          <div className="form-actions">
            <Button variant="ghost" onClick={() => setUploadState("empty")}>
              Cancelar
            </Button>
            <Button icon="check" disabled={uploadState !== "accepted"}>
              Registrar documento
            </Button>
          </div>
        </Card>
        <Card className="validation-card">
          <CardHeader
            title="Validaciones de recepción"
            subtitle="Condiciones obligatorias para aceptar el documento"
          />
          <div className="validation-list">
            <div className={uploadState === "accepted" ? "" : "pending-check"}>
              <Icon name={uploadState === "accepted" ? "check" : "clock"} />
              <span>
                <b>PDF válido</b>
                <small>El formato y la estructura corresponden a un PDF.</small>
              </span>
            </div>
            <div className={uploadState === "accepted" ? "" : "pending-check"}>
              <Icon name={uploadState === "accepted" ? "check" : "clock"} />
              <span>
                <b>Archivo accesible</b>
                <small>Puede abrirse correctamente y no está dañado.</small>
              </span>
            </div>
            <div className={uploadState === "accepted" ? "" : "pending-check"}>
              <Icon name={uploadState === "accepted" ? "check" : "clock"} />
              <span>
                <b>Sin contraseña</b>
                <small>No contiene protección que impida procesarlo.</small>
              </span>
            </div>
            <div className={uploadState === "accepted" ? "" : "pending-check"}>
              <Icon name={uploadState === "accepted" ? "check" : "clock"} />
              <span>
                <b>Sin duplicados</b>
                <small>No existe un documento idéntico registrado.</small>
              </span>
            </div>
          </div>
        </Card>
      </div>
      <Card>
        <CardHeader
          title="Documentos aceptados"
          subtitle="Solo los documentos aceptados pueden continuar en el flujo"
          action={<DemoTag />}
        />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Identificador</th>
                <th>Nombre original</th>
                <th>Fecha de recepción</th>
                <th>Estado</th>
                <th>Siguiente etapa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b className="mono">DOC-2025-0184</b>
                </td>
                <td>
                  <div className="file-cell">
                    <Icon name="file" />
                    <span>
                      <b>propuesta_protocolo_semantiq.pdf</b>
                      <small>PDF · 2.8 MB</small>
                    </span>
                  </div>
                </td>
                <td>14 may 2025 · 11:35</td>
                <td>
                  <Status tone="success">Aceptado</Status>
                </td>
                <td>
                  <Button
                    variant="ghost"
                    icon="arrow"
                    onClick={() => go("procesamiento")}
                  >
                    Procesar texto
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
