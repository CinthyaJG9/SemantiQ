import type { Page } from "./types"
import type { IconName } from "./components/Icon"

export const navItems: {
  id: Page
  label: string
  shortLabel: string
  icon: IconName
  step: number
}[] = [
  {
    id: "recepcion",
    label: "Recepción de documentos",
    shortLabel: "Recepción",
    icon: "file",
    step: 1,
  },
  {
    id: "procesamiento",
    label: "Procesamiento de texto",
    shortLabel: "Procesamiento",
    icon: "text",
    step: 2,
  },
  {
    id: "representacion",
    label: "Representación semántica",
    shortLabel: "Representación",
    icon: "grid",
    step: 3,
  },
  {
    id: "similitud",
    label: "Cálculo de similitud",
    shortLabel: "Similitud",
    icon: "compare",
    step: 4,
  },
  {
    id: "resultados",
    label: "Visualización de resultados",
    shortLabel: "Resultados",
    icon: "chart",
    step: 5,
  },
]

export const pageTitles: Record<Page, { title: string; subtitle: string }> = {
  recepcion: {
    title: "Recepción de documentos",
    subtitle:
      "Validación y registro seguro de propuestas de protocolo en formato PDF",
  },
  procesamiento: {
    title: "Extracción y procesamiento de texto",
    subtitle: "Consulta del texto extraído, normalizado y segmentado",
  },
  representacion: {
    title: "Representación semántica",
    subtitle: "Generación y validación de embeddings asociados a fragmentos",
  },
  similitud: {
    title: "Cálculo de similitud semántica",
    subtitle: "Comparación de fragmentos pertenecientes a documentos distintos",
  },
  resultados: {
    title: "Visualización de resultados",
    subtitle: "Consulta contextual de fragmentos relacionados",
  },
}
