const prisma = require('../model/prisma');


exports.criarReserva = async (req, res) => {
  const { data, hora, mesa, quant_pessoa, responsavel } = req.body;

  if (!data || !hora || !mesa || !quant_pessoa || !responsavel) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    const dataHora = new Date(`${data}T${hora}`);

    const reservaExistente = await prisma.reserva.findFirst({
      where: {
        mesaId: parseInt(mesa),
        dataHora: dataHora,
        status: 'RESERVADA',
      },
    });

    if (reservaExistente) {
      return res.status(400).json({ erro: 'Mesa já reservada nesse horário.' });
    }

    const novaReserva = await prisma.reserva.create({
      data: {
        dataHora: dataHora,
        quantidade: parseInt(quant_pessoa),
        nomeCliente: responsavel,
        mesa: {
          connect: { id: parseInt(mesa) },
        },
      },
    });

    res.json({ mensagem: 'Reserva criada com sucesso.', id: novaReserva.id });

  } catch (err) {
    console.error('Erro ao criar reserva:', err);
    res.status(500).json({ erro: 'Erro ao criar reserva.' });
  }
};



exports.cancelarReserva = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ erro: 'ID da reserva é obrigatório.' });
  }

  try {
    const result = await prisma.reserva.updateMany({
      where: {
        id: parseInt(id),
        status: 'RESERVADA',
      },
      data: {
        status: 'CANCELADA',
      },
    });

    if (result.count === 0) {
      return res.status(400).json({ erro: 'Reserva não encontrada ou já cancelada.' });
    }

    res.json({ mensagem: 'Reserva cancelada com sucesso.' });

  } catch (err) {
    console.error('Erro ao cancelar reserva:', err);
    res.status(500).json({ erro: 'Erro ao cancelar reserva.' });
  }
};

