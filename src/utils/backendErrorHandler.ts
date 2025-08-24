/**
 * Utility function to extract error messages from backend API responses
 * Handles different error response formats consistently
 */

export interface BackendErrorResponse {
  success?: boolean
  error?: string
  message?: string
  details?: Array<{ field: string; message: string }>
}

export interface BackendError {
  message?: string
  error?: { message?: string }
  details?: Array<{ field: string; message: string }>
}

/**
 * Extracts a user-friendly error message from a backend error response
 * @param err - The error object from catch block
 * @param defaultMessage - Default message if error parsing fails
 * @returns Formatted error message string
 */
export function extractBackendErrorMessage(
  err: unknown, 
  defaultMessage: string = 'An error occurred. Please try again.'
): string {
  if (!err || typeof err !== 'object') {
    return defaultMessage
  }

  const errorData = err as BackendError

  // Check for direct message
  if (errorData.message) {
    return errorData.message
  }

  // Check for nested error message
  if (errorData.error?.message) {
    return errorData.error.message
  }

  // Check for validation error details
  if (errorData.details && Array.isArray(errorData.details)) {
    const detailMessages = errorData.details
      .map(detail => `${detail.field}: ${detail.message}`)
      .join(', ')
    return `Validation Error: ${detailMessages}`
  }

  // Fallback to default message
  return defaultMessage
}

/**
 * Checks if the error is a validation error
 * @param err - The error object from catch block
 * @returns True if it's a validation error
 */
export function isValidationError(err: unknown): boolean {
  if (!err || typeof err !== 'object') {
    return false
  }

  const errorData = err as BackendError
  return !!(errorData.details && Array.isArray(errorData.details))
}

/**
 * Checks if the error is an authentication error
 * @param err - The error object from catch block
 * @returns True if it's an authentication error
 */
export function isAuthError(err: unknown): boolean {
  if (!err || typeof err !== 'object') {
    return false
  }

  const errorData = err as BackendError
  return errorData.error?.message?.toLowerCase().includes('auth') || 
         errorData.message?.toLowerCase().includes('unauthorized') ||
         errorData.message?.toLowerCase().includes('authentication')
}

/**
 * Checks if the error is a server error
 * @param err - The error object from catch block
 * @returns True if it's a server error
 */
export function isServerError(err: unknown): boolean {
  if (!err || typeof err !== 'object') {
    return false
  }

  const errorData = err as BackendError
  return errorData.error?.message?.toLowerCase().includes('server') ||
         errorData.message?.toLowerCase().includes('internal') ||
         errorData.message?.toLowerCase().includes('server')
}
