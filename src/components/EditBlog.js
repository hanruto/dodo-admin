import React from 'react'
import Editor from './tools/Editor'
import axios from 'axios'

import { Select, Radio } from 'antd';

export default class AddBlog extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            tags: [],
            type: 1,
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
                blogId: this.props.blog._id,
                type: this.props.type
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
        const data = {
            content: this.state.content,
            tags: this.state.tags,
            title: this.state.title,
            type: this.state.type,
            created: new Date(Date.now() - Math.random() * (5 * 24 * 3600 * 1000))
        };
        if (this.state.blogId) {
            axios.put('/blogs/' + this.state.blogId, data).then(res => {
                this.props.handleBlogChange && this.props.handleBlogChange(res.data);
            })
        } else {
            axios.post('/blogs', data)
        }
    }

    render() {
        return (
            <div className="do-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="do-group">
                        <Radio.Group onChange={e => this.setState({ type: e.target.value })} value={this.state.type}>
                            <Radio value={1}>技术博客</Radio>
                            <Radio value={2}>生活随笔</Radio>
                        </Radio.Group>
                    </div>
                    <div className="do-group">
                        <input type="text" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} className="do-input" placeholder="这里写标题" />
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
