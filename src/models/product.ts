const products: Product[] = []
let _id: number = 1

class Product {
    id: number
    name: string
    price: number
    description: string
    image: string

    constructor(name: string, price: number, description: string, image: string) {
        this.id = _id
        this.name = name
        this.price = price
        this.description = description
        this.image = image
    }

    static getAll = () => {
        return products
    }

    static add = (product: Product) => {
        product.id = _id
        products.push(product)
        _id++
    }
}

export default Product