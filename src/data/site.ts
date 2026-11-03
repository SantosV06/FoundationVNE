export const org = {
  name: "Fundación Venezuela Nueva Esperanza LLC",
  short: "Fundación VNE",
  email: "info@foundationvne.com",
  adminPhone: "+1 (347) 957 7821",
  adminTel: "+13479577821",
  executivePhone: "+1 (347) 819 5521",
  executiveTel: "+13478195521",
  zelle: "+1 (347) 819 5521",
  bank: "Citibank",
  infoWa: "https://wa.me/13479577821",
  webWa: "https://wa.me/50762305711",
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
  { to: "/casas", label: "Casas VNE" },
  { to: "/genesis", label: "Génesis" },
  { to: "/punto-de-comida", label: "Restaurante" },
  { to: "/construccion", label: "Construcción" },
  { to: "/liderazgo", label: "Liderazgo" },
  { to: "/soporte", label: "Soporte" },
] as const;

export type LegalSlug = "privacidad" | "terminos" | "conflicto" | "no-discriminacion";

export const legalPages: Record<
  LegalSlug,
  {
    title: string;
    description: string;
    blocks: { heading?: string; paragraphs: string[]; list?: string[] }[];
  }
> = {
  privacidad: {
    title: "Política de privacidad",
    description: "Qué datos trata el sitio de Fundación VNE y cómo contactarnos.",
    blocks: [
      {
        paragraphs: [
          "Fundación Venezuela Nueva Esperanza LLC (Fundación VNE) trata los datos que usted envía en este sitio y los registros técnicos necesarios para operarlo.",
        ],
      },
      {
        heading: "Datos",
        paragraphs: ["Podemos guardar:"],
        list: [
          "Nombre, correo, teléfono y el texto de formularios o mensajes.",
          "Registros técnicos: IP, fecha y datos del navegador, para seguridad y disponibilidad.",
          "Sesión del personal que entra al panel.",
          "Idioma y tema, guardados en el navegador.",
        ],
      },
      {
        heading: "Uso",
        paragraphs: [
          "Los usamos para responder, gestionar solicitudes, operar el sitio y prevenir abuso. No vendemos datos personales.",
        ],
      },
      {
        heading: "Terceros",
        paragraphs: [
          "El alojamiento y la base de datos pueden estar en Vercel y Neon. El formulario puede usar Cloudflare Turnstile. El sitio mide tráfico con Vercel Analytics y Speed Insights.",
          "WhatsApp, Instagram, mapas, Zelle y Citibank son servicios externos. El número de tarjeta lo pide Citibank, no este sitio. El sitio puede enviar monto, nombre y correo para abrir ese cobro, y no los guarda.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [
          "Para pedir acceso, corrección o eliminación: info@foundationvne.com.",
          "Última actualización: 3 de noviembre de 2026.",
        ],
      },
    ],
  },
  terminos: {
    title: "Términos y condiciones",
    description: "Condiciones de uso del sitio de Fundación VNE.",
    blocks: [
      {
        paragraphs: [
          "Al usar este sitio acepta estas condiciones. Fundación Venezuela Nueva Esperanza LLC es una sociedad de responsabilidad limitada registrada en Nueva York. La información publicada es general y no es asesoría legal ni financiera.",
        ],
      },
      {
        heading: "Uso",
        paragraphs: [
          "El uso debe ser lícito. No copie el contenido sin autorización. Enviar un formulario no crea un contrato ni una relación laboral.",
        ],
      },
      {
        heading: "Donaciones",
        paragraphs: [
          "Son voluntarias. Zelle se hace desde el banco del donante. La tarjeta, si Citibank habilita el cobro, se paga en la página del banco. Este sitio no guarda el número de tarjeta ni emite un comprobante fiscal. El dinero va a los programas de la fundación.",
        ],
      },
      {
        heading: "Ley",
        paragraphs: ["Rigen las leyes del Estado de Nueva York.", "Última actualización: 3 de noviembre de 2026."],
      },
    ],
  },
  conflicto: {
    title: "Política de conflicto de intereses",
    description: "Regla de conflicto de intereses de Fundación VNE.",
    blocks: [
      {
        paragraphs: [
          "Quienes deciden por la fundación deben actuar en su interés y declarar conflictos personales, familiares o comerciales.",
        ],
      },
      {
        heading: "Qué se hace",
        paragraphs: ["La persona se abstiene de esa decisión. El conflicto se documenta."],
      },
    ],
  },
  "no-discriminacion": {
    title: "Política de no discriminación",
    description: "Regla de no discriminación de Fundación VNE.",
    blocks: [
      {
        paragraphs: [
          "La fundación no discrimina por raza, color, origen, género, identidad de género, orientación sexual, religión, edad, discapacidad, estado civil, condición de veterano u otra característica protegida por la ley.",
          "Aplica a empleo, servicios, alianzas, programas y gobernanza.",
        ],
      },
    ],
  },
};

export const legalLinks: { to: string; label: string; slug: LegalSlug }[] = [
  { to: "/legal/privacidad", label: "Política de privacidad", slug: "privacidad" },
  { to: "/legal/terminos", label: "Términos y condiciones", slug: "terminos" },
  { to: "/legal/conflicto", label: "Conflicto de intereses", slug: "conflicto" },
  { to: "/legal/no-discriminacion", label: "No discriminación", slug: "no-discriminacion" },
];
