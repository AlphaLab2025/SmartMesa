const prisma = require('../model/prisma');


exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      orderBy: { id: 'asc' },
    });

    res.json(usuarios);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar usuários.', erro: err.message });
  }
};

exports.listarUsuariosEMesas = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        reservas: true, 
      },
      orderBy: { id: 'asc' },
    });

    const mesas = await prisma.mesa.findMany({
      include: {
        reservas: true, 
      },
      orderBy: { numero: 'asc' },
    });

    res.json({ usuarios, mesas });

  } catch (err) {
    console.error('Erro ao listar usuários e mesas:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar dados.', erro: err.message });
  }
};