const prisma = require('../model/prisma');



exports.listarMesas = async (req, res) => {
  try {
    const mesas = await prisma.mesa.findMany({
      include: {
        reservas: true, 
      },
      orderBy: { numero: 'asc' },
    });

    res.json(mesas);
  } catch (err) {
    console.error('Erro ao listar mesas:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar mesas.', erro: err.message });
  }
};

