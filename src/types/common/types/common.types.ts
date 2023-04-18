import { GlobalError } from '../common.index.js'

export type ErrorInfo = Pick<GlobalError, 'message' | 'code'>
