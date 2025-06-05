-- PROTEGER OS ENUMS
DO $$ BEGIN
  CREATE TYPE "StatusReserva" AS ENUM ('RESERVADA', 'CONFIRMADA', 'CANCELADA');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "TipoUsuario" AS ENUM ('ATENDENTE', 'GARCOM', 'GERENTE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- TABELA: Usuario
CREATE TABLE IF NOT EXISTS "Usuario" (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  tipo "TipoUsuario" NOT NULL
);

-- TABELA: Mesa
CREATE TABLE IF NOT EXISTS "Mesa" (
  id SERIAL PRIMARY KEY,
  numero INT NOT NULL UNIQUE
);

-- TABELA: Reserva
CREATE TABLE IF NOT EXISTS "Reserva" (
  id SERIAL PRIMARY KEY,
  "dataHora" TIMESTAMP NOT NULL,
  quantidade INT NOT NULL,
  "nomeCliente" TEXT NOT NULL,
  status "StatusReserva" NOT NULL DEFAULT 'RESERVADA',
  "mesaId" INT NOT NULL,
  "garcomId" INT,

  CONSTRAINT fk_mesa FOREIGN KEY ("mesaId") REFERENCES "Mesa"(id),
  CONSTRAINT fk_garcom FOREIGN KEY ("garcomId") REFERENCES "Usuario"(id)
);

-- INSERIR 12 MESAS (se ainda não existirem)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM "Mesa") THEN
    INSERT INTO "Mesa" (numero)
    SELECT generate_series(0, 11);
  END IF;
END $$;

-- INSERIR USUÁRIOS (se ainda não existirem)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM "Usuario") THEN
    INSERT INTO "Usuario" (nome, tipo) VALUES
      ('João', 'GERENTE'),
      ('Ana', 'GARCOM'),
      ('Carlos', 'ATENDENTE');
  END IF;
END $$;
