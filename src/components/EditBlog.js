import React from 'react'
import Editor from './tools/Editor'
import axios from 'axios'

export default class AddBlog extends React.Component {
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
        axios.post('/blogs', this.state)
            .then(res => {
                console.log(res)
            })
    }

    render() {
        return (
            <div className="do-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="do-group">
                        <input type="text" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} className="do-input" placeholder="标题" />
                    </div>
                    <div className="do-group">
                        <Editor onChange={this.handleChange} placeholder="说点什么吧" />
                    </div>
                    <div className="do-group">
                        <button className="do-btn">写完了</button>
                    </div>
                </form>
            </div>
        )
    }
}
