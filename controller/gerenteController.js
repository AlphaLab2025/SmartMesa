const prisma = require('../model/prisma');




exports.reservasPorPeriodo = async (req, res) => {
  const { inicio, fim } = req.query;

  if (!inicio || !fim) {
    return res.status(400).json({ mensagem: 'Parâmetros "inicio" e "fim" são obrigatórios.' });
  }

  try {
    const reservas = await prisma.reserva.findMany({
      where: {
        dataHora: {
          gte: new Date(inicio),
          lte: new Date(fim),
        },
      },
    });

    if (!reservas.length) {
      return res.json({ mensagem: 'Nenhuma reserva no período.' });
    }

    res.json(reservas);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar reservas.', erro: err.message });
  }
};



exports.reservasPorMesa = async (req, res) => {
  const { mesa } = req.params;

  if (!mesa) {
    return res.status(400).json({ mensagem: 'Parâmetro "mesa" é obrigatório.' });
  }

  try {
    const reservas = await prisma.reserva.findMany({
      where: {
        mesaId: parseInt(mesa),
      },
    });

    if (!reservas.length) {
      return res.json({ mensagem: 'Nenhuma reserva encontrada para essa mesa.' });
    }

    res.json(reservas);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar reservas.', erro: err.message });
  }
};



exports.reservasPorGarcom = async (req, res) => {
  const { garcom } = req.params;

  if (!garcom) {
    return res.status(400).json({ mensagem: 'Parâmetro "garcom" é obrigatório.' });
  }

  try {
    const reservas = await prisma.reserva.findMany({
      where: {
        garcomId: parseInt(garcom),
      },
    });

    if (!reservas.length) {
      return res.json({ mensagem: 'Nenhuma confirmação feita por esse garçom.' });
    }

    res.json(reservas);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar confirmações.', erro: err.message });
  }
};


