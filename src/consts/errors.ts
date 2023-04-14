import { ErrorType } from '../types/index.js'

type ValidationErrors = {
  [key: string]: ErrorType
}

type Length = {
  min: number,
  max: number
}

export const errors = {
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: 'User with the specified email was not found.'
  },
  INCORRECT_CREDENTIALS: {
    code: 'INCORRECT_CREDENTIALS',
    message: 'The password you entered is incorrect.'
  },
  BODY_IS_NOT_DEFINED: {
    code: 'BODY_IS_NOT_DEFINED',
    message: 'request body should not be null or undefined'
  },
  FIELD_IS_NOT_DEFINED: (field: string) => ({
    code: 'FIELD_IS_NOT_DEFINED',
    message: `${field} should not be null or undefined`
  }),
  FIELD_IS_NOT_OF_PROPER_TYPE: (field: string, type: string) => ({
    code: 'FIELD_IS_NOT_OF_PROPER_TYPE',
    message: `${field} should be of type ${type}`
  }),
  FIELD_IS_NOT_OF_PROPER_LENGTH: (field: string, length: Length) => ({
    code: 'FIELD_IS_NOT_OF_PROPER_LENGTH',
    message: `${field} cannot be shorter than ${length.min} and longer than ${length.max} characters.`
  }),
  NAME_FIELD_IS_NOT_OF_PROPER_FORMAT: (field: string) => ({
    code: 'NAME_NOT_VALID',
    message: `${field} can contain alphabetic characters only.`
  }),
  FIELD_IS_NOT_OF_PROPER_FORMAT: (field: string) => validationErrors[field],
  ALREADY_REGISTERED: {
    code: 'ALREADY_REGISTERED',
    message: 'User with the specified email already exists.'
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'The requested URL was not found.'
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    message: 'You do not have permission to perform this action.'
  },
  BAD_CONFIRM_TOKEN: {
    code: 'BAD_CONFIRM_TOKEN',
    message: 'The confirm token is either invalid or has expired.'
  },
  BAD_REFRESH_TOKEN: {
    code: 'BAD_REFRESH_TOKEN',
    message: 'The refresh token is either invalid or has expired.'
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'The requested URL requires user authorization.'
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR'
  },
  TEMPLATE_NOT_FOUND: {
    code: 'TEMPLATE_NOT_FOUND',
    message: 'The requested template was not found.'
  },
  BAD_RESET_TOKEN: {
    code: 'BAD_RESET_TOKEN',
    message: 'The reset token is either invalid or has expired.'
  },
  INVALID_TOKEN_NAME: {
    code: 'INVALID_TOKEN_NAME',
    message: 'The token name you used is invalid.'
  },
  INVALID_ID: {
    code: 'INVALID_ID',
    message: 'ID is invalid.'
  },
  API_TOKEN_NOT_RETRIEVED: {
    code: 'API_TOKEN_NOT_RETRIEVED',
    message: 'The access token has not been retrieved.'
  },
  FIELD_CANNOT_BE_EMPTY: (field: string) => `The ${field} field cannot be empty.`,
  DOCUMENT_ALREADY_EXISTS: (uniqueFields: string) => ({
    code: 'DOCUMENT_ALREADY_EXISTS',
    message: `${uniqueFields} fields must be unique.`
  }),
  DB_SERVER_ERROR: (message: string) => ({
    code: 'DB_SERVER_ERROR',
    message: message
  }),
  VALIDATION_ERROR: (message: string) => ({
    code: 'VALIDATION_ERROR',
    message: message
  })
}

const validationErrors: ValidationErrors = {
  email: {
    code: 'EMAIL_NOT_VALID',
    message: 'Email should be of the following format: “local-part@domain.com”.'
  },
  password: {
    code: 'PASSWORD_NOT_VALID',
    message: 'Password must contain at least one alphabetic and one numeric character.'
  },
  name: errors.NAME_FIELD_IS_NOT_OF_PROPER_FORMAT('name')
}
