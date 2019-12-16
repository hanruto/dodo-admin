import React from 'react'
import Table from 'antd/lib/table'
import Icon from 'antd/lib/icon'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import axios from 'axios'
import { dateFormater } from '../util/tool'
import ConfirmDelete from '../components/ConfirmDelete'

const columns = [
  {
    key: 'username',
    dataIndex: 'user.username',
    title: '名字'
  },
  {
    key: 'blog',
    dataIndex: 'blog.title',
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
    axios.get('/leaved-messages', { params: { page } })
      .then(data => {
        const { list, count, perPage, page } = data
        const leavedMessages = list.map((item, index) => {
          item.message = item.message.replace(/<.*?>/g, '')
          item.created = dateFormater(item.created, true)
          item.user = item.type === 2 ? { username: '管理员' } : item.user
          item.action = (
            <span>
              <a className="action" onClick={() => this.handleReply(item)}>
                <Icon type="message" className="link" />
              </a>
              <ConfirmDelete onConfirm={() => this.handleDelete(item)} />
            </span>
          )
          item.key = index
          return item
        })

        this.setState({ list: leavedMessages, count, perPage, page, loading: false })
      })
  }

  handleDelete = item => {
    this.setState()
    axios.delete(`/leaved-messages/${item._id}`).then(() => {
      this.fetch()
    })
  }

  handleReply = item => {
    let input = ''
    Modal.confirm({
      title: '回复',
      className: 'leaved-message-reply-modal',
      content: <Input placeholder="请输入要回复的内容" onChange={e => (input = e.target.value)} />,
      onOk: () => {
        const leavedMessage = {
          message: input,
          blog: item.blog._id,
          reply: item._id
        }

        axios.post('/leaved-messages/reply', leavedMessage).then(() => {
          this.fetch(this.state.page)
        })
      }
    })
  }

  handleTogglePage = page => this.fetch(page)

  render() {
    const { list, loading } = this.state

    return (
      <div className="do-container">
        <Table
          loading={loading}
          className="leaved-message-table"
          columns={columns}
          dataSource={list}
          pagination={false} />
      </div>
    )
  }
}
