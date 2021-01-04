import BaseService from './BaseService'

export default class UserService extends BaseService {
  constructor () {
    super('/pessoa')
  }
}
