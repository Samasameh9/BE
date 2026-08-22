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
async function testDBConnection() {
  try {
    const [result, fields] = await db.execute(`SELECT 1+1 as result`);
    console.log("connection stablish");
  } catch (error) {
    console.log("fail to connect db");
    console.log(error.message);
    
    process.exit(1);
  }
}
testDBConnection();
export default  db;
