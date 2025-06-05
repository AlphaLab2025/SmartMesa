const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  // Cria mesas
  const mesas = Array.from({ length: 12 }, (_, i) => ({
    numero: i,
  }));

  await prisma.mesa.createMany({
    data: mesas,
    skipDuplicates: true,
  });

  // Usuários a criar
  const usuarios = [
    { nome: 'João', tipo: 'GERENTE' },
    { nome: 'Pedro', tipo: 'GARCOM' },
    { nome: 'Ana', tipo: 'GARCOM' },
    { nome: 'Felipe', tipo: 'ATENDENTE' },
  ];

  for (const usuario of usuarios) {
    const existe = await prisma.usuario.findFirst({
      where: { nome: usuario.nome, tipo: usuario.tipo },
    });

    if (!existe) {
      await prisma.usuario.create({ data: usuario });
    }
  }

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
