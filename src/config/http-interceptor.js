import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { message, Divider } from 'antd'

const baseURL = 'https://api.justdodo.cn';
// const baseURL = 'http://localhost:8081';


const getMessageByStatus = status => {
    const statusMap = {
        '401': '未登录',
        '403': '未授权',
        '408': '请求超时',
        '500': '服务端出错',
        '404': '服务端没找到这个资源',
        '502': '网关出错'
    }
    return statusMap[status] || '未知的错误'
}

export default class Interceptor extends React.Component {
    constructor() {
        super();
        this.state = {};
        const _self = this;

        // 把axios的配置写入拦截器组件中, react 一切皆组件
        axios.defaults.baseURL = baseURL
        axios.defaults.withCredentials = true

        this.state.requestsCount = 0;
        axios.interceptors.request.use(request => {
            this.setState({ requestsCount: ++this.state.requestsCount })
            return request;
        })
        axios.interceptors.response.use(response => {
            this.setState({ requestsCount: --this.state.requestsCount })
            if (response.data.code === 0) {
                message.error(response.data.msg);
                return Promise.reject(response.data);
            }
            if (response.data.code === 1) {
                message.success(response.data.msg);
            }
            return response.data;
        }, error => {
            this.setState({ requestsCount: --this.state.requestsCount })
            // 如果没有switch匹配得到相应的messageInfo, 那么默认值为 未知的错误
            if (error && error.response) {
                message.error(getMessageByStatus(error.response.status))
                if (error.response.status === 401) {
                    _self.setState({ notAuthenticated: true });
                }
            } else {
                message.error('什么鬼, 到底怎么了 ? ')
            }
            return Promise.reject(error.response.data);
        })
    }

    render() {
        return (
            <div>
                {this.state.notAuthenticated && <Redirect to="/login" />}
                {!!this.state.requestsCount && <div className="loading">
                    <div className="lds-facebook"><div></div><div></div><div></div></div>
                </div>}
            </div>
        )
    }
}