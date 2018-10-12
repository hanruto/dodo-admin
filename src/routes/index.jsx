import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import LoginPage from '../pages/Login'
import MainPage from '../pages/Layout'
import EditBlog from '../pages/EditBlog'
import BlogView from '../pages/BlogView'


const MainRouter = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/app/blogs/:blogId" component={EditBlog} />
    <Route exact path="/app/blogs/:blogId/view" component={BlogView} />
    <Route path="/app" component={MainPage} />
    <Redirect to="/app" />
  </Switch>
)

export default MainRouter
