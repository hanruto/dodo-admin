import React from 'react'
import axios from 'axios'
import Table from 'antd/lib/table'

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

export default class AdminList extends React.Component {
  state = {
    auths: [],
    loading: true,
  }

  componentDidMount() {
    this.setState({ loading: true })
    axios.get('/admins')
      .then(auths => {
        this.setState({ auths })
        this.setState({ loading: false })
      })
  }

  render() {
    const { loading } = this.state

    return (
      <div className="do-container">
        <Table
          loading={loading}
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
