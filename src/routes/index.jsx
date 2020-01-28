import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from '../pages/Login'
import PageRouter from './page'

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route path="/" component={PageRouter} />
    </Switch>
  )
}

export default MainRouter
