import { Request, Response } from 'express'
import Product from '../models/product'

class ProductController {
    // * [GET] - /
    static index = (req: Request, res: Response) => {
        const products = Product.getAll()
        res.render('admin/product/index', { products })
    }

    // * [Get] - /admin/product/create
    static create = (req: Request, res: Response) =>
        res.render('admin/product/add', { title: 'Add product' })

    // * [POST] - /admin/product
    static store = (req: Request, res: Response): void => {
        let imageName = 'default.jpg'
        if (req.file) imageName = req.file.filename
        const { name, price, description } = req.body
        const product: Product = new Product(name, price, description, imageName)
        Product.add(product)

        res.redirect('/')
    }

    // * [Get] - /admin/product/:id/edit
    static edit = (req: Request, res: Response) => {}

    // * [PUT] - /admin/product/:id
    static update = (req: Request, res: Response) => {}

    // * [DELETE] - /admin/product/:id
    static destroy = (req: Request, res: Response) => {}
}

export default ProductController
