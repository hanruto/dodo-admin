import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import StaffList from '../pages/AdminList'
import BlogList from '../pages/BlogList'
import EditBlog from '../pages/EditBlog'
import BlogDetail from '../pages/BlogDetail'
import ImageStore from '../pages/ImageStore'
import LeaveWordList from '../pages/LeaveWordList'

const DashboardRouter = () => (
    <Switch>
        <Route path="/app/admins" component={StaffList} />
        <Route path="/app/blogs/list" component={BlogList} exact />
        <Route path="/app/blogs/add" component={EditBlog} exact />
        <Route path="/app/imgs" component={ImageStore} exact />
        <Route path="/app/leave-words" component={LeaveWordList} exact />
        <Route path="/app/blogs/:id" component={BlogDetail} />
        <Redirect to="/app/admins" />
    </Switch>
)

export default DashboardRouter