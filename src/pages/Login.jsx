import React from 'react'
import logo from '../imgs/dodo-logo.png'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      userInfo: { username: '', password: '' },
    }
    this.login = this.login.bind(this)
    this.setValue = this.setValue.bind(this)
  }

  login(e) {
    e.preventDefault()
    axios.post('/login', this.state.userInfo)
      .then(data => {
        this.props.loginSuccess(data.data)
        this.setState({ redirectToApp: true })
      })
  }

  setValue(e) {
    const userInfo = this.state.userInfo
    userInfo[e.target.name] = e.target.value
    this.setState({ userInfo })
  }

  render() {
    return (
      <div className="login-page">
        <form className="login-form" onSubmit={e => this.login(e)}>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="do-group">
            <input value={this.state.userInfo.username} name="username" onChange={this.setValue} type="text" className="do-input" placeholder="用户名" />
          </div>
          <div className="do-group">
            <input value={this.state.userInfo.password} name="password" onChange={this.setValue} type="password" className="do-input" placeholder="密码" />
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

function mapDispatchToProps(dispatch) {
  return {
    loginSuccess(data) {
      dispatch({
        type: 'SIGNIN',
        user: data,
      })
    },
  }
}

export default connect(state => state, mapDispatchToProps)(LoginPage)
