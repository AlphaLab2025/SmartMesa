const db = require('../model/db');

exports.reservasPorPeriodo = async (req, res) => {
  const { inicio, fim } = req.query;

  if (!inicio || !fim) {
    return res.status(400).json({ mensagem: 'Parâmetros "inicio" e "fim" são obrigatórios.' });
  }

  try {
    const result = await db.query(
      `SELECT * FROM "Reserva"
       WHERE "dataHora" BETWEEN $1 AND $2`,
      [inicio, fim]
    );

    if (!result.rows.length) {
      return res.json({ mensagem: 'Nenhuma reserva no período.' });
    }

    res.json(result.rows);
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
    const result = await db.query(
      `SELECT * FROM "Reserva" WHERE "mesaId" = $1`,
      [parseInt(mesa)]
    );

    if (!result.rows.length) {
      return res.json({ mensagem: 'Nenhuma reserva encontrada para essa mesa.' });
    }

    res.json(result.rows);
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
    const result = await db.query(
      `SELECT * FROM "Reserva" WHERE "garcomId" = $1`,
      [parseInt(garcom)]
    );

    if (!result.rows.length) {
      return res.json({ mensagem: 'Nenhuma confirmação feita por esse garçom.' });
    }

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar confirmações.', erro: err.message });
  }
};
