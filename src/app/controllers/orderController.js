import Order from '../models/order'
import User from '../models/user'

export const orderIndex = async (request, response) => {
  const orders = await Order.all()
  for (const item of orders) {
    item.user = await User.find(item.user_id)
  }
  return response.json(orders)
}

export const orderShow = async (request, response) => {
  const { id } = request.params
  const order = await Order.find(id)
  order.user = await User.find(order.user_id)
  return response.json(order)
}
