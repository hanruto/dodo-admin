import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import LoginPage from '../pages/Login'
import MainPage from '../pages/Layout'

const MainRouter = () => (
    <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/app" component={MainPage} />
        <Redirect to="/app" />
    </Switch>
)

export default MainRouter