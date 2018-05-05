import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { HashRouter } from 'react-router-dom'
// 引入样式
import 'antd/dist/antd.css'
import './styles/index.less'

// 引入 routers 和reducers
import MainRoute from './routes'
import './config/http-interceptor'
import reducer from './reducers'

// 配置拦截器
import Interceptor from './config/http-interceptor'

// 初始化状态
var initState = {}
const store = createStore(reducer, initState)

// 渲染页面
ReactDom.render(
    <Provider store={store}>
        <HashRouter>
            <div>
                <Interceptor/>
                <MainRoute />
            </div>
        </HashRouter>
    </Provider>,
    document.getElementById('app')
);
