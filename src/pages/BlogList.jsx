import React from 'react'
import Table from 'antd/lib/table'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import Radio from 'antd/lib/radio'
import Tag from 'antd/lib/tag'
import { toJS } from 'mobx'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { dateFormater } from '../util/tool'
import ConfirmDelete from '../components/ConfirmDelete'



const columns = [
  {
    key: 'title',
    dataIndex: 'title',
    title: '标题'
  },
  {
    key: 'tags',
    dataIndex: 'tags',
    title: '标签'
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

@inject('blogStore')
@observer
class BlogList extends React.Component {
  state = {
    tagEditable: false,
    selectedTags: [],
    blogType: null,
  }

  componentDidMount() {
    this.fetch()
    this.fetchTags()
  }

  fetch = params => {
    const { selectedTags, blogType } = this.state
    params = { ...params, ...{ tags: selectedTags, type: blogType } }
    return this.props.blogStore.list(params)
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
    this.props.blogStore.deleteTag(id).then(() => this.fetch())
  }

  handleBlogTypeChange = e => {
    const blogType = e.target.value
    this.setState({ blogType }, () => this.fetch())
  }

  handleAdd = () => {
    this.props.history.push('/app/blogs/add')
  }

  handleToggleManageMode = () => {
    this.setState({ selectable: !this.state.selectable })
  }

  handleTogglePage = pagination => this.fetch({ page: pagination.current })

  handleReStore = () => {
    this.props.history.push('/app/blogs/restore')
  }

  get blogs() {
    const list = toJS(this.props.blogStore.blogs.list) || []
    const { tags } = this.props.blogStore

    return list.map(item => {
      item.title = <Link to={`/app/blogs/${item._id}/view`}>{item.title}</Link>
      item.created = dateFormater(item.created)
      item.updated = dateFormater(item.updated)
      item.author && (item.author = item.author.username)
      item.tags =
        item.tags && item.tags.length
          ? item.tags.map(tagId => {
            const findTag = tags.find(tag => tag._id === tagId)
            const tagText = findTag && findTag.value
            if (!tagText) return null

            return (
              <span className="do-tag" key={tagId}>
                {tagText}
              </span>
            )
          })
          : '无'
      item.action = (
        <span>
          <Link to={`/app/blogs/${item._id}`}>
            <Icon className="action" type="edit" />
          </Link>
          <ConfirmDelete onConfirm={() => this.handleDelete(item._id)} />
        </span>
      )

      return item
    })
  }

  render() {
    const {
      blogs: { page, count, perPage },
      tags
    } = this.props.blogStore
    const { selectedTags, tagEditable, blogType } = this.state

    return (
      <div className="do-container">
        <div className="blog-list-head">
          <div className="blog-filter">
            <div className="blog-filter-item">
              <span>标签：</span>
              {tags.length
                ? tags.map((tag, index) => (
                  <Tag
                    key={index}
                    color={selectedTags.includes(tag._id) ? '#39f' : ''}
                    size={'large'}
                    closable={tagEditable}
                    onClick={() => this.handleToggleTag(tag._id)}
                    onClose={() => this.handleDeleteTag(tag._id)}
                  >
                    {tag.value}
                  </Tag>
                ))
                : '暂无'}
            </div>

            <div className="blog-filter-item">
              <span>类型：</span>
              <Radio.Group onChange={this.handleBlogTypeChange} value={blogType}>
                <Radio value={null}>全部</Radio>
                <Radio value={1}>公开</Radio>
                <Radio value={2}>私密</Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="blog-btns">
            <Button onClick={this.handleToggleTagStatus}>
              {tagEditable ? '取消编辑' : '编辑标签'}
            </Button>
            <Button type="primary" onClick={this.handleAdd}>
              写文章
            </Button>
            <Button onClick={this.handleReStore}>恢复编辑</Button>
          </div>
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
    )
  }
}

export default BlogList
