import pool from '../utils/db'
import sequelize from '../utils/dbSequelize'

class Product {
    constructor(
        public id: number | null,
        public title: string,
        public price: number,
        public description: string,
        public imageUrl: string
    ) {
        this.id = id
        this.title = title
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
    }

    static getAll = async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM products')
            return rows
        } catch (err) {
            console.error('Lỗi khi query - getAll Product')
            throw err
        }
    }

    static add = async (product: Product) => {
        try {
            const { title, price, description, imageUrl } = product
            const sql =
                'INSERT INTO products (title, price, description, imageUrl) values (?,?,?,?)'
            const [rows] = await pool.query(sql, [
                title,
                price,
                description,
                imageUrl,
            ])
            return rows
        } catch (err) {
            console.error('Lỗi khi query - add Product')
            throw err
        }
    }

    static findById = async (id: number) => {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM products WHERE id = ${id}`
            )
            return rows
        } catch (err) {
            console.error('Lỗi khi query - getById Product')
            throw err
        }
    }

    static update = async (product: Product) => {
        const { title, price, description, imageUrl, id } = product
        const sql =
            'UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?'
        try {
            const [rows] = await pool.query(sql, [
                title,
                price,
                description,
                imageUrl,
                id,
            ])
            return rows
        } catch (err) {
            console.error('Lỗi khi query - update Product')
            throw err
        }
    }

    static delete = async (id: number) => {
        try {
            const [rows] = await pool.query(
                `DELETE FROM products WHERE id = ${id}`
            )
            return rows
        } catch (err) {
            console.error('Lỗi khi query - delete Product')
            throw err
        }
    }
}

export default Product
