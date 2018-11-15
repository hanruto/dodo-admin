import React from 'react'
import logo from '../imgs/dodo-logo.png'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'


@inject('userStore')
@observer
class LoginPage extends React.Component {
  state = {
    userInfo: {
      username: '',
      password: '',
    },
  }

  handleLogin = (e) => {
    e.preventDefault()

    this.props.userStore.login(this.state.userInfo)
      .then(() => this.props.history.push('/app/admins'))
  }

  handleChange = (e) => {
    const userInfo = this.state.userInfo
    userInfo[e.target.name] = e.target.value
    this.setState({ userInfo })
  }

  render() {
    return (
      <div className="login-page">
        <form className="login-form" onSubmit={e => this.handleLogin(e)}>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="do-group">
            <input value={this.state.userInfo.username} name="username" onChange={this.handleChange} type="text" className="do-input" placeholder="用户名" />
          </div>
          <div className="do-group">
            <input value={this.state.userInfo.password} name="password" onChange={this.handleChange} type="password" className="do-input" placeholder="密码" />
          </div>
          <div className="do-group">
            <button className="full-btn primary-btn do-btn">登录</button>
          </div>
        </form>
        {this.state.redirectToApp && <Redirect to="/app" />}
      </div>
    )
  }
}


export default LoginPage
