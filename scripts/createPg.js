const { Client } = require('pg');
const fs = require('fs');

async function main() {
  const client = new Client({
    user: 'postgres', 
    password: 'SUA-SENHA', // Substitua pela sua senha real
    host: 'localhost',
    port: 5432,
    database: 'postgres', 
  });

  try {
    await client.connect();

   
    await client.query('CREATE DATABASE mydb');
    console.log('Banco de dados "mydb" criado.');

    await client.end();

    const newClient = new Client({
      user: 'postgres',
      password: 'SUA-SENHA', // Substitua pela sua senha real
      host: 'localhost',
      port: 5432,
      database: 'mydb',
    });

    await newClient.connect();

    // Lê o conteúdo do arquivo .sql
    const sql = fs.readFileSync('./model/mydb.sql', 'utf8');

    // Executa o SQL completo
    await newClient.query(sql);
    console.log('Estrutura do banco criada com sucesso.');

    await newClient.end();
  } catch (err) {
    console.error('Erro:', err.message);
  }
}

main();
