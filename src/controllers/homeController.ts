import Product from "../models/product";
import {Request, Response} from "express";

class HomeController {
    // [GET] - /
    static index = (req: Request, res: Response) => {
        const products: Product[] = Product.getAll()
        res.render('index', {products})
    }
}

export default HomeController