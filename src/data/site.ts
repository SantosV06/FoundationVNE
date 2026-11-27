export const org = {
  name: "Fundación Venezuela Nueva Esperanza LLC",
  short: "Fundación VNE",
  email: "info@foundationvne.com",
  supportEmail: "soporte@foundationvne.com",
  adminPhone: "+1 (347) 957 7821",
  adminTel: "+13479577821",
  executivePhone: "+1 (347) 819 5521",
  executiveTel: "+13478195521",
  zelle: "+1 (347) 819 5521",
  bank: "Citibank",
  infoWa: "https://wa.me/13479577821",
  webWa: "https://wa.me/50761628549",
  instagram: "https://www.instagram.com/fundacionv.n.e",
  addressNy: "433 Sackett St, Brooklyn, NY 11231",
  addressCcs: "Av. Andrés Bello, tercera transversal de Guaicaipuro, Quinta Raquel, Caracas 1050",
  ein: "93-4222627",
  founded: "2022",
  hours: "Lunes a viernes, 8:00 a.m. – 5:00 p.m. Fines de semana con cita previa.",
  mapNy: "https://www.google.com/maps?q=433+Sackett+St,+Brooklyn,+NY+11231&output=embed",
  mapCcs:
    "https://www.google.com/maps?q=Avenida+Andres+Bello+y+transversal+Guaicaipuro,+Caracas&output=embed",
} as const;

export const nav = [
  { to: "/", label: "Inicio" },
  { to: "/genesis", label: "Génesis" },
  { to: "/liderazgo", label: "Liderazgo" },
  { to: "/soporte", label: "Soporte" },
] as const;

export type LegalSlug = "privacidad" | "terminos" | "conflicto" | "no-discriminacion";
