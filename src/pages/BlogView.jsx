import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import logo from '../imgs/dodo-logo.png'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'
import needLogin from '../util/needLogin'
import { dateFormater } from '../util/tool'


@needLogin
class BlogView extends Component {
  blogId = this.props.match.params.blogId

  state = {
    blog: {},
  }

  componentDidMount() {
    axios.get(`/articles/${this.blogId}`)
      .then(blog => {
        this.setState({ blog })
      })
  }

  render() {
    const { blog } = this.state

    return (
      <div className="do-page blog-view-page">
        <div className="do-common-head blog-view-head">
          <div className="do-common-logo">
            <img src={logo} alt="" />
          </div>

          <div className="pull-right">
            <Link to={`/app/blogs/${this.blogId}`}>编辑</Link>
            <Link to={'/app/blogs'}><span style={{ marginLeft: 10 }}>返回</span></Link>
          </div>
        </div>
        <div className="blog-view-container">
          <h1 className="blog-title">{blog.title}</h1>
          <div className="blog-meta">{dateFormater(blog.created)}</div>
          <div className="blog-view-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    )
  }
}

export default BlogView
