import { collections } from '../utils/dbMongo'
import { Collection, ObjectId } from 'mongodb'
import Product from './product_mongo'

class User {
    constructor(
        public _id: ObjectId,
        public username: string,
        public email: string,
        public cart: { items: { productId: ObjectId; quantity: number }[] }
    ) {
        this.cart = cart ? cart : { items: [] }
    }

    static findById = async (id: string) => {
        try {
            const users: Collection | undefined = collections.users
            const query = { _id: new ObjectId(id) }
            const user = await users?.findOne(query)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    addToCart = async (product: Product) => {
        const updatedCartItems = [...this.cart.items]
        const index = this.cart.items.findIndex(
            (i) => i.productId.toString() === product._id.toString()
        )
        let quantity = 1

        if (index > -1) {
            quantity = this.cart.items[index].quantity + 1
            updatedCartItems[index].quantity = quantity
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity
            })
        }

        const users: Collection | undefined = collections.users
        const filter = { _id: new ObjectId(this._id) }
        const updatedCart = {
            items: updatedCartItems
        }
        await users?.updateOne(filter, { $set: { cart: updatedCart } })
    }
}

export default User
