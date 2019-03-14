import React from 'react'
import { Table } from 'antd'
import axios from 'axios'
import { dateFormater } from '../util/tool'
import ConfirmDelete from '../components/ConfirmDelete'

const columns = [
  {
    key: 'username',
    dataIndex: 'username',
    title: '名字'
  },
  {
    key: 'blog',
    dataIndex: 'blog',
    title: '博客标题',
    width: 200
  },
  {
    key: 'message',
    dataIndex: 'message',
    title: '留言',
    width: 400
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
    blogs: [],
    selectable: false,
    count: 0,
    perPage: 15,
    page: 1
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = (page = 1) => {
    axios.get('/leaved-messages', { params: { page } }).then(data => {
      const { list, count, perPage, page } = data
      list.forEach((item, index) => {
        item.username = item.user && item.user.username
        item.blog = item.blog && item.blog.title
        item.message = item.message.replace(/<.*?>/g, '')
        item.created = dateFormater(item.created, true)
        item.action = <ConfirmDelete onConfirm={() => this.handleDelete(item)} />
        item.key = index
      })
      this.setState({ list, count, perPage, page })
    })
  }

  handleDelete = item => {
    this.setState()
    axios.delete(`/leaved-messages/${item._id}`).then(() => {
      this.fetch(this.state.page)
    })
  }

  handleTogglePage = page => this.fetch(page)

  render() {
    const { list } = this.state

    return (
      <div className="do-container">
        <Table columns={columns} dataSource={list} pagination={false} />
      </div>
    )
  }
}
