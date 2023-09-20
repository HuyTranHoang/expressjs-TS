import { Request, Response } from 'express'
import Cart, { CartItem } from '../models/cart'
import Product from "../models/product";

class CartController {
    // [GET] - /cart/
    static index = (req: Request, res: Response): void => {
        const carts: CartItem[] = Cart.getAll()
        const title: string = 'Cart'
        res.render('cart', { carts, title })
    }

    // [POST] - /cart/
    static store = (req: Request, res: Response): void => {
        const { id } = req.body
        const product: Product | undefined = Product.findById(parseInt(id))
        if (product) {
            Cart.addToCart(product, 1)
            res.status(200).send('POST Cart OK')
        } else {
            res.status(500).send('POST Cart Error')
        }
    }

    // [DELETE] - /cart/:id
    static destroy = (req: Request, res: Response): void => {
        const { id } = req.body
        const product: Product | undefined = Product.findById(parseInt(id))
        if (product) {
            Cart.removeFromCart(parseInt(id))
            res.status(200).send('DELETE Cart OK')
        } else {
            res.status(500).send('DELETE Cart Error')
        }
    }
}

export default CartController
