import React from 'react'
import axios from 'axios'
import Uploader from './tools/Uploader'

import { Table, Icon } from 'antd'
import { dateFilter } from './tools/tool';
import ConfirmDelete from './tools/ConfirmDelete'
export default class ImageList extends React.Component {

    state = {
        files: []
    }

    delete = file => {
        axios.delete('/files/' + file._id)
            .then(this.init)
    }

    init = () => {
        axios.get('/files')
            .then(res => {
                let files = res.data;
                files.forEach((file, index) => {
                    file.img = <div className="img-icon"><img src={'http://localhost:8081' + file.url} alt={file.originName} /></div>
                    file.key = index;
                    file.created = dateFilter(file.created);
                    file.action = <div>
                        <ConfirmDelete onConfirm={() => this.delete(file)} />
                    </div>
                })
                this.setState({ files })
            })
    }
    componentWillMount() {
        this.init();
    }


    render() {
        const columns = [{
            title: '图片',
            dataIndex: 'img',
            key: 'name',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '大小',
            dataIndex: 'size',
            key: 'size',
        }, {
            title: '上传日期',
            dataIndex: 'created',
            key: 'created',
        }, {
            title: '管理',
            dataIndex: 'action',
            key: 'action',
        }]
        return <div className="do-container">
            <Uploader onUploadEnd={this.init} />
            <Table style={{marginTop: '20px'}} className='img-list' pagination={{ size: 'small', pageSize: 20 }} columns={columns} dataSource={this.state.files} />
        </div>
    }
}

