import React from 'react'
import axios from 'axios'
import Uploader from './tools/Uploader'

import { Table, Icon, Pagination } from 'antd'
import { dateFilter } from './tools/tool'
import ConfirmDelete from './tools/ConfirmDelete'
import config from '../config'

export default class ImageList extends React.Component {

    limit = 15
    state = {
        files: [],
        page: 1
    }

    delete = file => {
        axios.delete('/files/' + file._id)
            .then(this.init)
    }

    init = (option) => {
        option = option || {};
        const page = option.page || this.state.page;
        const limit = option.limit || this.limit;
        axios.get('/files', { params: { page, limit } })
            .then(res => {
                let files = res.data.docs;
                files && files.forEach((file, index) => {
                    file.img = <div className="img-icon"><img src={config.adminHost + file.url} alt={file.originName} /></div>
                    file.key = index;
                    file.created = dateFilter(file.created);
                    file.action = <div>
                        <ConfirmDelete onConfirm={() => this.delete(file)} />
                    </div>
                })
                const totalCount = res.data.count;
                const page = res.data.page;
                this.setState({ files, page, totalCount })
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
            <Table style={{ marginTop: '20px' }} className='img-list' columns={columns} dataSource={this.state.files} pagination={false} />
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
                <Pagination
                    total={this.state.totalCount}
                    pageSize={this.limit}
                    defaultCurrent={1}
                    defaultPageSize={this.limit}
                    current={this.state.page}
                    onChange={page => { this.setState({ page }); this.init({ page }) }}
                />
            </div>
        </div>
    }
}

