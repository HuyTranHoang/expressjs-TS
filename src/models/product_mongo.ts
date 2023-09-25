import { getDb, collections } from '../utils/dbMongo'
import { Collection, ObjectId } from 'mongodb'

class Product {
    constructor(
        public title: string,
        public price: number,
        public description: string,
        public imageUrl: string
    ) {
        this.title = title
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
    }

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
            const { title, price, description, imageUrl } = product
            const products: Collection | undefined = collections.products
            const filter = { _id: new ObjectId(id) }
            const updateProduct = {
                $set: { title, price, description, imageUrl }
            }
            await products?.updateOne(filter, updateProduct)
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
