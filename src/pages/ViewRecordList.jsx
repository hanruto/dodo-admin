import React from 'react'
import Table from 'antd/lib/table'
import { dateFormater } from '../util/tool'
import { inject, observer } from 'mobx-react'

const columns = [
  {
    key: 'key',
    dataIndex: 'key',
    title: '埋点'
  },
  {
    key: 'title',
    dataIndex: 'title',
    title: '标题'
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
  state = {
    loading: true,
  }

  componentDidMount() {
    this.fetchRecords(1)
    this.fetchPvAndUv()
  }

  fetchPvAndUv = () => {
    this.props.viewRecordStore.getRecordsPvAndUv()
  }

  fetchRecords = (page) => {
    this.setState({ loading: true })
    this.props.viewRecordStore.getRecords({ page, perPage: 60, type: 'route-change' })
      .then(() => this.setState({ loading: false }))
  }

  handleTogglePage = page => {
    this.fetchRecords(page.current)
  }

  get records() {
    const { list = [], page, perPage, total } = this.props.viewRecordStore.records
    const records = list.map(item => {
      const record = { ...item }
      record.created = dateFormater(item.created, true)
      record.title = <a href={item.info && item.info.url} target="new">{(item.info && item.info.title || '').replace(/-?小寒的博客-?/, '')}</a>
      return record
    })

    return { list: records, page, perPage, total }
  }

  render() {
    const { list, page, perPage, total } = this.records
    const { pvCount, uvCount, pvDayCount, uvDayCount } = this.props.viewRecordStore.pvAndUv
    const { loading } = this.state

    return (
      <div className="do-container">
        <Card title="总PV" text={pvCount} />
        <Card title="日PV" text={pvDayCount} />
        <Card title="总UV" text={uvCount} />
        <Card title="日UV" text={uvDayCount} />
        <Table
          loading={loading}
          rowKey={item => item._id}
          columns={columns}
          dataSource={list}
          pagination={{ current: page, pageSize: perPage, total }}
          onChange={this.handleTogglePage}
        />
      </div>
    )
  }
}
