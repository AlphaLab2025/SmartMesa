const { Pool } = require('pg');

const db = "postgresql://postgres:${process.env.DATABASE_PASSWORD}@localhost:5432/mydb"

const pool = new Pool({
  connectionString: db,
});

module.exports = pool;
