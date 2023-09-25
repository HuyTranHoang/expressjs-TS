import { Request, Response } from 'express'
import Product from '../models/product_mongo'

class ProductController {
    // * [GET] - /
    static index = async (req: Request, res: Response) => {
        const products = await Product.getAll()
        const title: string = 'Admin - Products'

        const createFlash: boolean = req.session.createFlash || false
        const updateFlash: boolean = req.session.updateFlash || false
        const deleteFlash: boolean = req.session.deleteFlash || false

        delete req.session.createFlash
        delete req.session.updateFlash
        delete req.session.deleteFlash

        res.render('admin/product/index', {
            products,
            title,
            createFlash,
            updateFlash,
            deleteFlash
        })
    }

    // * [Get] - /admin/product/create
    static create = async (_req: Request, res: Response) => {
        const title: string = 'Admin - Add Products'
        res.render('admin/product/add', { title })
    }

    // * [POST] - /admin/product
    static store = async (req: Request, res: Response) => {
        let imageUrl = 'default.jpg'
        if (req.file) imageUrl = req.file.filename
        const { title, price, description } = req.body

        const product = new Product(title, price, description, imageUrl)
        Product.add(product)

        req.session.createFlash = true

        res.redirect('/admin/product')
    }

    // * [Get] - /admin/product/:id/edit
    static edit = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id
            const product = await Product.findById(id)
            const title: string = 'Admin - Edit Products'

            if (product) res.render('admin/product/edit', { product, title })
            else res.redirect('/admin/product')
        } catch (err) {
            console.error(`[Get] - /admin/product/:id/edit ==> `, err)
        }
    }

    // * [PUT] - /admin/product/:id
    static update = async (req: Request, res: Response) => {
        const id: string = req.params.id
        let { title, price, description, currentImage } = req.body

        console.log(currentImage)

        let imageUrl: string = currentImage
        if (req.file) imageUrl = req.file.filename

        const product = new Product(title, price, description, imageUrl)

        await Product.update(id, product)

        req.session.updateFlash = true

        res.redirect('/admin/product')
    }

    // * [DELETE] - /admin/product/delete/:id
    static destroy = async (req: Request, res: Response) => {
        const id: string = req.params.id
        const result = await Product.delete(id)

        if (result && result.deletedCount) {
            req.session.deleteFlash = true
        }

        res.redirect('/admin/product')
    }
}

export default ProductController
