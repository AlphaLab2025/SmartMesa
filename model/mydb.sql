-- ENUMS
CREATE TYPE "StatusReserva" AS ENUM ('RESERVADA', 'CONFIRMADA', 'CANCELADA');
CREATE TYPE "TipoUsuario" AS ENUM ('ATENDENTE', 'GARCOM', 'GERENTE');

-- TABELA: Usuario
CREATE TABLE "Usuario" (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  tipo "TipoUsuario" NOT NULL
);

-- TABELA: Mesa
CREATE TABLE "Mesa" (
  id SERIAL PRIMARY KEY,
  numero INT NOT NULL UNIQUE
);

-- TABELA: Reserva
CREATE TABLE "Reserva" (
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

-- INSERIR 12 MESAS (números de 0 a 11)
INSERT INTO "Mesa" (numero)
SELECT generate_series(0, 11);

-- INSERIR USUÁRIOS (1 gerente, 1 garçom, 1 atendente)
INSERT INTO "Usuario" (nome, tipo) VALUES
  ('João', 'GERENTE'),
  ('Ana', 'GARCOM'),
  ('Carlos', 'ATENDENTE');
