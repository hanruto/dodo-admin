import React from 'react'
import { Table, Icon, Tag, Button } from 'antd'
import { Link } from 'react-router-dom'
import { dateFilter } from '../util/tool'
import ConfirmDelete from '../components/ConfirmDelete'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'


const columns = [
  {
    key: 'title',
    dataIndex: 'title',
    title: '标题',
  }, {
    key: 'tags',
    dataIndex: 'tags',
    title: '标签',
  }, {
    key: 'created',
    dataIndex: 'created',
    title: '发表时间',
  }, {
    key: 'updated',
    dataIndex: 'updated',
    title: '更新时间',
  }, {
    key: 'viewCount',
    dataIndex: 'viewCount',
    title: '浏览量',
    align: 'center',
  }, {
    key: 'action',
    dataIndex: 'action',
    title: '操作',
    align: 'center',
  },
]

@inject('blogStore')
@observer
class BlogList extends React.Component {
  state = {
    tagEditable: false,
    selectedTags: [],
  }

  componentDidMount() {
    this.fetch()
    this.fetchTags()
  }

  fetch = params => {
    params = { ...params, ...{ tags: this.state.selectedTags } }

    this.props.blogStore.list(params)
  }

  fetchTags = () => {
    this.props.blogStore.getTags()
  }

  handleToggleTag = tag => {
    if (this.state.tagEditable) return false

    const { selectedTags } = this.state
    const tagIndex = selectedTags.findIndex(item => item === tag)

    if (tagIndex !== -1) {
      selectedTags.splice(tagIndex, 1)
    } else {
      selectedTags.push(tag)
    }

    this.setState({ selectedTags }, () => this.fetch({ page: 1 }))
  }

  handleToggleTagStatus = () => {
    const { tagEditable } = this.state
    this.setState({ tagEditable: !tagEditable })
  }

  handleDelete = id => {
    this.setState()
    this.props.blogStore.delete(id)
  }

  handleDeleteTag = id => {
    this.props.blogStore.deleteTag(id)
      .then(() => this.fetch())
  }

  handleAdd = () => {
    this.props.history.push('/app/blogs/add')
  }

  handleToggleManageMode = () => {
    this.setState({ selectable: !this.state.selectable })
  }

  handleTogglePage = pagination => this.fetch({ page: pagination.current })

  get blogs() {
    const list = toJS(this.props.blogStore.blogs.list) || []

    return list.map(item => {
      item.title = <Link to={`/app/blogs/${item._id}/view`}>{item.title}</Link>
      item.created = dateFilter(item.created)
      item.updated = dateFilter(item.updated)
      item.author && (item.author = item.author.username)
      item.tags = item.tags && item.tags.length ? item.tags.map(tag => <span className="do-tag" key={tag._id}>{tag.value}</span>) : '无'
      item.action = (
        <span>
          <Link to={`/app/blogs/${item._id}`}><Icon className="action" type="edit" /></Link>
          <ConfirmDelete onConfirm={() => this.handleDelete(item._id)} />
        </span>
      )

      return item
    })
  }

  render() {
    const { blogs: { page, count, perPage }, tags } = this.props.blogStore
    const { selectedTags, tagEditable } = this.state

    return <div className="do-container">
      <div className="blog-list-head">
        <span>
          <span>标签：</span>
          {tags.length
            ? <React.Fragment>
              {
                tags.map((tag, index) => (
                  <Tag
                    key={index}
                    color={selectedTags.includes(tag._id) ? '#39f' : ''}
                    size={'large'}
                    closable={tagEditable}
                    onClick={() => this.handleToggleTag(tag._id)}
                    afterClose={() => this.handleDeleteTag(tag._id)}
                  >
                    {tag.value}
                  </Tag>
                ))
              }
              <Tag onClick={this.handleToggleTagStatus}>{tagEditable ? '取消' : '编辑'}</Tag>
            </React.Fragment>
            : '暂无'
          }

        </span>

        <Button type="primary" onClick={this.handleAdd}>写文章</Button>
      </div>
      <Table
        className="blog-list-table"
        rowKey={(blog, index) => blog._id + index}
        columns={columns}
        dataSource={this.blogs}
        pagination={count > perPage ? { current: Number(page), total: count, pageSize: perPage } : false}
        onChange={this.handleTogglePage}
      />

    </div>
  }
}

export default BlogList
