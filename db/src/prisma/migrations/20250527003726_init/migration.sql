-- CreateEnum
CREATE TYPE "StatusReserva" AS ENUM ('RESERVADA', 'CONFIRMADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ATENDENTE', 'GARCOM', 'GERENTE');

-- CreateTable
CREATE TABLE "Mesa" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,

    CONSTRAINT "Mesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "status" "StatusReserva" NOT NULL DEFAULT 'RESERVADA',
    "mesaId" INTEGER NOT NULL,
    "garcomId" INTEGER,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoUsuario" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mesa_numero_key" ON "Mesa"("numero");

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES "Mesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_garcomId_fkey" FOREIGN KEY ("garcomId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
