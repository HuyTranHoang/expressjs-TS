import { Sequelize } from 'sequelize'

import categoryModel from '../models/category'
import productModel from '../models/product'

const sequelize: Sequelize = new Sequelize('c2202_nodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

categoryModel(sequelize)
productModel(sequelize)

const { Category, Product } = sequelize.models

Category.hasMany(Product, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    }
})

Product.belongsTo(Category, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    }
})

export default sequelize

export { Product, Category }
