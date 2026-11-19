import { z } from "zod";

export const supportRequestSchema = z.object({
  nombre: z.string().trim().min(1, "Escribe tu nombre.").max(100),
  apellido: z.string().trim().min(1, "Escribe tu apellido.").max(100),
  correo: z.string().trim().email("Escribe un correo válido.").max(254),
  descripcion: z.string().trim().min(10, "Describe el problema con al menos 10 caracteres.").max(5000, "La descripción admite hasta 5000 caracteres."),
  requestKey: z.string().uuid(),
  turnstileToken: z.string().min(1, "Completa la verificación de seguridad.").max(2048),
  website: z.string().max(200).optional(),
});

export type SupportRequestInput = z.infer<typeof supportRequestSchema>;
export type StoredSupportRequest = Omit<SupportRequestInput, "turnstileToken" | "website">;
