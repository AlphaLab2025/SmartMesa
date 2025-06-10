const { Pool } = require('pg');
require('dotenv').config();

const password = process.env.PASSWORD_DB;
const db_url = `postgresql://postgres:${password}@localhost:5432/mydb`;

const pool = new Pool({
  connectionString: db_url,
});

module.exports = pool;
