export interface GlobalError extends Omit<Error, 'message'> {
  status?: number
  code?: string
  message?: string
}

