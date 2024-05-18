export interface ChooseAvatarInputProps {
  className?: string
  events?: {
    change: (e: Event) => void
  }
  onChange?: (e: Event) => void
}
