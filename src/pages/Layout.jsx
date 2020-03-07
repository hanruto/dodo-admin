import React from 'react'
import Icon from 'antd/lib/icon'
import Menu from 'antd/lib/menu'
import { withRouter } from 'react-router-dom'
import DashboardRouter from '../routes/dashboard'
import needLogin from '../util/needLogin'

const menus = [
  { to: '/app/admins', icon: 'coffee', text: '管理员' },
  // { to: '/app/users', icon: 'user', text: '用户' },
  { to: '/app/blogs', icon: 'book', text: '博客' },
  { to: '/app/chat', icon: 'contacts', text: '聊天' },
  {
    icon: 'message',
    text: '留言',
    options: [
      { to: '/app/leave-messages', text: '留言板' },
      { to: '/app/blog-comments', text: '博客评论' }
    ]
  },
  {
    icon: 'smile',
    text: '访客记录',
    options: [
      { to: '/app/view-records', text: '记录' },
      { to: '/app/view-records/analysis', text: '统计' },
      { to: '/app/view-records/whitelist', text: 'ip白名单' },
    ]
  },
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
            return menu.options
              ? <Menu.SubMenu
                className="sub-menus"
                key={menu.text}
                title={
                  <span>
                    <Icon type={menu.icon} />
                    {menu.text}
                  </span>
                }
              >
                {menu.options.map(option => (
                  <Menu.Item className={`nav-menu ${currentPath === option.to ? 'active' : ''}`} key={option.to}>
                    {option.text}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
              : <Menu.Item key={menu.to} className={`nav-menu ${currentPath === menu.to ? 'active' : ''}`}>
                <Icon type={menu.icon} />
                {menu.text}
              </Menu.Item>
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
