import React from 'react'
import { Table, Icon, Button, Tag } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { dateFilter } from '../util/tool'
import ConfirmDelete from '../components/ConfirmDelete'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'


@inject('blogStore')
@observer
class BlogList extends React.Component {
  componentDidMount() {
    this.fetch()
    this.fetchTags()
  }

  fetch = () => {
    this.props.blogStore.list()
  }

  fetchTags = () => {
    this.props.blogStore.getTags()
  }

  handleDelete = item => {
    this.setState()
    axios.delete(`/articles/${item._id}`)
      .then(() => {
        this.fetch()
      })
  }

  handleAdd = () => {
    this.props.history.push('/app/blogs/add')
  }

  handleToggleManageMode = () => {
    this.setState({ selectable: !this.state.selectable })
  }

  handleTogglePage = page => this.fetch(page)

  get blogs(){
    const list = toJS(this.props.blogStore.blogs.list) || []

    return list.map(item => {
      item.title = <Link to={`/app/blogs/${item._id}/view`}>{item.title}</Link>
      item.created = dateFilter(item.created)
      item.updated = dateFilter(item.updated)
      item.author && (item.author = item.author.username)
      item.action = (
        <span>
          <Link to={`/app/blogs/${item._id}`}><Icon className="action" type="edit" /></Link>
          <ConfirmDelete onConfirm={() => this.handleDelete(item)} />
        </span>
      )

      return item
    })
  }

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

    const { blogs: { page, total, perPage }, tags } = this.props.blogStore

    return <div className="do-container">
      <div className="do-card">
        <span>标签：</span>
        {tags.map((tag, index) => {
          return <Tag key={index} closable={index !== 0} afterClose={() => this.handleClose(tag)}>{tag.value}</Tag>
        })}
      </div>
      <div className="clearfix">
        <div className="pull-right">
          <Button onClick={this.handleAdd}>新增</Button>
        </div>
      </div>
      <Table
        className="blog-list-table"
        rowKey={(blog, index) => blog._id + index}
        columns={columns}
        dataSource={this.blogs}
        pagination={{ current: Number(page), total, pageSize: perPage }}
      />
    </div>
  }
}

export default BlogList
