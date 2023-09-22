import mysql from 'mysql2'
import { Pool } from 'mysql2/typings/mysql/lib/Pool'

const pool: Pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'c2202_nodejs',
    password: ''
})

export default pool.promise()