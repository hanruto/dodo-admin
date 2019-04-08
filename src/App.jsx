import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
// 引入store
import store from './store'
// 引入样式
import 'antd/dist/antd.css'
import 'draft-js/dist/Draft.css'
import 'braft-editor/dist/index.css'
import './styles/index.scss'
import MainRoute from './routes'
// 配置拦截器
import './config/axios'
import { hot } from 'react-hot-loader/root'

@hot
export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Provider {...store}>
          <MainRoute />
        </Provider>
      </HashRouter>
    )
  }
}
