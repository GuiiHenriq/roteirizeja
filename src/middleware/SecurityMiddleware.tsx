// Middleware function to add security headers
export function addSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  
  // Previne clickjacking
  headers.set('X-Frame-Options', 'DENY');
  
  // Habilita proteção XSS no navegador
  headers.set('X-XSS-Protection', '1; mode=block');
  
  // Previne MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');
  
  // Controle de referência
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

// Helper function to create a middleware that can be used with fetch
export function createSecurityMiddleware() {
  return async (request: Request) => {
    try {
      const response = await fetch(request);
      return addSecurityHeaders(response);
    } catch (error) {
      console.error('Security middleware error:', error);
      throw error;
    }
  };
}