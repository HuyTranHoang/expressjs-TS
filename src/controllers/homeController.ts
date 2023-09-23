import { Product } from '../utils/dbSequelize'
import { Request, Response } from 'express'

class HomeController {
    // [GET] - /
    static index = async (req: Request, res: Response) => {
        const products = await Product.findAll()
        const title: string = 'Home page'
        res.render('index', { products, title })
    }
}

export default HomeController