// scripts/createDb.js
const { Client } = require('pg');

const dbName = 'mydb';
const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'SUA-SENHA', // Substitua pela sua senha real sua_senha_aqui
  port: 5432,
  database: 'postgres'
};

const client = new Client(config);

async function ensureDatabase() {
  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`✅ Banco '${dbName}' criado com sucesso.`);
    } else {
      console.log(`ℹ️ Banco '${dbName}' já existe.`);
    }
  } catch (err) {
    console.error('Erro ao verificar/criar o banco:', err.message);
  } finally {
    await client.end();
  }
}

ensureDatabase();
