import express from 'express'
import HomeController from '../controllers/homeController'

const router = express.Router()

router.get('/', HomeController.index)

router.post('/cart', HomeController.addToCart)

export default router