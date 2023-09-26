import { getDb, collections } from '../utils/dbMongo'
import { Collection, ObjectId } from 'mongodb'

class Product {
    constructor(
        public title: string,
        public price: number,
        public description: string,
        public imageUrl: string
    ) {}

    static getAll = async () => {
        try {
            const products: Collection | undefined = collections.products
            const result = await products?.find().toArray()
            return result
        } catch (error) {
            console.log(error)
        }
    }

    static add = async (product: Product) => {
        try {
            const products: Collection | undefined = collections.products
            await products?.insertOne(product)
        } catch (error) {
            console.log(error)
        }
    }

    static findById = async (id: string) => {
        try {
            const products: Collection | undefined = collections.products
            const query = { _id: new ObjectId(id) }
            const product = await products?.findOne(query)
            return product
        } catch (error) {
            console.log(error)
        }
    }

    static update = async (id: string, product: Product) => {
        try {
            const products: Collection | undefined = collections.products
            const filter = { _id: new ObjectId(id) }
            await products?.updateOne(filter, { $set: product })
        } catch (error) {
            console.log(error)
        }
    }

    static delete = async (id: string) => {
        try {
            const products: Collection | undefined = collections.products
            const query = { _id: new ObjectId(id) }
            const result = await products?.deleteOne(query)
            return result
        } catch (error) {
            console.log(error)
        }
    }
}

export default Product
