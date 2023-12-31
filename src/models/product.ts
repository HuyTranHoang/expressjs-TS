import {DataTypes, Sequelize} from 'sequelize'

export default (sequelize: Sequelize) => sequelize.define(
    'Product',
    {
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
    }
)
