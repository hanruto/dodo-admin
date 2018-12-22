import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import store from './store'

// 引入样式
import 'antd/dist/antd.css'
import 'draft-js/dist/Draft.css'
import 'braft-editor/dist/index.css'
import './styles/index.scss'

// 引入 routers 和reducers
import MainRoute from './routes'

// 配置拦截器
import './config/axios'

// 初始化状态

// 渲染页面 提供Provider和hashrouter 然后是拦截器
ReactDom.render(
  <HashRouter>
    <Provider {...store}>
      <MainRoute />
    </Provider>
  </HashRouter>,
  document.getElementById('app')
)
