import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
  try {
    const pool = await sql.connect({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      server: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      options: {
        trustServerCertificate: true
      }
    });

    console.log("connected to MSSQL");

    const result = await pool.query("SELECT * FROM Users");
    console.log("users table data:", result.recordset);

    process.exit(0);
  } catch (err) {
    console.error("DB failed:", err);
    process.exit(1);
  }
}

connect();
