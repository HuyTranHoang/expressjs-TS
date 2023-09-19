const products: Product[] = []
let _id: number = 0

class Product {
    id: number
    name: string
    price: number
    description: string
    image: string

    constructor(
        name: string,
        price: number,
        description: string,
        image: string
    ) {
        this.id = _id
        this.name = name
        this.price = price
        this.description = description
        this.image = image
    }

    static getAll = (): Product[] => {
        return products
    }

    static add = (product: Product): void => {
        _id++
        const newProduct: Product = { ...product, id: _id }
        products.push(newProduct)
    }

    static findById = (id: number) => {
        return products.find((p: Product): boolean => p.id === id)
    }

    static update = (product: Product) => {
        const index: number = products.findIndex(
            (p: Product): boolean => p.id === product.id
        )
        if (index !== -1) {
            products[index] = { ...products[index], ...product }
        } else {
            console.log('Update product >> Không tìm thấy product')
        }
    }

    static remove = (id: number) => {
        const index: number = products.findIndex(
            (p: Product): boolean => p.id === id
        )
        if (index !== -1) {
            products.splice(index, 1)
        } else {
            console.log('Remove product >> Không tìm thấy product')
        }
    }
}

export default Product
