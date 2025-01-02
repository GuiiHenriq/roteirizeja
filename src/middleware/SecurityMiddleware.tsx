import { NextResponse } from 'next/server';

export function SecurityMiddleware(response: NextResponse) {
  // Security Headers
  const headers = response.headers;
  
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
  
  return response;
}