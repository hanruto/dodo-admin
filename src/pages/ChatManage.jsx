import React from 'react'
import Table from 'antd/lib/table'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import { toJS } from 'mobx'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { dateFormater } from '../util/tool'
import ConfirmDelete from '../components/ConfirmDelete'


const columns = [
  {
    key: 'key',
    dataIndex: 'key',
    title: '索引'
  },
  {
    key: 'title',
    dataIndex: 'title',
    title: '标题'
  },
  {
    key: 'created',
    dataIndex: 'created',
    title: '发表时间'
  },
  {
    key: 'updated',
    dataIndex: 'updated',
    title: '更新时间'
  },
  {
    key: 'viewCount',
    dataIndex: 'viewCount',
    title: '浏览量',
    align: 'center'
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: '操作',
    align: 'center'
  }
]

@inject('chatStore')
@observer
class ChatManage extends React.Component {
  state = {
    loading: true
  }

  async componentDidMount(){
    this.setState({ loading: true })
    await this.props.chatStore.getChatList()
    this.setState({ loading: false })
  }

  handleDelete = async key => {
    this.setState({ loading: true })
    await this.props.chatStore.deleteChat(key)
    await this.props.chatStore.getChatList(key)
    this.setState({ loading: false })
  }

  handleAdd = () => {
    this.props.history.push('/app/chats/add')
  }

  get chats() {
    const list = toJS(this.props.chatStore.chatList.list) || []

    return list.map(item => {
      item.created = dateFormater(item.created)
      item.updated = dateFormater(item.updated)
      item.action = (
        <span>
          <Link to={`/app/chats/${item._id}`}>
            <Icon className="action" type="edit" />
          </Link>
          <ConfirmDelete onConfirm={() => this.handleDelete(item.key)} />
        </span>
      )

      return item
    })
  }

  render() {
    const { chatList: { count, perPage, page } } = this.props.chatStore
    const { loading } = this.state

    return (
      <div className="do-container chat-manage-page">
        <div className="do-action-row">
          <Button type="primary" onClick={this.handleAdd}>
            新增聊天剧本
          </Button>
        </div>
        <Table
          loading={loading}
          className="blog-list-table"
          rowKey={(item, index) => item.key + index}
          columns={columns}
          dataSource={this.chats}
          pagination={count > perPage ? { current: Number(page), total: count, pageSize: perPage } : false}
          onChange={this.handleTogglePage}
        />
      </div>
    )
  }
}

export default ChatManage
