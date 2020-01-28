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
    key: 'blog-title',
    dataIndex: 'blogId.title',
    title: '博客',
    width: 270,
  },
  {
    key: 'content',
    dataIndex: 'content',
    title: '留言',
    width: 500
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

const PAGE_SIZE = 60

export default class BlogComments extends React.Component {
  state = {
    list: [],
    selectable: false,
    count: 0,
    perPage: PAGE_SIZE,
    page: 1,
    loading: true,
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = (page = 1) => {
    this.setState({ loading: true })
    axios.get('/comments', { params: { page, perPage: PAGE_SIZE, type: 1 } })
      .then(data => {
        const { list, total } = data
        const comments = list.map((item, index) => {
          item.created = dateFormater(item.created, true)
          item.user = item.type === 2 ? { username: '管理员' } : item.user
          item.action = <ConfirmDelete onConfirm={() => this.handleDelete(item)} />
          item.key = index
          return item
        })

        this.setState({ list: comments, total, perPage: PAGE_SIZE, page, loading: false })
      })
  }

  handleDelete = item => {
    this.setState()
    axios.delete(`/comments/${item._id}`)
      .then(() => this.fetch(this.state.page))
  }

  handleTogglePage = pagination => this.fetch(pagination.current)

  render() {
    const { list, loading, page, perPage, total } = this.state

    return (
      <div className="do-container">
        <Table
          loading={loading}
          className="leaved-message-table"
          columns={columns}
          dataSource={list}
          pagination={{ current: page, pageSize: perPage, total }}
          onChange={this.handleTogglePage}
        />
      </div>
    )
  }
}
