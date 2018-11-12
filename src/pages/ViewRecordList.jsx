import React from 'react'
import { Table } from 'antd'
import axios from 'axios'
import { dateFilter } from '../util/tool'


export default class ViewRecordList extends React.Component {
  state = {
    blogs: [],
    selectable: false,
    count: 0,
    perPage: 15,
    page: 1,
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = () => {
    axios.get('/view-records/blog')
      .then(res => {
        const list = res.data
        list.forEach((item) => {
          item.created = dateFilter(item.created)
          item.siteName = dateFilter(item.updated)
          item.nickname = item.info && item.info.nickname || '未设置'
        })
        this.setState({ list })
      })
  }

  handleDelete = item => {
    this.setState()
    axios.delete(`/leaved-messages/${item._id}`)
      .then(() => {
        this.fetch(this.state.page)
      })
  }

  handleTogglePage = page => this.fetch(page)

  render() {
    const columns = [
      {
        key: 'siteName',
        dataIndex: 'siteName',
        title: '网站',
      }, {
        key: 'nickname',
        dataIndex: 'nickname',
        title: '用户名称',
        width: 300,
      }, {
        key: 'ip',
        dataIndex: 'ip',
        title: 'ip',
      }, {
        key: 'created',
        dataIndex: 'created',
        title: '访问时间',
      },
    ]
    const { list } = this.state

    return <div className="do-container">
      <Table
        columns={columns}
        dataSource={list}
        pagination={false}
      />
    </div>
  }
}
