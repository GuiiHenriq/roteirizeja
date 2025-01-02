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

// Função de sanitização de entrada
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove tags HTML
    .trim(); // Remove espaços extras
};

// Rate limiting simples
const rateLimits = new Map<string, { count: number; timestamp: number }>();

export const checkRateLimit = (key: string, limit: number, windowMs: number): boolean => {
  const now = Date.now();
  const userLimit = rateLimits.get(key);

  if (!userLimit) {
    rateLimits.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (now - userLimit.timestamp > windowMs) {
    rateLimits.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count += 1;
  rateLimits.set(key, userLimit);
  return true;
};