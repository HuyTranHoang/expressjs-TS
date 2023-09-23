import sequelize, { DataTypes } from '../utils/dbSequelize'

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(13, 2),
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue: 'default.jpg',
        allowNull: false,
    },
    description: DataTypes.STRING,
})

export default Product
