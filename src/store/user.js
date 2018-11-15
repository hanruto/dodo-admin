import { observable, action } from 'mobx'
import axios from '../config/axios'
import Base from './base'


export default class Store extends Base {
  @observable userInfo = {}

  @action
  getInfo = () => {
    return axios.get('/admins/info')
      .then(data => {
        return this.userInfo = data
      })
  }

  @action
  login = (info) => {
    return axios.post('/login', info)
      .then(data => {
        return this.userInfo = data
      })
  }

  @action
  getViewRecords = () => {
    return axios.get('/view-records')
      .then(data => {
        return this.userInfo = data
      })
  }
}
