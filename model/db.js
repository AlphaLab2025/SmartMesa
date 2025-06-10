const { Pool } = require('pg');
require('dotenv').config();

const db = "postgresql://postgres:${process.env.DATABASE_PASSWORD}@localhost:5432/mydb"

const pool = new Pool({
  connectionString: db,
});

module.exports = pool;
