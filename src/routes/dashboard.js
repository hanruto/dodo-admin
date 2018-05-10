import React from 'react'
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'


import StaffList from '../components/AdminList'
import BlogList from '../components/BlogList'
import EditBlog from '../components/EditBlog'
import BlogDetail from '../components/BlogDetail'
import ImageStore from '../components/ImageStore'
import LeaveWordList from '../components/LeaveWordList'

export default class DashboardRouter extends React.Component {
    render() {
        return <Switch>
            <Route path="/app/admins" component={StaffList} />
            <Route path="/app/blogs/list" component={BlogList} exact />
            <Route path="/app/blogs/add" component={EditBlog} exact />
            <Route path="/app/imgs" component={ImageStore} exact />
            <Route path="/app/leave-words" component={LeaveWordList} exact />
            <Route path="/app/blogs/:id" component={BlogDetail} />
            <Redirect to="/app/admins" />
        </Switch>
    }
} 