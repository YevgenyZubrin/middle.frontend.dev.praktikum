declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T
  export type Values<T extends Record<string, unknown>> = T[Keys<T>]
  export type AnyProps = Record<string, any>
  export type UnknownProps = Record<string, unknown>
}

export {}
