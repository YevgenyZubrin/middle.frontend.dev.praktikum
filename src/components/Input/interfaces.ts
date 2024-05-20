export interface InputProps {
  className?: string
  id: string
  type: string
  disabled?: boolean
  placeholder?: string
  events?: {
    blur: (e: Event) => void
    change: (e: Event) => void
  }
  onBlur?: (e: Event) => void
  onChange?: (e: Event) => void
}
