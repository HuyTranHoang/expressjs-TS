import express from 'express'
import CartController from '../controllers/cartController'

const router = express.Router()

router.get('/', CartController.index)
    .post('/', CartController.store)
    .delete('/:id', CartController.destroy)

router.post('/plus/:id', CartController.plus)
    .post('/minus/:id', CartController.minus)

export default router