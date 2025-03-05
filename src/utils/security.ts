/**
 * Utilitários de segurança para a aplicação
 */

// Gera um token CSRF para proteção contra ataques CSRF
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Armazena o token CSRF no localStorage
export const storeCSRFToken = (token: string): void => {
  localStorage.setItem('csrf_token', token);
};

// Recupera o token CSRF do localStorage
export const getCSRFToken = (): string | null => {
  return localStorage.getItem('csrf_token');
};

// Verifica se o token CSRF é válido
export const validateCSRFToken = (token: string): boolean => {
  const storedToken = getCSRFToken();
  return storedToken === token;
};

// Inicializa o token CSRF se não existir
export const initCSRFProtection = (): string => {
  let token = getCSRFToken();
  if (!token) {
    token = generateCSRFToken();
    storeCSRFToken(token);
  }
  return token;
};

// Adiciona o token CSRF a um objeto de dados
export const addCSRFToken = <T extends Record<string, any>>(data: T): T & { csrf_token: string } => {
  const token = getCSRFToken() || initCSRFProtection();
  return {
    ...data,
    csrf_token: token
  };
};

// Limpa o token CSRF (útil para logout)
export const clearCSRFToken = (): void => {
  localStorage.removeItem('csrf_token');
}; 