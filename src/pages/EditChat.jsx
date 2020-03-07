import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'antd/lib/button'
import message from 'antd/lib/message'
import logo from '../imgs/dodo-logo.png'
import needLogin from '../util/needLogin'
import { observer, inject } from 'mobx-react'


@needLogin
@inject('chatStore')
@observer
class EditChat extends React.Component {
  type = 'add' // edit | add

  state = {
    content: this.defaultChat,
    title: '',
    key: '',
  }

  constructor(props){
    super(props)
    const id = this.props.match.params.chatId
    this.type = id === 'add' ? 'add' : 'edit'
    this.chatId = this.props.match.params.chatId
  }

  async componentDidMount() {
    if(this.type === 'edit'){
      await this.props.chatStore.getChat(this.chatId)
      const { content, title, key } = this.props.chatStore.currentChat
      this.setState({ content, title, key })
    }
  }

  handleFormChange = (filed, value) => {
    this.setState({ [filed]: value })
  }

  handleSave = async () => {
    const { content, title, key } = this.state
    const id = this.chatId

    this.type === 'edit'
      ? await this.props.chatStore.updateChat(id, { content, title, key })
      : await this.props.chatStore.saveChat({ content, title, key })
    
    message.success('保存成功')
    this.props.history.push('/app/chat')
  }

  render() {
    const { content, title, key } = this.state

    return (
      <div className="do-page chat-edit-page">
        <div className="do-common-head">
          <div className="do-common-logo">
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
              <input
                type="text" 
                value={key} 
                onChange={e => this.handleFormChange('key', e.target.value)} 
                className="do-input" 
                placeholder="索引" 
              />
            </div>
            <div className="do-group">
              <input 
                type="text" 
                value={title} 
                onChange={e => this.handleFormChange('title', e.target.value)} 
                className="do-input" 
                placeholder="标题"
              />
            </div>
            <div className="do-group">
              <textarea 
                value={content} 
                onChange={e => this.handleFormChange('content', e.target.value)} 
                className="do-textarea" 
                placeholder="内容" 
              />
            </div>
            <div className="do-action-row">
              <Button type="primary" style={{ width: 120 }} onClick={this.handleSave}>提交</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default EditChat
