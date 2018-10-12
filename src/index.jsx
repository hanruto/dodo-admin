import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
// 引入样式
import 'antd/dist/antd.css'
import './styles/index.less'

// 引入 routers 和reducers
import MainRoute from './routes'
import reducer from './reducers'

// 配置拦截器
import Interceptor from './components/HttpInterceptor'

// 初始化状态
const initState = {}
const store = createStore(reducer, initState)

// 渲染页面 提供Provider和hashrouter 然后是拦截器
ReactDom.render(
  <Provider store={store}>
    <HashRouter>
      <div>
        <Interceptor />
        <MainRoute />
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)
