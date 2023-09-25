import Product from '../models/product_mongo'
import { NextFunction, Request, Response } from 'express'

class HomeController {
    // [GET] - /
    static index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await Product.getAll()
            const title: string = 'Home page'
            res.render('index', { products, title })
        } catch (err) {
            next(err)
        }
    }
}

export default HomeController