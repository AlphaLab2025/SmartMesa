const db = require('../model/db');

exports.listarUsuarios = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM "Usuario" ORDER BY id ASC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar usuários.', erro: err.message });
  }
};

exports.listarUsuariosEMesas = async (req, res) => {
  try {
    const usuariosResult = await db.query(`
      SELECT u.*, json_agg(r.*) AS reservas
      FROM "Usuario" u
      LEFT JOIN "Reserva" r ON r."garcomId" = u.id
      GROUP BY u.id
      ORDER BY u.id ASC
    `);

    const mesasResult = await db.query(`
      SELECT m.*, json_agg(r.*) AS reservas
      FROM "Mesa" m
      LEFT JOIN "Reserva" r ON r."mesaId" = m.id
      GROUP BY m.id
      ORDER BY m.numero ASC
    `);

    res.json({
      usuarios: usuariosResult.rows,
      mesas: mesasResult.rows,
    });

  } catch (err) {
    console.error('Erro ao listar usuários e mesas:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar dados.', erro: err.message });
  }
};
