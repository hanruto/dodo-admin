import React from 'react'
import axios from 'axios'
import { Table } from 'antd'


export default class AdminList extends React.Component {
  constructor() {
    super()
    this.state = {
      auths: [],
    }
  }

  componentWillMount() {
    axios.get('/admins')
      .then(res => this.setState({ auths: res.data }))
  }

  render() {
    const columns = [{
      title: '账号',
      dataIndex: 'username',
      key: 'name',
    }, {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    }, {
      title: '身份',
      dataIndex: 'role',
      key: 'role',
    }]

    return (
      <div className="do-container">
        <Table
          dataSource={this.state.auths.map((data, index) => {
            data.key = index

            // data.action = <span><Icon type="delete" /><Icon type="edit" /></span>
            return data
          })}
          style={{ minWidth: 500 }}
          columns={columns}
          pagination={false}
        />
      </div>
    )
  }
}
