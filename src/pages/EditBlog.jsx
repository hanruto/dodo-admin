import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Select from 'antd/lib/select'
import Radio from 'antd/lib/radio'
import Modal from 'antd/lib/modal'
import Button from 'antd/lib/button'
import logo from '../imgs/dodo-logo.png'
import Editor from '../components/Editor'
import BraftEditor from 'braft-editor'
import needLogin from '../util/needLogin'


@needLogin
class EditBlog extends React.Component {
  defaultBlog = {
    type: 1,
    tags: [],
    title: '',
    content: '',
  }

  state = {
    blog: this.defaultBlog,
    successModalVisible: false,
    editorState: null,
    tagSelects: [],
  }

  componentDidMount() {
    this.initialize()
    this.initListener()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.initialize()
    }
  }

  componentWillUnmount() {
    clearInterval(this.saveTimer)
  }

  initListener = () => {
    this.saveTimer = setInterval(this.handleSaveInLocal, 10000)
  }

  initialize = () => {
    this.blogId = this.props.match.params.blogId
    this.mode = ['add', 'restore'].includes(this.blogId) ? this.blogId : 'update'

    axios.get('/articles/tags')
      .then(tagSelects => this.setState({ tagSelects }))

    if (this.mode === 'add') {
      this.setState({ blog: this.defaultBlog })
    } else if (this.mode === 'restore') {
      const blogStr = localStorage.getItem('current-edit-blog')
      const blog = blogStr ? JSON.parse(blogStr) : {}
      const editorState = BraftEditor.createEditorState(blog.content)
      this.blogId = blog._id
      this.setState({ blog, editorState })
    } else {
      axios.get(`/articles/${this.blogId}`)
        .then(blog => {
          blog.tags = blog.tags ? blog.tags.map(item => item.value) : []
          this.setState({ blog, editorState: BraftEditor.createEditorState(blog.content) })
        })
    }
  }

  handleSubmit = (e, isDraft) => {
    e.preventDefault()
    const { tagSelects, editorState, blog: currentBlog } = this.state

    const blog = { ...currentBlog }
    blog.content = editorState.toHTML()
    blog.tags = blog.tags.map(tag => (tagSelects.find(item => item.value === tag) || { value: tag }))
    blog.draft = !!isDraft
    if (this.mode !== 'add') {
      axios.put(`/articles/${this.blogId}`, blog)
        .then(() => this.setState({ successModalVisible: true }))
    } else {
      axios.post('/articles', blog)
        .then(blog => {
          this.blogId = blog._id
          this.setState({ successModalVisible: true })
        })
    }
  }

  handleEdit = (value, attr) => {
    const { blog } = this.state
    blog[attr] = value
    this.setState({ blog })
  }

  handleChangeTags = (value) => {
    const { blog } = this.state
    blog.tags = value
    this.setState({ blog })
  }

  handleReturn = () => {
    this.props.history.push('/app/blogs')
  }

  handleCancel = () => {
    this.setState({ successModalVisible: false })
  }

  handleChangeEditorState = editorState => {
    this.setState({ editorState })
  }

  handleRenew = () => {
    this.setState({ successModalVisible: false })
    if (this.props.location.pathname !== '/app/blogs/add') {
      this.props.history.push('/app/blogs/add')
    }
  }

  handleContinueEdit = () => {
    this.setState({ successModalVisible: false })
    if (this.props.location.pathname === '/app/blogs/add') {
      this.props.history.push(`/app/blogs/${this.blogId}`)
    }
  }

  handlePreview = () => {
    this.props.history.push(`/app/blogs/${this.blogId}/view`)
  }

  handleSaveInLocal = () => {
    const blog = this.state.blog
    blog.content = this.state.editorState.toHTML()
    localStorage.setItem('current-edit-blog', JSON.stringify(blog))
  }

  render() {
    const { type, title, tags } = this.state.blog
    const { successModalVisible, editorState } = this.state
    const { tagSelects } = this.state

    return (
      <div className="blog-edit-page">
        <div className="blog-view-head">
          <div className="blog-view-logo">
            <img src={logo} alt="" />
          </div>

          <div className="pull-right">
            {this.mode !== 'add' && <Link to={`/app/blogs/${this.blogId}/view`}><span style={{ marginRight: 10 }}>查看</span></Link>}
            <Link to={'/app/blogs'}>返回</Link>
          </div>
        </div>
        <div className="do-container">
          <form onSubmit={this.handleSubmit}>
            <div className="do-group">
              <Radio.Group onChange={e => this.handleEdit(e.target.value, 'type')} value={type}>
                <Radio value={1}>技术博客</Radio>
                <Radio value={2}>生活随笔</Radio>
              </Radio.Group>
            </div>
            <div className="do-group">
              <input type="text" value={title} onChange={e => this.handleEdit(e.target.value, 'title')} className="do-input" placeholder="这里写标题" />
            </div>
            <div className="do-group">
              <Select
                mode="tags"
                value={tags}
                style={{ width: '100%' }}
                tokenSeparators={[',']}
                onChange={this.handleChangeTags}
              >
                {tagSelects.map((tag) => <Select.Option key={tag._id} value={tag.value}>{tag.value}</Select.Option>)}
              </Select></div>
            <div className="do-group">
              <Editor value={editorState} onChange={this.handleChangeEditorState} />
            </div>
            <div className="do-group">
              <Button type="primary" style={{ width: 120 }} onClick={this.handleSubmit}>提交</Button>
              <Button onClick={() => this.handleSaveInLocal()} style={{ width: 120, marginLeft: 10 }}>保存在本地</Button>
            </div>
          </form>

          <Modal
            title="提交成功"
            visible={successModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleReturn}
            footer={[
              <Button key="view" type="primary" onClick={this.handlePreview}>查看</Button>,
              <Button key="again" type="primary" onClick={this.handleRenew}>再来一篇</Button>,
              <Button key="submit" onClick={this.handleContinueEdit}>
                继续编辑
              </Button>,
              <Button key="back" onClick={this.handleReturn}>返回列表</Button>,
            ]}
          >
            {this.mode === 'add' ? '恭喜你完成了一篇巨作' : '修改完成啦'}
          </Modal>
        </div>
      </div>
    )
  }
}

export default EditBlog
