import { observable, action } from 'mobx'
import axios from '../config/axios'
import Base from './base'

export default class Store extends Base {
  @observable pvAndUv = { pvCount: 0, dayPvCount: 0, uvCount: 0, dayUvCount: 0 }
  @observable records = {}
  @observable analysis = {}

  @action
  getRecords = ({ page, perPage, type }) => {
    return axios
      .get('/tracks', { params: { limit: perPage, skip: (page - 1) * perPage, type } })
      .then(records => {
        this.records = { page, perPage, list: records.list, total: records.total }
      })
  }

  @action
  getAnalysis = (duration) => {
    return axios.get('/tracks/analysis', { params: { duration } })
      .then(data => {
        this.analysis = data
      })
  }

  @action
  getRecordsPvAndUv = () => {
    return axios.get('/tracks/pv-uv')
      .then(data => {
        this.pvAndUv = data
      })
  }
}
