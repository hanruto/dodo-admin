import React from 'react'
import { Icon } from 'antd'
import DashboardRouter from '../routes/dashboard'
import { Menu } from 'antd'
import { withRouter } from 'react-router-dom'
import needLogin from '../util/needLogin'

const menus = [
  { to: '/app/admins', icon: 'user', text: '管理员' },
  { to: '/app/users', icon: 'user', text: '用户' },
  { to: '/app/blogs', icon: 'book', text: '博客' },
  { to: '/app/leaved-messages', icon: 'message', text: '留言' },
  { to: '/app/view-records', icon: 'smile', text: '访客记录' },
  { to: '/login', icon: 'logout', text: '登出' }
]

@withRouter
class SiderBar extends React.Component {
  handleToggle = menu => {
    this.props.history.push(menu.key)
  }

  render() {
    const currentPath = this.props.location.pathname

    return (
      <div className="main-nav">
        <Menu mode="inline" selectable={false} onClick={this.handleToggle} defaultOpenKeys={['book']}>
          {menus.map(menu => {
            return menu.options ? (
              <Menu.SubMenu
                className="sub-menus"
                key={menu.key}
                title={
                  <span>
                    <Icon type={menu.icon} />
                    <span>{menu.text}</span>
                  </span>
                }
              >
                {menu.options.map(option => (
                  <Menu.Item className={`nav-menu ${currentPath === option.to ? 'active' : ''}`} key={option.to}>
                    <Icon type={option.icon} />
                    {option.text}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={menu.to} className={`nav-menu ${currentPath === menu.to ? 'active' : ''}`}>
                <Icon type={menu.icon} /> {menu.text}
              </Menu.Item>
            )
          })}
        </Menu>
      </div>
    )
  }
}

class Content extends React.Component {
  render() {
    return (
      <div className="main-content">
        <DashboardRouter />
      </div>
    )
  }
}

@needLogin
class Layout extends React.Component {
  render() {
    return (
      <div className="main-view">
        <SiderBar />
        <Content />
      </div>
    )
  }
}

export default Layout
