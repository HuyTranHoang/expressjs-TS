import Product from '../models/product_mongo'
import { Request, Response } from 'express'
import User from '../models/user'

class HomeController {
    // [GET] - /
    static index = async (req: Request, res: Response) => {
        try {
            const products = await Product.getAll()
            const title: string = 'Home page'
            res.render('index', { products, title })
        } catch (err) {
            console.log(err)
        }
    }

    // [POST] - /cart/
    static addToCart = async (req: Request, res: Response) => {
        const { id } = req.body
        try {
            const product = await Product.findById(id)
            req.user.addToCart(product)
            res.status(200).send("Ok")
        } catch (err) {
            console.log(err)
        }
    }
}

export default HomeController
