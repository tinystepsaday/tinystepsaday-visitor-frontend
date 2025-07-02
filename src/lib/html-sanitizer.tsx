/**
 * Simple HTML sanitizer for safe rendering of rich text content
 * This is a basic implementation - in production, consider using a library like DOMPurify
 */

export function sanitizeHtml(html: string): string {
  if (!html) return '';

  // Basic tag filtering - in production, use a proper HTML sanitizer
  let sanitized = html;
  
  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  // Remove javascript: URLs
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Remove data: URLs (except for images)
  sanitized = sanitized.replace(/data:(?!image\/)/gi, '');
  
  return sanitized;
}

/**
 * Wrapper component for safely rendering HTML content
 * Usage: <SafeHtml content={career.content} />
 */
export function SafeHtml({ content, className = "" }: { content: string; className?: string }) {
  const sanitizedContent = sanitizeHtml(content);
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
} 