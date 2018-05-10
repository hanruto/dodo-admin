import React from 'react'
import axios from 'axios'
import { Upload, message, Button, Icon } from 'antd';

import config from '../../config'

export default class Uploader extends React.Component {

    onUpload = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`uploaded successfully`);
            this.props.onUploadEnd && this.props.onUploadEnd();
        } else if (info.file.status === 'error') {
            message.error(`upload failed.`);
        }
    }

    render() {
        return <Upload name="file" action={`${config.adminHost}/files`} onChange={this.onUpload}
            showUploadList={false}
            multiple={true}>
            <div className="do-btn btn-primary">Upload</div>
        </Upload >
    }
}

