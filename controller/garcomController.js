const db = require('../model/db');

exports.confirmarReserva = async (req, res) => {
  const { id, idgarcom } = req.body;

  if (!id || !idgarcom) {
    return res.status(400).json({ mensagem: 'Parâmetros "id" e "idgarcom" são obrigatórios.' });
  }

  try {
   
    const resultVerificacao = await db.query(
      'SELECT * FROM "Reserva" WHERE id = $1 AND status = $2',
      [id, 'RESERVADA']
    );

    if (resultVerificacao.rows.length === 0) {
      return res.status(400).json({ mensagem: 'Reserva não encontrada ou já confirmada.' });
    }

    
    const resultAtualizacao = await db.query(
      `UPDATE "Reserva"
       SET status = $1, "garcomId" = $2
       WHERE id = $3
       RETURNING *`,
      ['CONFIRMADA', idgarcom, id]
    );

    res.json({
      mensagem: 'Reserva confirmada com sucesso.',
      reserva: resultAtualizacao.rows[0],
    });

  } catch (err) {
    console.error('Erro ao confirmar reserva:', err);
    res.status(500).json({ mensagem: 'Erro ao confirmar reserva.', erro: err.message });
  }
};
