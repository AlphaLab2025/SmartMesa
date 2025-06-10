const db = require('../model/db');


exports.listarMesasReservadas = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT m.*, json_agg(r.*) AS reservas
      FROM "Mesa" m
      JOIN "Reserva" r ON r."mesaId" = m.id
      WHERE r.status = 'RESERVADA'
      GROUP BY m.id
      ORDER BY m.numero ASC;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar mesas reservadas:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar mesas.', erro: err.message });
  }
};

exports.listarMesas = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT m.*, json_agg(r.*) AS reservas
      FROM "Mesa" m
      LEFT JOIN "Reserva" r ON r."mesaId" = m.id
      GROUP BY m.id
      ORDER BY m.numero ASC;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar mesas:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar mesas.', erro: err.message });
  }
};
