const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config();

async function main() {
  const client = new Client({
    user: 'postgres',
    password: process.env.PASSWORD_DB, // Substitua pela sua senha real
    host: 'localhost',
    port: 5432,
    database: 'postgres',
  });

  try {
    await client.connect();

    // Verifica se o banco "mydb" já existe
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'mydb'");
    if (res.rowCount === 0) {
      await client.query('CREATE DATABASE mydb');
      console.log('Banco de dados "mydb" criado.');
    } else {
      console.log('Banco de dados "mydb" já existe. Pulando criação.');
    }

    await client.end();

    const newClient = new Client({
      user: 'postgres',
      password: process.env.PASSWORD_DB, // Substitua pela sua senha real
      host: 'localhost',
      port: 5432,
      database: 'mydb',
    });

    await newClient.connect();

    const sql = fs.readFileSync('./model/mydb.sql', 'utf8');
    await newClient.query(sql);
    console.log('Estrutura do banco criada com sucesso.');

    await newClient.end();
  } catch (err) {
    console.error('Erro:', err.message);
  }
}

main();
