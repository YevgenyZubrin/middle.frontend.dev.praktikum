export interface ButtonProps {
  events?: { click: () => void }
  onClick?: () => void
  filled?: boolean
  className?: string
  text: string
  icon?: any
}
