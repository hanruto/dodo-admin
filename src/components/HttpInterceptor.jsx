import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { message } from 'antd'
import { baseApiUrl } from '../config/env'


const getMessageByStatus = status => {
  const statusMap = {
    '401': '未登录',
    '403': '未授权',
    '408': '请求超时',
    '500': '服务端出错',
    '404': '服务端没找到这个资源',
    '502': '网关出错',
  }

  return statusMap[status] || '未知的错误'
}

export default class Interceptor extends React.Component {
  constructor() {
    super()
    this.state = {}
    const _self = this

    // 把axios的配置写入拦截器组件中, react 一切皆组件
    axios.defaults.baseURL = baseApiUrl
    axios.defaults.withCredentials = true

    this.state.requestsCount = 0
    axios.interceptors.request.use(request => {
      this.setState({ requestsCount: ++this.state.requestsCount })

      return request
    })
    axios.interceptors.response.use(response => {
      const data = response.data
      if (!data) return Promise.reject(response)

      this.setState({ requestsCount: --this.state.requestsCount })

      if (!response.data.success) {
        message.error(response.data.message)

        return Promise.reject(response.data)
      }
      // if (response.data.success) {
      //   response.data.message && message.success(response.data.message)
      // }

      return response.data
    }, err => {
      this.setState({ requestsCount: --this.state.requestsCount })
      // 如果没有switch匹配得到相应的messageInfo, 那么默认值为 未知的错误
      console.log(JSON.stringify(err))
      if (err && err.response) {
        message.error(getMessageByStatus(err.response.status))
        if (err.response.status === 401) {
          _self.setState({ notAuthenticated: true })
        }

        return Promise.reject(err.response.data)
      }
      message.error('数据请求失败')

      return Promise.reject(err)
    })
  }

  render() {
    return (
      <div>
        {this.state.notAuthenticated && <Redirect to="/login" />}
      </div>
    )
  }
}
