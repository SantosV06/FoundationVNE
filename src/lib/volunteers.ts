export type Volunteer = {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  mensaje: string;
  fecha: string;
};

export function volunteersToCsv(rows: (Volunteer & { status?: string })[]) {
  const header = ["fecha", "nombre", "apellido", "correo", "telefono", "mensaje", "estado"];
  const escape = (value: string) => {
    let firstSignificant = 0;
    while (firstSignificant < value.length) {
      const character = value[firstSignificant] ?? "";
      const code = value.charCodeAt(firstSignificant);
      if (code > 0x1f && !/\s/u.test(character)) break;
      firstSignificant++;
    }

    const first = value[firstSignificant] ?? "";
    const safe = /^[=+@-]/u.test(first) ? `\t${value}` : value;
    return `"${safe.replaceAll('"', '""')}"`;
  };
  const lines = rows.map((row) =>
    [
      row.fecha,
      row.nombre,
      row.apellido,
      row.correo,
      row.telefono,
      row.mensaje,
      row.status ?? "pendiente",
    ]
      .map(escape)
      .join(","),
  );
  return [header.join(","), ...lines].join("\r\n");
}
