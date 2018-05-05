import React from 'react'
import { Icon } from 'antd'
import { NavLink, Redirect } from 'react-router-dom'

import logo from '../imgs/dodo-logo.png'
import DashboardRouter from '../routes/dashboard'

import axios from 'axios'

const siderbarMenus = [
	{ to: '/app/admins', icon: 'user', text: '管理员' },
	{
		icon: 'book', text: '博客', subMenus: [
			{ to: '/app/blogs/list', icon: 'smile-o', text: '博客列表' },
			{ to: '/app/blogs/add', icon: 'smile-o', text: '添加博客' },
		]
	}
]

class SiderBar extends React.Component {
	constructor() {
		super();
		this.state = {
			collapsed: false,
			menus: siderbarMenus
		}
		this.logout = this.logout.bind(this);
		this.toggleSubMenus = this.toggleSubMenus.bind(this);
	}

	toggleSubMenus(item) {
		item.isShowSubMenus = !item.isShowSubMenus;
		this.setState({ menus: this.state.menus })
	}

	logout() {
		axios.post('/auths/logout')
			.then(res => this.setState({ isLogout: true }))
	}

	render() {
		let menus = this.state.menus;
		return (
			<div className={this.state.collapsed ? "main-nav collapsed" : "main-nav"}>
				<ul className="main-sidebar">
					{
						menus.map((item, index) => (
							// 当菜单存在subMenu时需要遍历得到二级菜单，这个项目只支持二级菜单，如果需要可以再想办法
							item.subMenus
								? <li className="menu-item" key={index}>
									<a onClick={e => this.toggleSubMenus(item)}>
										<Icon className="menu-icon" type={item.icon} />
										<span className="menu-text">{item.text}</span>
									</a>
									<ul className={"sub-menus " + (item.isShowSubMenus ? '' : 'collapsed')}>
										{item.subMenus.map((menu, index) => {
											return <li className="menu-item" key={index}>
												<NavLink to={menu.to}>
													<Icon className="menu-icon" type={menu.icon} />
													<span className="menu-text">{menu.text}</span>
												</NavLink>
											</li>
										})}
									</ul>
								</li>
								: <li className="menu-item" key={index}>
									<NavLink to={item.to}>
										<Icon className="menu-icon" type={item.icon} />
										<span className="menu-text">{item.text}</span>
									</NavLink>
								</li>
						))
					}
					<li className="menu-item" onClick={this.logout}>
						<a>
							<Icon className="menu-icon" type="setting" />
							<span className="menu-text">退出登录</span>
						</a>
					</li>
				</ul>

				<div className="collapse-toggle">
					{
						this.state.collapsed
							? <Icon onClick={() => this.setState({ collapsed: false })} type="right" />
							: <Icon onClick={() => this.setState({ collapsed: true })} type="left" />
					}
				</div>

				{this.state.isLogout && <Redirect to="/login" />}
			</div>
		)
	}
}

class Content extends React.Component {
	render() {
		return <div className="main-content">
			<DashboardRouter />
		</div>
	}
}

class Layout extends React.Component {
	render() {
		return (
			<div className="main-view">
				<SiderBar />
				<Content />
			</div>
		);
	}
}

export default Layout;