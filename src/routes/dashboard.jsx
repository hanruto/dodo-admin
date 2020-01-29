import React from 'react'
import { Switch, Route } from 'react-router-dom'
import StaffList from '../pages/AdminList'
import BlogList from '../pages/BlogList'
import LeavedMessageList from '../pages/LeavedMessageList'
import ViewRecordList from '../pages/ViewRecordList'
import UserList from '../pages/UserList'
import ViewRecordCharts from '../pages/ViewRecordCharts'
import ViewRecordWhiteList from '../pages/ViewRecordWhiteList'
import BlogComments from '../pages/BlogComments'
import NotFound from '../pages/NotFound'

const DashboardRouter = () => (
  <Switch>
    <Route path="/app/admins" component={StaffList} exect />
    <Route path="/app/users" component={UserList} exact />
    <Route path="/app/blogs" component={BlogList} exact />
    <Route path="/app/leave-messages" component={LeavedMessageList} exact />
    <Route path="/app/blog-comments" component={BlogComments} exact />
    <Route path="/app/view-records" component={ViewRecordList} exact />
    <Route path="/app/view-records/analysis" component={ViewRecordCharts} exact />
    <Route path="/app/view-records/whitelist" component={ViewRecordWhiteList} exact />
    <Route component={NotFound} />
  </Switch>
)

export default DashboardRouter
