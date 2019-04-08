import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
// 引入 routers

// 渲染页面 提供Provider和hashrouter 然后是拦截器
ReactDom.render(<App />, document.getElementById('app'))
