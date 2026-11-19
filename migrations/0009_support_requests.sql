CREATE TABLE IF NOT EXISTS support_requests (
  id UUID PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  correo VARCHAR(254) NOT NULL,
  descripcion TEXT NOT NULL,
  request_key UUID NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS support_requests_created_at_idx
  ON support_requests (created_at DESC);

