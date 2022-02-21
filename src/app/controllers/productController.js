import Product from '../models/product'

export const productIndex = async (request, response) => {
  const products = await Product.all()
  return response.json(products)
}

export const productShow = async (request, response) => {
  const { id } = request.params
  const product = await Product.find(id)
  return response.json(product)
}
