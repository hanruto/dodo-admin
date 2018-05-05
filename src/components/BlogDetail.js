import React from 'react'
import axios from 'axios'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import Editor from './tools/Editor'
import logo from '../imgs/dodo-logo.png'
import { dateFilter } from './tools/tool'

class ViewBlog extends React.Component {
    render() {
        const blog = this.props.blog;
        return <div className="do-content-container">
            <div className="do-title">
                {blog.title}
            </div>
            <div>{blog.author} 写于 {dateFilter(blog.created)}</div>
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
    }
}

class EditBlog extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            content: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(content) {
        this.setState({ content })
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.put('/blogs/' + this.props.blog._id, this.state)
            .then(res => {
                this.props.handleBlogChange(res.data);
            })
    }

    componentWillMount() {
        if (this.props.blog) {
            this.setState({
                title: this.props.blog.title,
                content: this.props.blog.content
            })
        }
    }

    render() {
        return <form className="do-md-container" style={{ marginTop: 20 }} onSubmit={this.handleSubmit}>
            <div className="do-group">
                <input type="text" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} className="do-input" placeholder="标题" />
            </div>
            <div className="do-group">
                <Editor content={this.state.content} onChange={this.handleChange} placeholder="说点什么吧" />
            </div>
            <div className="do-group">
                <button className="do-btn">写完了</button>
            </div>
        </form>
    }
}
export default class BlogDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            blog: {},
            mode: 'view'
        };
    }
    componentWillMount() {
        const blogId = this.props.match.params.id;
        axios.get('/blogs/' + blogId)
            .then(res => {
                const blog = res.data;
                blog.author = blog.author.username;
                this.setState({ blog });
            });
    }

    render() {
        return <div className="full-page">
            <div className="do-header">
                <div className="do-md-container">
                    <img className="logo" src={logo} alt="" />
                    <div className="pull-right" style={{ lineHeight: '40px' }}>
                        {this.state.mode === 'view'
                            ? <span onClick={e => this.setState({ mode: 'edit' })} className="action">编辑</span>
                            : <span onClick={e => this.setState({ mode: 'view' })} className="action">取消</span>
                        }
                    </div>
                </div>
            </div>

            <div>
                {
                    this.state.mode === 'view'
                        ? <ViewBlog blog={this.state.blog} handleBlogChange={blog => this.setState({ blog })} />
                        : <EditBlog blog={this.state.blog} />
                }
            </div>
        </div >
    }
}

