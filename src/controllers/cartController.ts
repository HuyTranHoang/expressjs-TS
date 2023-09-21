import { Request, Response } from 'express'
import Cart, { CartItem } from '../models/cart'
import Product from '../models/product'

class CartController {
    // [GET] - /cart/
    static index = (req: Request, res: Response): void => {
        const carts: CartItem[] = Cart.getAll()
        const title: string = 'Cart'
        const totalMoney: number = 0
        res.render('cart', { carts, title, totalMoney })
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

    // [POST - /cart/plus/:id
    static plus = (req: Request, res: Response): void => {
        const { id } = req.body
        const cartItem: CartItem | undefined = Cart.findById(parseInt(id))
        if (cartItem) {
            const newQuantity: number = cartItem.quantity + 1
            Cart.updateQuantity(cartItem.id, newQuantity)
            res.status(200).send('POST Plus Cart OK')
        } else {
            res.status(500).send('POST Plus Cart Error')
        }
    }
    // [POST - /cart/minus/:id
    static minus = (req: Request, res: Response): void => {
        const { id } = req.body
        const cartItem: CartItem | undefined = Cart.findById(parseInt(id))
        if (cartItem && cartItem.quantity > 1) {
            const newQuantity: number = cartItem.quantity - 1
            Cart.updateQuantity(cartItem.id, newQuantity)
            res.status(200).send('POST Minus Cart OK')
        } else {
            res.status(500).send('POST Minus Cart Error')
        }
    }
}

export default CartController
