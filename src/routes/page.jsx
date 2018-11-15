import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import EditBlog from '../pages/EditBlog'
import BlogView from '../pages/BlogView'
import Layout from '../pages/Layout'


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
