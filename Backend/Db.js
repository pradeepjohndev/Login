import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

let pool;

async function connect() {
  try {
    pool = await sql.connect({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      server: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      options: { trustServerCertificate: true }
    });

    console.log("connected to MSSQL");
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

connect();

export { sql, pool };
