import type { ReactNode } from "react"
import type { Page, Tone } from "../types"
import { navItems } from "../config"
import { Icon, type IconName } from "./Icon"

export function Status({
  children,
  tone = "neutral",
  dot = true,
}: {
  children: ReactNode
  tone?: Tone
  dot?: boolean
}) {
  return (
    <span className={`status status-${tone}`}>
      {dot && <span className="status-dot" />}
      {children}
    </span>
  )
}

export function Button({
  children,
  icon,
  variant = "primary",
  disabled = false,
  onClick,
}: {
  children: ReactNode
  icon?: IconName
  variant?: "primary" | "secondary" | "ghost"
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      className={`button button-${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  )
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <section className={`card ${className}`}>{children}</section>
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="card-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function DemoTag() {
  return <span className="demo-tag">Datos de demostración</span>
}

export function Notice({
  tone = "info",
  icon = "info",
  title,
  children,
}: {
  tone?: Tone
  icon?: IconName
  title: string
  children: ReactNode
}) {
  return (
    <div className={`requirement-notice notice-${tone}`}>
      <Icon name={icon} size={18} />
      <div>
        <b>{title}</b>
        <p>{children}</p>
      </div>
    </div>
  )
}

export function FlowBar({
  active,
  onNavigate,
}: {
  active: number
  onNavigate: (page: Page) => void
}) {
  return (
    <div className="flow-card">
      <div className="flow-title">
        <span>Flujo de análisis</span>
        <span className="flow-caption">Documento DOC-2025-0184</span>
      </div>
      <div className="flow-steps">
        {navItems.map((item, index) => (
          <div className="flow-segment" key={item.id}>
            <button
              className={`flow-step ${item.step === active ? "active" : ""} ${
                item.step < active ? "done" : ""
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="flow-number">
                {item.step < active ? (
                  <Icon name="check" size={13} />
                ) : (
                  item.step
                )}
              </span>
              <span>{item.shortLabel}</span>
            </button>
            {index < navItems.length - 1 && (
              <span
                className={`flow-line ${item.step < active ? "done" : ""}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
