import React from 'react'
import { Table, Icon, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { dateFilter } from './tools/tool'
import ConfirmDelete from './tools/ConfirmDelete'

export default class AdminList extends React.Component {
    constructor() {
        super();
        this.state = {
            blogs: []
        }
        this.delete = this.delete.bind(this);
    }

    delete(item) {
        this.setState()
        axios.delete('/blogs/' + item._id)
            .then(res => {
                let blogs = this.state.blogs.filter(blog => blog._id !== item._id)
                this.setState({ blogs })
            });
    }

    componentWillMount() {
        axios.get('/blogs')
            .then(res => {
                let blogs = res.data;
                blogs.forEach((item, index) => {
                    item.created = dateFilter(item.created);
                    item.updated = dateFilter(item.updated);
                    item.author && (item.author = item.author.username);
                    item.action = <span>
                        <ConfirmDelete onConfirm={() => this.delete(item)} />
                        <Link to={"/app/blogs/" + item._id} target="_blank">
                            <Icon className="action" type="edit" />
                        </Link>
                    </span>
                    item.key = index
                });
                this.setState({ blogs: res.data })
            });
    }
    render() {
        const columns = [
            {
                key: 'title',
                dataIndex: 'title',
                title: '标题'
            }, {
                key: 'author',
                dataIndex: 'author',
                title: '作者'
            }, {
                key: 'created',
                dataIndex: 'created',
                title: '发表时间'
            }, {
                key: 'updated',
                dataIndex: 'updated',
                title: '更新时间'
            }, {
                key: 'action',
                dataIndex: 'action',
                title: '操作'
            }
        ]

        return <div className="do-container">
            <Table pagination={{ size: 'small', pageSize: 20 }} columns={columns} dataSource={this.state.blogs} />
        </div>
    }
}