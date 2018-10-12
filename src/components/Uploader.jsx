import React from 'react'
import { Upload, message } from 'antd'
import { serverHost } from '../config/env'


export default class Uploader extends React.Component {
    onUpload = (info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success('uploaded successfully')
        this.props.onUploadEnd && this.props.onUploadEnd()
      } else if (info.file.status === 'error') {
        message.error('upload failed.')
      }
    }

    render() {
      return <Upload
        name="file"
        action={`${serverHost}/files`}
        onChange={this.onUpload}
        showUploadList={false}
        multiple={true}
      >
        <div className="do-btn btn-primary">Upload</div>
      </Upload>
    }
}

