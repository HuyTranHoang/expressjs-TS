import { Request, Response } from 'express'
import Product from '../models/product'

class ProductController {
    // * [GET] - /
    static index = (req: Request, res: Response) => {
        const products: Product[] = Product.getAll()
        const title: string = 'Admin - Products'

        const createFlash: boolean = req.session.createFlash || false
        const updateFlash: boolean = req.session.updateFlash || false

        delete req.session.createFlash
        delete req.session.updateFlash

        res.render('admin/product/index', { products, title, createFlash, updateFlash })

    }

    // * [Get] - /admin/product/create
    static create = (_req: Request, res: Response) => {
        const title: string = 'Admin - Add Products'
        res.render('admin/product/add', { title })
    }

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

        req.session.createFlash = true

        res.redirect('/admin/product')
    }

    // * [Get] - /admin/product/:id/edit
    static edit = (req: Request, res: Response) => {
        try {
            const id: number = parseInt(req.params.id)
            const product: Product | undefined = Product.findById(id)
            const title: string = 'Admin - Edit Products'
            if (product) res.render('admin/product/edit', { product, title })
            else res.redirect('/admin/product')
        } catch (err) {
            console.error(`[Get] - /admin/product/:id/edit ==> `, err)
        }
    }

    // * [PUT] - /admin/product/:id
    static update = (req: Request, res: Response) => {
        let { name, price, description, currentImage } = req.body

        let imageName: string = currentImage
        if (req.file) imageName = req.file.filename
        const product: Product = new Product(
            name,
            price,
            description,
            imageName
        )
        Product.update(product)

        req.session.updateFlash = true

        res.redirect('/admin/product')
    }

    // * [DELETE] - /admin/product/delete/:id
    static destroy = (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id)
        Product.remove(id)

        res.redirect('/admin/product')
    }
}

export default ProductController
