import React from 'react'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import LoginPage from '../pages/login'
import MainPage from '../pages/layout'
import { connect } from 'react-redux'


class MainRouter extends React.Component {
    render() {
        return <div>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route path="/app" component={MainPage} />
                <Redirect to="/app" />
            </Switch>
        </div>
    }
}

export default MainRouter