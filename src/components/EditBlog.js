import React from 'react'
import Editor from './tools/Editor'
import axios from 'axios'

import { Select } from 'antd';

export default class AddBlog extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            tags: [],
            content: '',
            children: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        if (this.props.blog) {
            this.setState({
                title: this.props.blog.title,
                tags: this.props.blog.tags,
                content: this.props.blog.content,
                blogId: this.props.blog._id
            })
        }
        axios.get('/blogs/tags')
            .then(res => {
                this.setState({ children: res.data })
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        // 如果传入了id的话那么editBlog组件回去更新这个blog
        if (this.state.blogId) {
            axios.put('/blogs/' + this.state.blogId, {
                content: this.state.content,
                tags: this.state.tags,
                title: this.state.title
            }).then(res => {
                this.props.handleBlogChange && this.props.handleBlogChange(res.data);
            })
        } else {
            axios.post('/blogs', {
                content: this.state.content,
                tags: this.state.tags,
                title: this.state.title
            })
        }
    }

    render() {
        return (
            <div className="do-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="do-group">
                        <input type="text" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} className="do-input" placeholder="标题" />
                    </div>
                    <div className="do-group">
                        <Select
                            mode="tags"
                            defaultValue={this.state.tags}
                            style={{ width: '100%' }}
                            tokenSeparators={[',']}
                            onChange={tags => this.setState({ tags })}
                        >
                            {this.state.children.map((tag, index) => <Select.Option key={tag}>{tag}</Select.Option>)}
                        </Select></div>
                    <div className="do-group">
                        <Editor content={this.state.content} onChange={content => this.setState({ content })} placeholder="说点什么吧" />
                    </div>
                    <div className="do-group">
                        <button className="do-btn">写完了</button>
                    </div>
                </form>
            </div>
        )
    }
}
