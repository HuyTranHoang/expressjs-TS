import sequelize from '../utils/dbSequelize'
import Sequelize from 'sequelize'

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(13,2),
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'default.jpg',
        allowNull: false
    },
    description: Sequelize.STRING
})

export default Product
