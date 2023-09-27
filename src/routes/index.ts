import homeRouter from './home'
import adminRouter from './admin'
import cartRouter from './cart'

import ExceptionController from '../controllers/exceptionController'
import { Express } from 'express'

function route(app: Express): void {
    app.use(homeRouter)
    // app.use('/cart', cartRouter)
    app.use('/admin', adminRouter)

    // Page not found
    app.use(ExceptionController.handle404)
    // Internal server error
    // app.use(ExceptionController.handle500)
}

export default route
