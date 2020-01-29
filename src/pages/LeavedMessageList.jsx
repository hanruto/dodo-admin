import React from 'react'
import Table from 'antd/lib/table'
import axios from 'axios'
import { dateFormater } from '../util/tool'
import ConfirmDelete from '../components/ConfirmDelete'

const columns = [
  {
    key: 'nickname',
    dataIndex: 'nickname',
    title: '昵称',
    width: 120
  },
  {
    key: 'content',
    dataIndex: 'content',
    title: '留言',
    width: 700
  },
  {
    key: 'created',
    dataIndex: 'created',
    title: '发表时间'
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: '操作'
  }
]

export default class LeavedMessageList extends React.Component {
  state = {
    list: [],
    selectable: false,
    count: 0,
    perPage: 15,
    page: 1,
    loading: true,
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = (page = 1) => {
    this.setState({ loading: true })
    const perPage = 10
    axios.get('/comments', { params: { page, perPage, type: 2 } })
      .then(data => {
        const { list, total } = data
        const comments = list.map((item, index) => {
          item.created = dateFormater(item.created, true)
          item.user = item.type === 2 ? { username: '管理员' } : item.user
          item.action = <ConfirmDelete onConfirm={() => this.handleDelete(item)} />
          item.key = index
          return item
        })

        this.setState({ list: comments, count: total, perPage, page, loading: false })
      })
  }

  handleDelete = item => {
    this.setState()
    axios.delete(`/comments/${item._id}`)
      .then(() => this.fetch(this.state.page))
  }

  handleTogglePage = page => this.fetch(page)

  render() {
    const { list, loading, page, total, perPage } = this.state

    return (
      <div className="do-container">
        <Table
          loading={loading}
          className="leaved-message-table"
          columns={columns}
          dataSource={list}
          pagination={{ current: page, pageSize: perPage, total }} />
      </div>
    )
  }
}
