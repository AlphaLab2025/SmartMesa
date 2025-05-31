const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  // Cria mesas de 1 a 12
  const mesas = Array.from({ length: 12 }, (_, i) => ({
    numero: i,
  }));

  await prisma.mesa.createMany({
    data: mesas,
    skipDuplicates: true, // evita erro se já existirem
  });

  // Cria usuários
  await prisma.usuario.createMany({
    data: [
      {
        nome: 'Gerente João',
        tipo: 'GERENTE',
      },
      {
        nome: 'Garçom Pedro',
        tipo: 'GARCOM',
      },
      {
        nome: 'Garçom Ana',
        tipo: 'GARCOM',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Mesas e usuários criados com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
