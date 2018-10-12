import React from 'react'
import { Table, Icon, Button, Select } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { dateFilter } from '../util/tool'
import ConfirmDelete from '../components/ConfirmDelete'


export default class AdminList extends React.Component {
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
      axios.get('/articles', { params: { page } })
        .then(res => {
          const { list: blogs, count, perPage, page } = res.data
          blogs.forEach((item, index) => {
            item.title = <Link to={`/app/blogs/${item._id}/view`}>{item.title}</Link>
            item.created = dateFilter(item.created)
            item.updated = dateFilter(item.updated)
            item.author && (item.author = item.author.username)
            item.action = <span>
              <Link to={`/app/blogs/${item._id}`}><Icon className="action" type="edit" /></Link>
              <ConfirmDelete onConfirm={() => this.handleDelete(item)} />
            </span>
            item.key = index
          })
          this.setState({ blogs, count, perPage, page })
        })
    }

    handleDelete = item => {
      this.setState()
      axios.delete(`/articles/${item._id}`)
        .then(() => {
          this.fetch(this.state.page)
        })
    }

    handleAdd = () => {
      this.props.history.push('/app/blogs/add')
    }

    handleChangeOrder = () => {

    }

    handleToggleManageMode = () => {
      this.setState({ selectable: !this.state.selectable })
    }

    handleTogglePage = page => this.fetch(page)

    render() {
      const columns = [
        {
          key: 'title',
          dataIndex: 'title',
          title: '标题',
        }, {
          key: 'author',
          dataIndex: 'author',
          title: '作者',
        }, {
          key: 'created',
          dataIndex: 'created',
          title: '发表时间',
        }, {
          key: 'updated',
          dataIndex: 'updated',
          title: '更新时间',
        }, {
          key: 'action',
          dataIndex: 'action',
          title: '操作',
        },
      ]
      const { blogs, selectable } = this.state

      return <div className="do-container">
        <div className="blog-list-header">
                排序方式： <Select defaultValue={1} style={{ width: 120 }} onChange={this.handleChangeOrder}>
            <Option value={1}>更新时间</Option>
            <Option value={2}>浏览次数</Option>
            <Option value={3}>点赞数量</Option>
          </Select>
          <div className="pull-right">
            <Button.Group>
              <Button onClick={this.handleToggleManageMode}>{selectable ? '取消管理' : '批量管理'}</Button>
              {selectable && (
                <React.Fragment>
                  <Button>删除</Button>
                  <Button>归档</Button>
                </React.Fragment>
              )}
              <Button onClick={this.handleAdd}>新增</Button>
            </Button.Group>
          </div>
        </div>
        <Table
          className="blog-list-table"
          rowSelection={selectable ? { onChange: this.handleMutiSelect } : null}
          columns={columns}
          dataSource={blogs}
          pagination={false}
        />
      </div>
    }
}
