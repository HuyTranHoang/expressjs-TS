import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('c2202_nodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch((error) => {
        console.error('Unable to connect to the database: ', error)
    })

export default sequelize

export {
    DataTypes
}
