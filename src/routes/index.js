import { Router } from 'express'
import { 
  homeIndex, 
  userIndex, 
  userShow,
  productIndex,
  productShow,
  orderIndex,
  orderShow 
} from '../app/controllers'

const router = Router()

router.get('/', homeIndex)
router.get('/users', userIndex)
router.get('/users/:id', userShow)
router.get('/products', productIndex)
router.get('/products/:id', productShow)
router.get('/orders', orderIndex)
router.get('/orders/:id', orderShow)

export default router
