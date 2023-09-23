import { Sequelize, DataTypes, Model } from 'sequelize'

import categoryModel from '../models/category'
import productModel from '../models/product'

const sequelize: Sequelize = new Sequelize('c2202_nodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

categoryModel(sequelize)
productModel(sequelize)

const {Category, Product}  = sequelize.models

Category.hasMany(Product)
Product.belongsTo(Category)

export default sequelize

export { DataTypes, Model, Product, Category}
