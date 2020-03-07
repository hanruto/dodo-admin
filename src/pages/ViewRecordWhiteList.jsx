import React from 'react'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import { inject, observer } from 'mobx-react'
import store from '../store'
import ConfirmDelete from '../components/ConfirmDelete'

const columns = [
  {
    key: 'ip',
    dataIndex: 'value',
    title: 'ip'
  },
  {
    key: 'action',
    title: '删除',
    width: 120,
    render(item) {
      const handleDelete = async () => {
        await store.viewRecordStore.removeIpItem(item.value)
        await store.viewRecordStore.getIpWhitelist()
      }

      return <ConfirmDelete onConfirm={handleDelete} />
    }
  }
]

@inject('viewRecordStore')
@observer
export default class ViewRecordWhiteList extends React.Component {
  state = {
    loading: true,
    inputedIp: '',
    modalVisible: false,
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = async () => {
    this.setState({ loading: true })
    await this.props.viewRecordStore.getIpWhitelist()
    this.setState({ loading: false })
  }

  handleOpen = () => {
    this.setState({ modalVisible: true })
  }

  handleClose = () => {
    this.setState({ modalVisible: false })
  }

  handleIpChange = e => {
    this.setState({ inputedIp: e.target.value })
  }

  handleAdd = async () => {
    const { inputedIp } = this.state
    await this.props.viewRecordStore.addIpItem(inputedIp)
    await this.fetch()
    this.setState({ modalVisible: false, inputedIp: '' })
  }

  render() {
    const { whitelist } = this.props.viewRecordStore
    const { loading, inputedIp, modalVisible } = this.state

    return (
      <div className="do-container view-record-whitelist-page">
        <div className="action-row">
          <Button type="primary" onClick={this.handleOpen}>新增白名单</Button>
        </div>

        <Table loading={loading} columns={columns} dataSource={whitelist} />

        <Modal
          visible={modalVisible}
          title="添加ip"
          onOk={this.handleAdd}
          onCancel={this.handleClose}
          okText={'确定'}
          cancelText={'取消'}
        >
          <Input placeholder="输入ip" value={inputedIp} onChange={this.handleIpChange} />
        </Modal>
      </div>
    )
  }
}
