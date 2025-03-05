import React from 'react';
// As funções checkRateLimit e sanitizeInput foram movidas para utils/validation.ts
// Importe-as de lá quando necessário

// Security headers middleware
export const addSecurityHeaders = (response: Response): Response => {
  const headers = new Headers(response.headers);
  
  // Prevent clickjacking
  headers.set('X-Frame-Options', 'DENY');
  
  // Enable XSS protection
  headers.set('X-XSS-Protection', '1; mode=block');
  
  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');
  
  // Referrer policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy - Versão mais restritiva
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co; " +
    "frame-ancestors 'none'; " +
    "form-action 'self'; " +
    "base-uri 'self'; " +
    "object-src 'none';"
  );

  // HSTS
  headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // Permissions Policy
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self), payment=()'
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};

// Error boundary component
export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = React.useState(false);
  const [errorInfo, setErrorInfo] = React.useState<string>('');

  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Error caught by boundary:', error);
      setHasError(true);
      setErrorInfo(error.message || 'Um erro desconhecido ocorreu');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Algo deu errado</h2>
          <p className="text-muted-foreground mb-4">
            Pedimos desculpas pelo inconveniente. Por favor, tente novamente mais tarde.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-sm rounded">
              {errorInfo}
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Recarregar página
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Request timeout wrapper
export const withTimeout = async <T,>(
  promise: Promise<T> | { then: (onfulfilled: (value: T) => void) => void },
  timeoutMs: number = 10000
): Promise<T> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  return Promise.race([Promise.resolve(promise), timeoutPromise]);
};