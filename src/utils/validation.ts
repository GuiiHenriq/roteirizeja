import { z } from "zod";

// Esquemas de validação
export const userSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial"),
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
});

export const itinerarySchema = z.object({
  destination: z.string().min(2, "Destino deve ter no mínimo 2 caracteres"),
  departureDate: z.date(),
  returnDate: z.date(),
  interests: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(2, "Assunto deve ter no mínimo 2 caracteres"),
  message: z.string().min(10, "Mensagem deve ter no mínimo 10 caracteres"),
});

// Função de sanitização de entrada aprimorada
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/<[^>]*>/g, '') // Remove todas as tags HTML
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers inline
    .replace(/data:/gi, 'data-safe:') // Neutraliza data URIs
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\\/g, '&#x5C;')
    .trim(); // Remove espaços extras
};

// Rate limiting aprimorado
const rateLimits = new Map<string, { count: number; timestamp: number }>();

// Função para limpar entradas antigas do rate limit
const cleanupRateLimits = () => {
  const now = Date.now();
  for (const [key, value] of rateLimits.entries()) {
    // Remove entradas mais antigas que 1 hora
    if (now - value.timestamp > 3600000) {
      rateLimits.delete(key);
    }
  }
};

// Executa limpeza a cada 10 minutos
setInterval(cleanupRateLimits, 600000);

export const checkRateLimit = (key: string, limit: number, windowMs: number): boolean => {
  const now = Date.now();
  const userLimit = rateLimits.get(key);

  // Adiciona um prefixo ao key para evitar colisões
  const safeKey = `ratelimit_${key}`;

  if (!userLimit) {
    rateLimits.set(safeKey, { count: 1, timestamp: now });
    return true;
  }

  if (now - userLimit.timestamp > windowMs) {
    rateLimits.set(safeKey, { count: 1, timestamp: now });
    return true;
  }

  if (userLimit.count >= limit) {
    // Registra tentativas excessivas para monitoramento
    console.warn(`Rate limit exceeded for ${safeKey}`);
    return false;
  }

  userLimit.count += 1;
  rateLimits.set(safeKey, userLimit);
  return true;
};