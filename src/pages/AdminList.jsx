import React from 'react'
import axios from 'axios'
import Table from 'antd/lib/table'

export default class AdminList extends React.Component {
  constructor() {
    super()
    this.state = {
      auths: []
    }
  }

  componentDidMount() {
    axios.get('/admins').then(auths => this.setState({ auths }))
  }

  render() {
    const columns = [
      {
        title: '账号',
        dataIndex: 'username',
        key: 'name'
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname'
      },
      {
        title: '身份',
        dataIndex: 'role',
        key: 'role'
      }
    ]

    return (
      <div className="do-container">
        <Table
          rowKey={item => item._id}
          dataSource={this.state.auths}
          style={{ minWidth: 500 }}
          columns={columns}
          pagination={false}
        />
      </div>
    )
  }
}
