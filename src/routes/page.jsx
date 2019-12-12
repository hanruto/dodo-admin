import React from 'react'
import loadable from 'loadable-components'
import { Route, Switch, Redirect } from 'react-router-dom'


const Layout = loadable(() => import(/* webpackChunkName: 'layout' */'../pages/Layout'))
const EditBlog = loadable(() => import(/* webpackChunkName: 'edit-blog' */'../pages/EditBlog'))
const BlogView = loadable(() => import(/* webpackChunkName: 'blog-view' */'../pages/BlogView'))

export default function PageRouter() {
  return (
    <Switch>
      <Route exact path="/app/blogs/:blogId" component={EditBlog} />
      <Route exact path="/app/blogs/:blogId/view" component={BlogView} />
      <Route path="/app" component={Layout} />
      <Redirect to="/app" />
    </Switch>
  )
}
