import Product from './product'

let _id: number = 0

class CartItem {
    constructor(
        public id: number,
        public product: Product,
        public quantity: number
    ) {
        this.product = product
        this.quantity = quantity
    }
}

const cart: CartItem[] = []

class Cart {
    static getAll = (): CartItem[] => {
        return cart
    }

    static addToCart = (product: Product, quantity: number = 1): void => {
        const existingItem: CartItem | undefined = cart.find(
            (item: CartItem): boolean => item.product.id === product.id
        )

        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            _id++
            cart.push(new CartItem(_id, product, quantity))
        }
    }

    static removeFromCart = (id: number): void => {
        const index: number = cart.findIndex(
            (item: CartItem): boolean => item.product.id === id
        )

        if (index !== -1) {
            cart.splice(index, 1)
        } else {
            console.log('Remove from cart >> Không tìm thấy sản phẩm')
        }
    }

    static updateQuantity = (id: number, newQuantity: number): void => {
        const existingItem: CartItem | undefined = cart.find(
            (item: CartItem): boolean => item.product.id === id
        )

        if (existingItem) {
            existingItem.quantity = newQuantity
        } else {
            console.log('Update quantity >> Không tìm thấy sản phẩm')
        }
    }

    static findById = (id: number): CartItem | undefined =>
        cart.find((c: CartItem): boolean => c.id === id)
}

export default Cart

export { CartItem }
