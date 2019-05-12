import React from 'react'
import { inject, observer } from 'mobx-react'

import { LineChart, Tooltip, XAxis, CartesianGrid, Line } from 'recharts'

export function Chart(props) {
  const width = props.data.length * 40

  return (
    <LineChart width={width} height={400} data={props.data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <XAxis dataKey="label" />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="uv" stroke="#3399ff" yAxisId={0} />
    </LineChart>
  )
}

@inject('viewRecordStore')
@observer
export default class ViewRecordList extends React.Component {
  componentDidMount() {
    this.props.viewRecordStore.getAnalysis()
  }

  get analysis() {
    const analysis = this.props.viewRecordStore.analysis
    return analysis.map(item => ({ label: item.date, uv: item.viewCount }))
  }

  render() {
    console.log(this.analysis)

    return (
      <div className="do-container">
        <div className="view-record-chart-wrapper">
          <Chart data={this.analysis} />
        </div>
      </div>
    )
  }
}
