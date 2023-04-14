export interface GlobalError extends Error {
  status?: number
  code?: string
}

