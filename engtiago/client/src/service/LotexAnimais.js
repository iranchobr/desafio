import BaseService from './BaseService'
import { HTTPClient } from '../utils/http'

export default class UserService extends BaseService {
  constructor () {
    super('/animalsLoteXRoute')
  }

  getByAnimalId = async $id => {
    try {
      const response = await HTTPClient.get(`${this.api}/getByAnimalId/${$id}`)
      return response.data
    } catch (error) {
      throw new Error('Ao listar instância')
    }
  }
}
