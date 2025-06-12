const db = require('../model/db');

exports.criarReserva = async (req, res) => {
  const { data, hora, mesa, quant_pessoa, responsavel } = req.body;

  if (!data || !hora || !mesa || !quant_pessoa || !responsavel) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  console.log('Recebido:', req.body);

  try {
    const dataHora = new Date(`${data}T${hora}`);

    const diaInicio = new Date(dataHora); 
    diaInicio.setHours(0, 0, 0, 0); 

    const diaFim = new Date(dataHora);
    diaFim.setHours(23, 59, 59, 999); 

    const reservaExistente = await db.query(
      `SELECT * FROM "Reserva" 
       WHERE "mesaId" = $1 
       AND "dataHora" BETWEEN $2 AND $3
       AND "status" IN ('RESERVADA', 'CONFIRMADA')`,
      [parseInt(mesa), diaInicio, diaFim]
    );

    if (reservaExistente.rows.length > 0) {
      return res.status(400).json({
        erro: 'Essa mesa já está reservada ou confirmada neste dia.',
      });
    }

    const novaReserva = await db.query(
      `INSERT INTO "Reserva" ("dataHora", "quantidade", "nomeCliente", "mesaId", "status") 
       VALUES ($1, $2, $3, $4, 'RESERVADA') 
       RETURNING id`,
      [dataHora, quant_pessoa, responsavel, parseInt(mesa)]
    );

    res.json({ mensagem: 'Reserva criada com sucesso.', id: novaReserva.rows[0].id });

  } catch (err) {
    console.error('Erro ao criar reserva:', err);
    res.status(500).json({ erro: 'Erro ao criar reserva.' });
  }
};


exports.cancelarReserva = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ erro: 'O campo "id" da reserva é obrigatório.' });
  }

  try {

    const checkResult = await db.query(
      'SELECT * FROM "Reserva" WHERE id = $1 AND status = $2',
      [id, 'RESERVADA']
    );

    if (checkResult.rowCount === 0) {
      return res.status(400).json({ erro: 'Reserva não encontrada ou não está com status RESERVADA.' });
    }


    await db.query(
      'UPDATE "Reserva" SET status = $1 WHERE id = $2',
      ['CANCELADA', id]
    );

    res.json({ mensagem: 'Reserva cancelada com sucesso.' });

  } catch (err) {
    console.error('Erro ao cancelar reserva:', err);
    res.status(500).json({ erro: 'Erro interno ao cancelar reserva.', detalhe: err.message });
  }
};
