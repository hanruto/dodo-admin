import React from 'react'
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import { hzhjNetwork } from '../util/tool'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'
import classnames from 'classnames'

const PRIMARY_COLOR = '#368DF3'
const controls = [
  'font-size',
  'line-height',
  'text-align',
  'text-color',
  'list-ul',
  'list-ol',
  'code',
  'blockquote',
  'headings',
  'hr',
  'media',
  'emoji',
  'link',
  'remove-styles',
  'undo',
  'redo',
  'fullscreen'
]

BraftEditor.use(
  CodeHighlighter({
    includeEditors: ['editor-with-code-highlighter']
  })
)

export default class Editor extends React.Component {
  state = {
    contentSize: 'large'
  }

  handleUploadImage = ({ file, success }) => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      hzhjNetwork.post('upload/xiaohan', formData, { headers: { vf: 'xiaohangogogo' } }).then(res => {
        const url = res.data.data[0]
        success({ url })
      })
    }
  }

  handleToggleContentWidth = () => {
    const contentSize = this.state.contentSize === 'large' ? 'middle' : 'large'
    this.setState({ contentSize })
  }

  render() {
    const { value, onChange } = this.props
    const { contentSize } = this.state

    return (
      <div className={classnames('editor-wrapper', contentSize !== 'large' && 'editor-middle-width')}>
        <BraftEditor
          value={value}
          controls={controls}
          colors={[PRIMARY_COLOR, '#fff', '#666', '#999']}
          onChange={onChange}
          textBackgroundColor={false}
          media={{ uploadFn: this.handleUploadImage }}
          onSave={this.handleSaveInLocal}
          extendControls={[
            {
              key: 'button', // 控件唯一标识，必传
              type: 'button',
              title: '按照720px的宽度展示', // 指定鼠标悬停提示文案
              className: '', // 指定按钮的样式名
              text: 'W',
              onClick: this.handleToggleContentWidth
            }
          ]}
        />
      </div>
    )
  }
}
