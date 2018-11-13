import React from 'react'
import { Table } from 'antd'
import axios from 'axios'
import { dateFilter } from '../util/tool'


export default class ViewRecordList extends React.Component {
  state = {
    list: [],
    selectable: false,
    count: 0,
    perPage: 15,
    page: 1,
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = () => {
    axios.get('/view-records/blog', { params: { limit: 40 } })
      .then(res => {
        const { list, count } = res.data

        list.forEach((item) => {
          item.created = dateFilter(item.created, true)
          item.nickname = item.info && item.info.nickname || '未设置'
        })
        this.setState({ list, count })
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
    const { list, count } = this.state

    return <div className="do-container">
      <div className="do-card">
        <span>共计 <span className="do-text-large">{count}</span></span>
      </div>
      <Table
        rowKey={item => item._id}
        columns={columns}
        dataSource={list}
        pagination={false}
      />
    </div>
  }
}
