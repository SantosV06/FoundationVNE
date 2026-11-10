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
    description:
      "Aviso de privacidad de Fundación Venezuela Nueva Esperanza LLC: qué datos recoge el sitio, para qué, quién más interviene y cómo pedir acceso, corrección o eliminación.",
    blocks: [
      {
        heading: "Responsable",
        paragraphs: [
          "El responsable del sitio es Fundación Venezuela Nueva Esperanza LLC (Fundación VNE), sociedad de responsabilidad limitada registrada en el Estado de Nueva York, EIN 93-4222627.",
          "Domicilio en Estados Unidos: 433 Sackett St, Brooklyn, NY 11231. Sede en Caracas: Av. Andrés Bello, tercera transversal de Guaicaipuro, Quinta Raquel, Caracas 1050.",
          "Las consultas sobre datos personales se atienden en info@foundationvne.com.",
        ],
      },
      {
        heading: "Ámbito",
        paragraphs: [
          "Este aviso aplica a foundationvne.com y a las vistas que la fundación opera con el mismo contenido. No aplica a WhatsApp, Instagram, Google Maps, Zelle ni Citibank: al salir de este sitio, rigen las condiciones de ese servicio.",
        ],
      },
      {
        heading: "Datos",
        paragraphs: [
          "Tratamos los datos que usted envía y los registros técnicos necesarios para operar, asegurar y medir el sitio. No pedimos número de tarjeta, cuenta bancaria ni documento de identidad.",
        ],
      },
      {
        heading: "Datos que usted envía",
        paragraphs: ["Cuando escribe o completa un formulario, podemos recibir:"],
        list: [
          "Nombre, correo, teléfono y el país o código que elija en el formulario.",
          "El texto de la consulta o de la solicitud de voluntariado, incluidas las opciones que marque.",
          "El idioma y el tema de color, si los guarda en el navegador. Esa preferencia permanece en su dispositivo.",
        ],
      },
      {
        heading: "Datos del uso del sitio",
        paragraphs: ["El funcionamiento del sitio puede generar:"],
        list: [
          "Registros de seguridad y disponibilidad: dirección IP, fecha, hora y datos del navegador o del dispositivo.",
          "Medición de visitas con Vercel Analytics y Speed Insights.",
          "La sesión del personal que entra al panel de solicitudes. Esa sesión no es pública.",
          "El resultado de Cloudflare Turnstile en el formulario de voluntariado, solo para distinguir un envío de una persona de uno automático. No guardamos ese comprobante.",
        ],
      },
      {
        heading: "Finalidades",
        paragraphs: ["Usamos esos datos para:"],
        list: [
          "Responder consultas y revisar solicitudes de voluntariado.",
          "Avisar al equipo cuando entra una solicitud y llevar el panel interno.",
          "Mantener el sitio disponible, corregir fallos y limitar abuso o envíos automatizados.",
          "Recordar el idioma y el tema en el navegador.",
          "Abrir un cobro en Citibank si usted inicia una donación con tarjeta. Pueden transmitirse el monto, el nombre y el correo. Este sitio no los guarda y no ve el número de la tarjeta.",
        ],
      },
      {
        paragraphs: ["No vendemos datos personales ni los cedemos para publicidad de terceros."],
      },
      {
        heading: "Base del tratamiento",
        paragraphs: [
          "La consulta o la solicitud se trata porque usted la envía para que la fundación la revise. La seguridad, la medición y los registros técnicos se tratan para operar el sitio.",
          "Puede pedir que dejemos de usar una solicitud escribiendo a info@foundationvne.com. Eso no borra un registro que haya que conservar por una obligación legal, una disputa o una revisión de seguridad.",
        ],
      },
      {
        heading: "Encargados y terceros",
        paragraphs: [
          "El sitio se aloja en Vercel y la base de datos está en Neon. El correo de avisos, cuando está configurado, sale por Brevo. Esos proveedores tratan datos por cuenta de la fundación, para prestar el servicio contratado.",
          "WhatsApp, Instagram, Google Maps, Zelle y Citibank no operan este sitio. Si usted los abre, la información que entregue la trata ese servicio conforme a sus propias reglas.",
        ],
      },
      {
        heading: "Conservación",
        paragraphs: [
          "Las solicitudes y los mensajes se conservan el tiempo necesario para responder, administrar el programa y dejar constancia de lo tratado. No se publica un plazo único de borrado: la eliminación definitiva de solicitudes ya descartadas solo se ejecuta cuando la fundación aprueba el período y el procedimiento.",
          "Los registros de los proveedores y las copias de seguridad siguen el plazo de cada servicio. Una solicitud de eliminación no alcanza, por sí sola, lo que haya que conservar por ley, por una disputa o por una investigación de seguridad.",
        ],
      },
      {
        heading: "Seguridad",
        paragraphs: [
          "El panel exige cuenta de personal, contraseña y un segundo factor. La sesión se guarda de modo que el identificador no quede en claro, y el formulario de voluntariado comprueba que la petición venga de este sitio.",
          "Ningún sitio puede asegurar la ausencia de incidentes. Si observa un uso indebido de sus datos, escriba a info@foundationvne.com. Los reportes de vulnerabilidad del código se atienden en ese mismo correo.",
        ],
      },
      {
        heading: "Sus solicitudes",
        paragraphs: [
          "Puede pedir acceso, una copia, la corrección o la eliminación de los datos que nos haya enviado, u oponerse a que sigamos usándolos para responderle.",
          "Escriba a info@foundationvne.com desde el correo usado en el sitio, o indíquelo en el mensaje, para no abrir el expediente de otra persona. Si la identidad no queda clara, podemos pedir un dato más. Respondemos en un plazo razonable.",
          "Este aviso no impide acudir a la autoridad de protección de datos que corresponda a su residencia.",
        ],
      },
      {
        heading: "Menores",
        paragraphs: [
          "El sitio no está dirigido a menores de 13 años y no solicitamos sus datos a sabiendas. Si un padre, una madre o un tutor cree que un menor nos escribió, puede pedir la eliminación en info@foundationvne.com.",
        ],
      },
      {
        heading: "Cambios",
        paragraphs: [
          "Si este aviso cambia en algo relevante, se actualiza la fecha y el texto vigente queda en esta misma página.",
          "Última actualización: 10 de noviembre de 2026.",
        ],
      },
    ],
  },
  terminos: {
    title: "Términos y condiciones",
    description:
      "Condiciones de uso del sitio de Fundación Venezuela Nueva Esperanza LLC: identidad, uso permitido, donaciones, propiedad del contenido y ley aplicable.",
    blocks: [
      {
        heading: "Identidad y aceptación",
        paragraphs: [
          "Estas condiciones regulan el uso de foundationvne.com. Entrar, leer o enviar un formulario implica aceptarlas. Si no está de acuerdo, no use el sitio.",
          "Lo opera Fundación Venezuela Nueva Esperanza LLC, sociedad de responsabilidad limitada registrada en el Estado de Nueva York, EIN 93-4222627, con domicilio en 433 Sackett St, Brooklyn, NY 11231.",
          "Lo publicado sobre programas, sedes y personas es información institucional. No es asesoría legal, fiscal, migratoria ni financiera, ni una oferta de inversión, de empleo o de plaza en un programa.",
        ],
      },
      {
        heading: "Uso permitido",
        paragraphs: [
          "El uso debe ser lícito y no debe interferir en el sitio, en los datos de otras personas ni en los sistemas que lo alojan.",
          "Queda prohibido:",
        ],
        list: [
          "Enviar datos falsos, datos de otra persona sin autorización o contenido ilícito.",
          "Intentar entrar al panel, a una cuenta o a datos que no le correspondan.",
          "Automatizar envíos, extraer el sitio de forma masiva o eludir las comprobaciones de seguridad.",
          "Usar el emblema, los textos o las fotografías de la fundación con fines comerciales sin autorización escrita.",
        ],
      },
      {
        paragraphs: [
          "Enviar el formulario de voluntariado no crea contrato, relación laboral, plaza ni deber de admitirle. La fundación puede pedir más datos, no continuar o cerrar la solicitud.",
        ],
      },
      {
        heading: "Propiedad del contenido",
        paragraphs: [
          "Los textos, el emblema, las fotografías y la organización del sitio pertenecen a la fundación o se usan con permiso. Puede compartir el enlace. Cualquier otro uso requiere autorización escrita a info@foundationvne.com.",
        ],
      },
      {
        heading: "Donaciones",
        paragraphs: [
          "Las donaciones son voluntarias. No compran un bien, un servicio ni un cupo en un programa.",
          "Zelle se ordena en la aplicación o en el banco del donante, con el número que el sitio publica. Esta página no recibe ni guarda esa transferencia.",
          "El pago con tarjeta, cuando Citibank lo habilite, se completa en la página del banco. Este sitio no pide ni guarda el número de tarjeta, la fecha de vencimiento ni el código de seguridad. Hasta que esa pasarela esté disponible, no hay cobro con tarjeta desde aquí.",
          "Desde este sitio la fundación no emite un comprobante fiscal ni afirma que el aporte sea deducible. Un recibo, si corresponde, se tramita aparte y no se presume.",
          "Los fondos se destinan a los programas publicados, en particular Casas VNE y Proyecto Génesis, salvo una restricción legal o un acuerdo escrito en otro sentido. Un aporte sin restricción puede reasignarse dentro de esos fines.",
        ],
      },
      {
        heading: "Disponibilidad y responsabilidad",
        paragraphs: [
          "El sitio se ofrece tal como está. Puede haber interrupciones, errores de traducción o cambios de contenido. La fundación no responde por decisiones tomadas únicamente con lo publicado aquí, ni por fallos de WhatsApp, Instagram, mapas, Zelle, Citibank o del banco del usuario.",
          "En la medida en que lo permita la ley del Estado de Nueva York, la responsabilidad por el uso de este sitio se limita al daño directo. No cubre lucro cesante ni daños indirectos derivados de usar el sitio o de no poder usarlo.",
        ],
      },
      {
        heading: "Enlaces externos",
        paragraphs: [
          "Los enlaces a otros servicios sirven para el contacto o para donar. La fundación no controla esas páginas y no responde por su contenido ni por sus condiciones.",
        ],
      },
      {
        heading: "Ley y vigencia",
        paragraphs: [
          "Estas condiciones se rigen por las leyes del Estado de Nueva York, sin aplicar las normas de conflicto de leyes de ese estado. Las disputas sobre el sitio corresponden a los tribunales estatales o federales con sede en el condado de Kings, Nueva York, salvo una norma imperativa que fije otro fuero.",
          "Si una cláusula se declara inválida, el resto sigue en vigor. No ejercer un derecho no equivale a renunciarlo.",
          "La versión en español es la de referencia. El inglés y el portugués se publican para facilitar la lectura.",
          "Última actualización: 10 de noviembre de 2026.",
          "Consultas sobre estas condiciones: info@foundationvne.com.",
        ],
      },
    ],
  },
  conflicto: {
    title: "Política de conflicto de intereses",
    description:
      "Reglas de Fundación VNE para declarar y apartarse de un interés personal, familiar o comercial que pueda influir en una decisión.",
    blocks: [
      {
        heading: "A quién obliga",
        paragraphs: [
          "Obliga a quienes dirigen, administran o deciden por Fundación Venezuela Nueva Esperanza LLC: la dirección, el personal con autoridad sobre gastos, convenios, contrataciones o programas, y los voluntarios cuando participan en esa decisión.",
          "El interés de la fundación prevalece. Hay conflicto cuando la persona, un familiar cercano o una sociedad en la que participe puede ganar o perder con la decisión, o cuando un tercero razonable vería afectado el juicio de quien decide.",
        ],
      },
      {
        heading: "Qué debe declararse",
        paragraphs: [
          "Antes de deliberar, la persona informa por escrito al resto de quienes deciden:",
        ],
        list: [
          "Una relación laboral, comercial o de propiedad con un proveedor, donante, aliado o beneficiario que esté en discusión.",
          "Un beneficio económico directo o indirecto, incluido un contrato, un encargo o el uso de bienes de la fundación.",
          "El parentesco o una relación estrecha con quien recibiría el beneficio.",
          "Cualquier otro hecho que, de no decirse, dejaría incompleta la información de quien decide.",
        ],
      },
      {
        heading: "Qué se hace",
        paragraphs: [
          "La persona se abstiene de votar, negociar y supervisar ese asunto. Puede exponer hechos si se lo piden y, una vez hecho, queda fuera de la decisión. Resuelven quienes no tienen el conflicto.",
          "La abstención y el motivo quedan anotados, solo con los datos personales necesarios para entender el acuerdo.",
          "Un regalo, una invitación o un favor de quien contrata con la fundación o recibe fondos de ella se declara cuando supera una atención ordinaria. No se acepta nada que condicione una decisión.",
          "No se contrata ni se entrega un recurso de la fundación a una persona relacionada sin declaración previa, sin la abstención de quien tiene el interés y sin dejar constancia del criterio aplicado.",
          "Incumplir esta política puede llevar a retirar la función, el acceso al panel o la relación con la fundación, sin perjuicio de lo que disponga la ley.",
          "Las dudas y las denuncias se envían a info@foundationvne.com. Quien informa de buena fe no sufre represalia por hacerlo.",
          "Última actualización: 10 de noviembre de 2026.",
        ],
      },
    ],
  },
  "no-discriminacion": {
    title: "Política de no discriminación",
    description:
      "Regla de Fundación VNE sobre igualdad de trato en el empleo, el voluntariado, los programas, las alianzas y la atención por el sitio.",
    blocks: [
      {
        heading: "Igualdad de trato",
        paragraphs: [
          "Fundación Venezuela Nueva Esperanza LLC no discrimina, ni admite que se discrimine, por raza, color, origen nacional, etnia, idioma, sexo, género, identidad o expresión de género, orientación sexual, religión, edad, discapacidad, estado civil, embarazo, información genética, condición de veterano, ni por otra característica protegida por la ley federal, por la del Estado de Nueva York o por la que resulte aplicable.",
          "La regla cubre el empleo y la contratación, el voluntariado, el ingreso y la permanencia en los programas, las alianzas, la atención por este sitio y la gobernanza.",
        ],
      },
      {
        heading: "Requisitos de un programa",
        paragraphs: [
          "El cupo, la sede, el oficio, el idioma de trabajo o un requisito legal se aplican por igual y se explican cuando alguien los pide. Un requisito de la tarea no se usa para excluir a una persona por una característica protegida.",
        ],
      },
      {
        heading: "Ajustes",
        paragraphs: [
          "Quien necesite un ajuste para participar en un programa o en una selección puede decirlo en la solicitud o escribir a info@foundationvne.com. La fundación lo revisa caso por caso, dentro de lo que la operación permita y de lo que la ley exija.",
        ],
      },
      {
        heading: "Quejas",
        paragraphs: [
          "Una queja se envía a info@foundationvne.com con los hechos, las fechas y, si se conocen, los nombres de quienes intervinieron. La fundación acusa recibo, revisa lo ocurrido y toma una medida proporcionada.",
          "Quien presenta la queja de buena fe, o quien colabora en la revisión, no sufre represalia por ello.",
          "Esta política no crea un derecho distinto del que ya reconoce la ley ni cierra una vía administrativa o judicial.",
          "Última actualización: 10 de noviembre de 2026.",
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
