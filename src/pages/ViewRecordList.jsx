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

const Card = (props) => {
  return (
    <div className="do-card">
      <span>
        <span className="do-card-title">{props.title}</span>
        <span className="do-text-large">{props.text}</span>
      </span>
    </div>
  )
}

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
    const { list = [], pvCount, dayPvCount, uvCount, dayUvCount } = this.props.viewRecordStore.records
    const records = list.map(item => {
      const record = { ...item }
      record.created = dateFormater(item.created, true)
      record.nickname = (item.info && item.info.nickname) || '未设置'
      return record
    })
    return { list: records, pvCount, dayPvCount, uvCount, dayUvCount, }
  }

  render() {
    const { list, pvCount, dayPvCount, uvCount, dayUvCount } = this.records

    return (
      <div className="do-container">
        <Card title="总PV" text={pvCount} />
        <Card title="日PV" text={dayPvCount} />
        <Card title="总UV" text={uvCount} />
        <Card title="日UV" text={dayUvCount} />
        <Table rowKey={item => item._id} columns={columns} dataSource={list} pagination={false} />
      </div>
    )
  }
}
