import { Request, Response } from 'express'
import Product from '../models/product'

class ProductController {
    // * [GET] - /
    static index = (req: Request, res: Response) => {
        const products: Product[] = Product.getAll()
        res.render('admin/product/index', { products })
    }

    // * [Get] - /admin/product/create
    static create = (req: Request, res: Response) =>
        res.render('admin/product/add', { title: 'Add product' })

    // * [POST] - /admin/product
    static store = (req: Request, res: Response): void => {
        let imageName: string = 'default.jpg'
        if (req.file) imageName = req.file.filename
        const { name, price, description } = req.body
        const product: Product = new Product(
            name,
            price,
            description,
            imageName
        )
        Product.add(product)

        res.redirect('/admin/product')
    }

    // * [Get] - /admin/product/:id/edit
    static edit = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id)
            const product: Product | undefined = await Product.findById(id)
            if (product)
                res.render('admin/product/edit', { product })
            else
                res.redirect('/admin/product')
        } catch (err) {
            console.error(`[Get] - /admin/product/:id/edit ==> `, err)
        }
    }

    // * [PUT] - /admin/product/:id
    static update = (req: Request, res: Response) => {}

    // * [DELETE] - /admin/product/:id
    static destroy = (req: Request, res: Response) => {}
}

export default ProductController
