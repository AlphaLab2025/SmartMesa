const prisma = require('../model/prisma');





exports.confirmarReserva = async (req, res) => {
  const { id, idgarcom } = req.body;

  if (!id || !idgarcom) {
    return res.status(400).json({ mensagem: 'Parâmetros "id" e "confirmacao" são obrigatórios.' });
  }

  try {
    const reservaExistente = await prisma.reserva.findUnique({
      where: { id: parseInt(id) },
    });

    if (!reservaExistente || reservaExistente.status !== 'RESERVADA') {
      return res.status(400).json({ mensagem: 'Reserva não encontrada ou já confirmada.' });
    }

    const reserva = await prisma.reserva.update({
      where: { id: parseInt(id) },
      data: {
        status: 'CONFIRMADA',
        garcom: {
          connect: { id: parseInt(idgarcom) },
        },
      },
    });

    res.json({ mensagem: 'Reserva confirmada com sucesso.', reserva });
  } catch (err) {
    console.error('Erro ao confirmar reserva:', err);
    res.status(500).json({ mensagem: 'Erro ao confirmar reserva.', erro: err.message });
  }
};

