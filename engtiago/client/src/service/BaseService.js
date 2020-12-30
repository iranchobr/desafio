import { HTTPClient } from '../utils/http'
export default class BaseService {
  constructor (api) {
    this.api = api
    this.http = HTTPClient
  }

  list = async () => {
    try {
      const response = await HTTPClient.get(this.api)
      return response.data
    } catch (error) {
      throw new Error('Ao listar instância')
    }
  }

  show = async $id => {
    try {
      const response = await HTTPClient.get(`${this.api}/${$id}`)
      return response.data
    } catch (error) {
      throw new Error('Ao mostrar instância')
    }
  }

  create = async $data => {
    try {
      const response = await HTTPClient.post(this.api, $data)
      return response.data
    } catch (error) {
      throw new Error('Ao criar nova instância')
    }
  }

  update = async $data => {
    try {
      const response = await HTTPClient.put(`${this.api}/${$data.id}`, $data)
      return response.data
    } catch (error) {
      throw new Error('Ao editar instância')
    }
  }

  remove = async $id => {
    try {
      const response = await HTTPClient.delete(`${this.api}/${$id}`)
      return response.data
    } catch (error) {
      throw new Error('Ao remover instância')
    }
  }
}
