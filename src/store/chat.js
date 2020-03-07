import { observable, action } from 'mobx'
import axios from '../config/axios'
import Base from './base'

export default class Store extends Base {
  @observable chatList = { list: [], total: 0, perPage: 20 }
  @observable currentChat = { }

  @action
  getChat = async id => {
    this.currentChat = await axios.get(`/robot-chats/${id}`)
  }

  @action
  getChatList = async () => {
    const chatList = await axios.get('/robot-chats')
    this.chatList = chatList
  }

  @action
  deleteChat = async key => {
    this.chatList.data = this.chatList.data.filter(item => item.key !== key)
  }

  @action
  saveChat = async info => {
    await axios.post('/robot-chats', info)
  }

  @action
  updateChat = async (id, info) => {
    await axios.post(`/robot-chats/${id}`, info)
  }
}
