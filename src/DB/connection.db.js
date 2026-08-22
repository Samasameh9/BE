import mysql2 from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../config.js";

let db = mysql2.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 4,
  queueLimit: 0,
});

db.getConnection()
  .then((connection) => {
    console.log("MySQL connected successfully");
    connection.release();
  })
  .catch((error) => {
    console.error("MySQL connection failed:", error);
  });
export default  db;
