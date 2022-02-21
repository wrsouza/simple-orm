import User from '../models/user'

export const userIndex = async (request, response) => {
  const users = await User.all()
  return response.json(users)
}

export const userShow = async (request, response) => {
  const { id } = request.params
  const user = await User.find(id)
  return response.json(user)
}
