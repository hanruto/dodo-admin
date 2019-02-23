import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import LoginPage from '../pages/Login'
import PageRouter from './page'

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route path="/" component={PageRouter} />
      <Redirect to="/" />
    </Switch>
  )
}

export default MainRouter
