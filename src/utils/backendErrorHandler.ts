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
  success?: boolean
  error?: string
  message?: string
  statusCode?: number
  timestamp?: string
  path?: string
  details?: Record<string, string> | Array<{ field: string; message: string }>
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

  // Check for direct message (most common case)
  if (errorData.message) {
    return errorData.message
  }

  // Check for error field (backend format)
  if (errorData.error) {
    return errorData.error
  }

  // Check for validation error details
  if (errorData.details) {
    if (Array.isArray(errorData.details)) {
      // Array format: [{ field: string, message: string }]
      const detailMessages = errorData.details
        .map(detail => `${detail.field}: ${detail.message}`)
        .join(', ')
      return `Validation Error: ${detailMessages}`
    } else if (typeof errorData.details === 'object') {
      // Object format: Record<string, string>
      const detailMessages = Object.entries(errorData.details)
        .map(([field, message]) => `${field}: ${message}`)
        .join(', ')
      return `Validation Error: ${detailMessages}`
    }
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
  return (errorData.error?.toLowerCase().includes('auth') ?? false) || 
         (errorData.message?.toLowerCase().includes('unauthorized') ?? false) ||
         (errorData.message?.toLowerCase().includes('authentication') ?? false)
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
  return (errorData.error?.toLowerCase().includes('server') ?? false) ||
         (errorData.message?.toLowerCase().includes('internal') ?? false) ||
         (errorData.message?.toLowerCase().includes('server') ?? false)
}
