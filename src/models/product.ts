const products: Product[] = []
let _id: number = 1

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
        product.id = _id
        products.push(product)
        _id++
    }

    static findById = async (id: number) => {
        return products.find((p: Product): boolean => p.id === id);
    }
}

export default Product
