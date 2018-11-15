import { observable, action } from 'mobx'
import axios from '../config/axios'
import Base from './base'
import qs from 'qs'


export default class Store extends Base {
  @observable blogs = {
    list: [],
    page: 0,  // 现在一共有0页，不是目前在第几页
    perPage: 10,
    noMore: false,
    count: 0,
  }

  @observable tags = []
  @observable currentBlog = null

  @action
  list = (params) => {
    return axios.get('/articles',{
      params: { ...{ perPage: this.blogs.perPage }, ...params },
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      },
    })
      .then(blogs => {
        this.blogs.list = blogs.list
        this.blogs.page = blogs.page
        this.blogs.count = blogs.count

        return this.blogs
      })
  }

  @action
  read = id => {
    return axios.get(`/articles/${id}`)
      .then(blog => this.currentBlog = blog)
  }

  @action
  delete = id => {
    return axios.delete(`/articles/${id}`)
      .then(() => this.list())
  }

  @action
  comment = comment => {
    const blogId = this.currentBlog._id

    return axios.put(`/articles/${blogId}/comment`, comment)
      .then(blog => this.currentBlog = blog)
  }

  @action
  getTags = () => {
    return axios.get('/articles/tags')
      .then(tags => this.tags = tags)
  }

  @action
  deleteTag = id => {
    return axios.delete(`/articles/tags/${id}`)
      .then(() => this.getTags())
  }
}
