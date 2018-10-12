import React from 'react'
import { Popconfirm, Icon } from 'antd'


export default class ConfirmDelete extends React.Component {
  componentWillMount() {
    this.onConfirm = () => {
      this.props.onConfirm()
    }
  }

  render() {
    return <Popconfirm title={'想好要删除了么?'} onConfirm={() => this.onConfirm()} okText="想好了" cancelText="算了">
      <Icon className="action" type="delete" />
    </Popconfirm>
  }
}
