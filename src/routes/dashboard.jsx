import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import StaffList from '../pages/AdminList'
import BlogList from '../pages/BlogList'
import LeavedMessageList from '../pages/LeavedMessageList'
import ViewRecordList from '../pages/ViewRecordList'
import UserList from '../pages/UserList'
import ViewRecordCharts from '../pages/ViewRecordCharts'

const DashboardRouter = () => (
  <Switch>
    <Route path="/app/admins" component={StaffList} />
    <Route path="/app/users" component={UserList} exact />
    <Route path="/app/blogs" component={BlogList} exact />
    <Route path="/app/leaved-messages" component={LeavedMessageList} exact />
    <Route path="/app/view-records" component={ViewRecordList} exact />
    <Route path="/app/view-records/analysis" component={ViewRecordCharts} exact />
    <Redirect to="/app/admins" />
  </Switch>
)

export default DashboardRouter
