import { Request, Response } from 'express'
import { Product } from '../utils/dbSequelize'

class ProductController {
    // * [GET] - /
    static index = async (req: Request, res: Response) => {
        const products = await Product.findAll()

        const title: string = 'Admin - Products'

        const createFlash: boolean = req.session.createFlash || false
        const updateFlash: boolean = req.session.updateFlash || false

        delete req.session.createFlash
        delete req.session.updateFlash

        res.render('admin/product/index', {
            products,
            title,
            createFlash,
            updateFlash,
        })
    }

    // * [Get] - /admin/product/create
    static create = (_req: Request, res: Response) => {
        const title: string = 'Admin - Add Products'
        res.render('admin/product/add', { title })
    }

    // * [POST] - /admin/product
    static store = async (req: Request, res: Response) => {
        let imageUrl
        if (req.file) imageUrl = req.file.filename
        const { title, price, description } = req.body

        await Product.create({
            title,
            price,
            imageUrl,
            description,
        })

        req.session.createFlash = true

        res.redirect('/admin/product')
    }

    // * [Get] - /admin/product/:id/edit
    static edit = async (req: Request, res: Response) => {
        try {
            const id: number = parseInt(req.params.id)
            const product = await Product.findByPk(id)
            const title: string = 'Admin - Edit Products'

            if (product) res.render('admin/product/edit', { product, title })
            else res.redirect('/admin/product')
        } catch (err) {
            console.error(`[Get] - /admin/product/:id/edit ==> `, err)
        }
    }

    // * [PUT] - /admin/product/:id
    static update = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id)
        let { title, price, description, currentImage } = req.body

        let imageName: string = currentImage
        if (req.file) imageName = req.file.filename

        await Product.update(
            {
                title,
                price,
                description,
                imageName,
            },
            {
                where: {
                    id,
                },
            }
        )

        req.session.updateFlash = true

        res.redirect('/admin/product')
    }

    // * [DELETE] - /admin/product/delete/:id
    static destroy = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id)
        const product = await Product.findByPk(id)
        await product?.destroy()

        res.redirect('/admin/product')
    }
}

export default ProductController
