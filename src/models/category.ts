import { DataTypes, Sequelize } from 'sequelize'

const Category = (sequelize: Sequelize) =>
    sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

export default Category
