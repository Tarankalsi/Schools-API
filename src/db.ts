import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:  Number(process.env.DB_PORT),
}
console.log(config)
export const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    port:  Number(process.env.DB_PORT),
    waitForConnections:true,
    queueLimit: 0
})

