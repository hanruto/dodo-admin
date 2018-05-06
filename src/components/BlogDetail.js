import React from 'react'
import axios from 'axios'
import { Icon, Tag } from 'antd'
import { Link } from 'react-router-dom'
import Editor from './tools/Editor'
import logo from '../imgs/dodo-logo.png'
import { dateFilter } from './tools/tool'
import EditBlog from './EditBlog'

class ViewBlog extends React.Component {
    render() {
        const blog = this.props.blog;
        return <div className="do-content-container">
            <div className="do-title">
                {blog.title}
            </div>
            <div>{blog.author} 写于 {dateFilter(blog.created)}</div>

            <div style={{ margin: '20px 0' }}>{blog.tags && blog.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
    }
}

export default class BlogDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            blog: {},
            mode: 'view'
        };
        this.onBlogChange = this.onBlogChange.bind(this);
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

    onBlogChange = blog => {
        let newBlog = this.state.blog;
        newBlog.content = blog.content;
        newBlog.title = blog.title;
        newBlog.tags = blog.tags;
        this.setState({ blog: newBlog })
    }

    render() {
        return <div className="full-page">
            <div className="do-header">
                <div className="do-container" style={{ paddingTop: 0 }}>
                    <Link to="/app/blogs/list">
                        <img className="logo" src={logo} />
                    </Link>
                    <div className="pull-right" style={{ lineHeight: '30px' }}>
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
                        ? <ViewBlog blog={this.state.blog} />
                        : <EditBlog blog={this.state.blog} handleBlogChange={this.onBlogChange} />
                }
            </div>
        </div >
    }
}

