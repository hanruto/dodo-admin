import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import StaffList from '../pages/AdminList'
import BlogList from '../pages/BlogList'


const DashboardRouter = () => (
  <Switch>
    <Route path="/app/admins" component={StaffList} />
    <Route path="/app/blogs" component={BlogList} exact />
    <Redirect to="/app/admins" />
  </Switch>
)

export default DashboardRouter
