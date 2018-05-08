import React from 'react'
import axios from 'axios'
import { Upload, message, Button, Icon } from 'antd';

export default class ImageStore extends React.Component {

    onUpload = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    render() {
        return <Upload name="file" action="http://localhost:8081/files" onChange={this.onUpload} >
            <Button>
                <Icon type="upload" /> Click to Upload
            </Button>
        </Upload >
    }
}

