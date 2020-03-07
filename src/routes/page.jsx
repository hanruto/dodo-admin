import React from 'react'
import loadableComponent from 'loadable-components'
import Spin from 'antd/lib/spin'
import { Route, Switch, Redirect } from 'react-router-dom'
import NotFound from '../pages/NotFound'

const loadable = (Component) => {
  return loadableComponent(
    Component,
    { fallback: <div className="main-page-spin"><Spin /></div> }
  )
}

const Layout = loadable(() => import(/* webpackChunkName: 'layout' */'../pages/Layout'))
const EditBlog = loadable(() => import(/* webpackChunkName: 'edit-blog' */'../pages/EditBlog'))
const BlogView = loadable(() => import(/* webpackChunkName: 'blog-view' */'../pages/BlogView'))
const EditChat = loadable(() => import(/* webpackChunkName: 'edit-chat' */'../pages/EditChat'))

export default function PageRouter() {
  return (
    <Switch>
      <Route exact path="/app/blogs/:blogId" component={EditBlog} />
      <Route exact path="/app/blogs/:blogId/view" component={BlogView} />
      <Route exact path="/app/chats/:chatId" component={EditChat} />
      <Route path="/app" component={Layout} />
      <Route path="/" render={() => <Redirect to="/app/admins" />} />
      <Route component={NotFound} />
    </Switch>
  )
}
