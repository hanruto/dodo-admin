import { observable, action } from 'mobx'
import axios from '../config/axios'
import Base from './base'

export default class Store extends Base {
  @observable analysis = []
  @observable records = {}

  @action
  getRecords = () => {
    return axios.get('/view-records', { params: { limit: 40 } }).then(data => {
      this.records = data
    })
  }

  getAnalysis = () => {
    return axios.get('/view-records/analysis').then(data => {
      this.analysis = data
    })
  }
}
