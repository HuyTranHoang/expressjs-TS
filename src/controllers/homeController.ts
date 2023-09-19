import Product from '../models/product'
import { Request, Response } from 'express'

class HomeController {
    // [GET] - /
    static index = (req: Request, res: Response) => {
        const products: Product[] = Product.getAll()
        const title: string = 'Home page'
        res.render('index', { products, title })
    }
}

export default HomeController