import React from 'react'
import axios from 'axios'
import { Icon, Table } from 'antd'

import ConfirmDelete from '../components/ConfirmDelete'

export default class leaveWordList extends React.Component {
    state = {
        leaveWords: []
    }

    delete = (data) => {
        axios.delete('/leave-words/' + data._id)
            .then(this.init)
    }

    init = () => {
        axios.get('/leave-words')
            .then(res => this.setState({ leaveWords: res.data }))
    }
    componentWillMount() {
        this.init()
    }

    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
        }, {
            title: '管理',
            dataIndex: 'action',
            key: 'action',
        }]

        return (
            <div className="do-container">
                <Table
                    dataSource={this.state.leaveWords.map((data, index) => {
                        data.key = index
                        data.action = <ConfirmDelete onConfirm={() => this.delete(data)} />
                        return data
                    })}
                    columns={columns}
                    pagination={false}
                />
            </div>
        )
    }
}