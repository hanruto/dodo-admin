import React from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { dateFilter } from '../util/tool'
import ConfirmDelete from '../components/ConfirmDelete'


export default class LeavedMessageList extends React.Component {
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

  fetch = (page = 1) => {
    axios.get('/leaved-messages', { params: { page } })
      .then(res => {
        const { list: blogs, count, perPage, page } = res.data
        blogs.forEach((item, index) => {
          item.title = <Link to={`/app/blogs/${item._id}/view`}>{item.title}</Link>
          item.created = dateFilter(item.created)
          item.updated = dateFilter(item.updated)
          item.author && (item.author = item.author.username)
          item.action = <ConfirmDelete onConfirm={() => this.handleDelete(item)} />
          item.key = index
        })
        this.setState({ blogs, count, perPage, page })
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
        key: 'nickname',
        dataIndex: 'nickname',
        title: '名字',
      }, {
        key: 'message',
        dataIndex: 'message',
        title: '留言',
        width: 600,
      }, {
        key: 'created',
        dataIndex: 'created',
        title: '发表时间',
      }, {
        key: 'action',
        dataIndex: 'action',
        title: '操作',
      },
    ]
    const { blogs, selectable } = this.state

    return <div className="do-container">
      <Table
        rowSelection={selectable ? { onChange: this.handleMutiSelect } : null}
        columns={columns}
        dataSource={blogs}
        pagination={false}
      />
    </div>
  }
}
