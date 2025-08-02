/**
 * Environment variable validation utility
 */

export interface EnvValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate required environment variables for Google OAuth
 */
export function validateGoogleOAuthEnv(): EnvValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required environment variables
  const requiredVars = {
    'NEXT_PUBLIC_GOOGLE_CLIENT_ID': process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    'NEXT_PUBLIC_API_URL': process.env.NEXT_PUBLIC_API_URL,
  };

  // Check required variables
  Object.entries(requiredVars).forEach(([key, value]) => {
    if (!value) {
      errors.push(`${key} is not set`);
    } else if (value === 'your_google_client_id_here' || value.includes('your_')) {
      errors.push(`${key} is set to placeholder value. Please set a real value.`);
    }
  });

  // Check API URL format
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl && !apiUrl.startsWith('http')) {
    errors.push('NEXT_PUBLIC_API_URL must start with http:// or https://');
  }

  // Check Google Client ID format (should be a long string)
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (googleClientId && googleClientId.length < 20) {
    warnings.push('NEXT_PUBLIC_GOOGLE_CLIENT_ID seems too short. Please verify it\'s correct.');
  }

  // Development warnings
  if (process.env.NODE_ENV === 'development') {
    if (!apiUrl?.includes('localhost')) {
      warnings.push('In development, NEXT_PUBLIC_API_URL should point to localhost');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Log environment validation results
 */
export function logEnvValidation(): void {
  if (typeof window === 'undefined') return; // Only run in browser

  const validation = validateGoogleOAuthEnv();
  
  console.group('🔧 Environment Variables Validation');
  
  if (validation.isValid) {
    console.log('✅ All required environment variables are set');
  } else {
    console.error('❌ Environment validation failed:');
    validation.errors.forEach(error => console.error(`  - ${error}`));
  }
  
  if (validation.warnings.length > 0) {
    console.warn('⚠️  Warnings:');
    validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
  }
  
  console.groupEnd();
}

/**
 * Get environment variable with fallback
 */
export function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value && fallback) {
    console.warn(`⚠️  ${key} not set, using fallback: ${fallback}`);
    return fallback;
  }
  return value || '';
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
} 