import React from 'react'
import { Table } from 'antd'
import axios from 'axios'
import { dateFormater } from '../util/tool'


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

export default class ViewRecordList extends React.Component {
  state = {
    list: [],
    selectable: false,
    count: 0,
    perPage: 15,
    page: 1,
    dayCount: 0,
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = () => {
    axios.get('/view-records', { params: { limit: 40 } })
      .then(data => {
        const { list, count, dayCount } = data
        list.forEach((item) => {
          item.created = dateFormater(item.created, true)
          item.nickname = item.info && item.info.nickname || '未设置'
        })
        this.setState({ list, count, dayCount })
      })
  }

  handleTogglePage = page => this.fetch(page)

  render() {
    const { list, count, dayCount } = this.state

    return <div className="do-container">
      <div className="do-card">
        <span>总计 <span className="do-text-large">{count}</span> 次</span>
      </div>
      <div className="do-card">
        <span>今日 <span className="do-text-large">{dayCount}</span> 次</span>
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
