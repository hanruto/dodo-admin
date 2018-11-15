import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Select, Radio, Modal, Button } from 'antd'
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.initialize()
    }
  }

  initialize = () => {
    this.blogId = this.props.match.params.blogId
    this.mode = this.blogId === 'add' ? 'add' : 'update'
    axios.get('/articles/tags')
      .then(tagSelects => this.setState({ tagSelects }))

    if (this.mode !== 'add') {
      axios.get(`/articles/${this.blogId}`)
        .then(blog => {
          this.setState({ blog, editorState: BraftEditor.createEditorState(blog.content) })
        })
    } else {
      this.setState({ blog: this.defaultBlog })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    !this.state.blog.title && (this.state.blog.title = '无题')
    this.state.blog.content = this.state.editorState.toHTML()
    if (this.mode !== 'add') {
      axios.put(`/articles/${this.blogId}`, this.state.blog)
        .then(blog => {
          this.setState({ blog, successModalVisible: true })
        })
    } else {
      axios.post('/articles', this.state.blog)
        .then(blog => {
          this.blogId = blog._id
          this.setState({ blog, successModalVisible: true })
        })
    }
  }

  handleEdit = (value, attr) => {
    const { blog } = this.state
    blog[attr] = value
    this.setState({ blog })
  }

  handleChangeTags = (value) => {
    console.log(value)
  }

  handleSelectTag = tagId => {
    const { blog } = this.state
    blog.tags.push({ _id: tagId })
    this.setState({ blog })
  }

  handleDeSelectTag = tagId => {
    const { blog } = this.state
    blog.tags = blog.tags.filter(tag => tag.id !== tagId)
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
                onSelect={this.handleSelectTag}
                onDeselect={this.handleDeSelectTag}
              >
                {tagSelects.map((tag) => <Select.Option key={tag} value={tag._id}>{tag.value}</Select.Option>)}
              </Select></div>
            <div className="do-group">
              <div className="editor-wrapper">
                <Editor value={editorState} onChange={this.handleChangeEditorState} />
              </div>
            </div>
            <div className="do-group">
              <button className="do-btn do-btn-primary">提交</button>
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
