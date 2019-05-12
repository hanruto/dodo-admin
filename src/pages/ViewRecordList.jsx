import React from 'react'
import { Table } from 'antd'
import { dateFormater } from '../util/tool'
import { inject, observer } from 'mobx-react'

const columns = [
  {
    key: 'siteName',
    dataIndex: 'siteName',
    title: '网站'
  },
  {
    key: 'nickname',
    dataIndex: 'nickname',
    title: '用户名称',
    width: 300
  },
  {
    key: 'ip',
    dataIndex: 'ip',
    title: 'ip'
  },
  {
    key: 'created',
    dataIndex: 'created',
    title: '访问时间'
  }
]

@inject('viewRecordStore')
@observer
export default class ViewRecordList extends React.Component {
  componentDidMount() {
    this.fetchRecords()
  }

  fetchRecords = () => {
    this.props.viewRecordStore.getRecords()
  }

  handleTogglePage = page => this.fetch(page)

  get records() {
    const { list = [], count, dayCount } = this.props.viewRecordStore.records
    const records = list.map(item => {
      const record = { ...item }
      record.created = dateFormater(item.created, true)
      record.nickname = (item.info && item.info.nickname) || '未设置'
      return record
    })
    return { list: records, count, dayCount }
  }

  render() {
    const { list, count, dayCount } = this.records

    return (
      <div className="do-container">
        <div className="do-card">
          <span>
            总计 <span className="do-text-large">{count}</span> 次
          </span>
        </div>
        <div className="do-card">
          <span>
            今日 <span className="do-text-large">{dayCount}</span> 次
          </span>
        </div>
        <Table rowKey={item => item._id} columns={columns} dataSource={list} pagination={false} />
      </div>
    )
  }
}
