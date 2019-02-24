import { observable, action } from 'mobx'
import axios from '../config/axios'
import Base from './base'

export default class Store extends Base {
  @observable userInfo = {}
  @observable viewRecord = {}
  @observable userList = {}

  @action
  checkLogin = () => {
    if (this.userInfo._id) return Promise.resolve(this.userInfo)

    return axios.get('/admins/info').then(data => (this.userInfo = data))
  }

  @action
  login = info => {
    return axios.post('/login', info).then(data => (this.userInfo = data))
  }

  @action
  getViewRecords = () => {
    return axios.get('/view-records').then(data => (this.viewRecord = data))
  }

  @action
  getUsers = params => {
    return axios.get('/users', { params }).then(data => (this.userList = data))
  }

  @action
  deleteUser = id => {
    return axios.delete(`/users/${id}`).then(this.getUsers)
  }
}
