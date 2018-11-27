import React from 'react'
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import { hzhjNetwork } from '../util/tool'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'


BraftEditor.use(CodeHighlighter({
  includeEditors: ['editor-with-code-highlighter'],
}))

export default class Editor extends React.Component {
  handleUploadImage = ({ file, success }) => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      hzhjNetwork.post('upload/xiaohan', formData, { headers: { 'vf': 'xiaohangogogo' } })
        .then(res => {
          const url = res.data.data[0]
          success({ url })
        })
    }
  }

  render() {
    const { value, onChange } = this.props

    return (
      <BraftEditor
        value={value}
        onChange={onChange}
        textBackgroundColor={false}
        media={{ uploadFn: this.handleUploadImage }}
        onSave={this.handleSaveInLocal}
      />
    )
  }
}
