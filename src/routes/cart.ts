import express from 'express'
import CartController from '../controllers/cartController'

const router = express.Router()

router.get('/', CartController.index)
    .post('/', CartController.store)
    .delete('/:id', CartController.destroy)

export default router