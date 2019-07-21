import React from 'react'
import { inject, observer } from 'mobx-react'
import { LineChart, Tooltip, XAxis, CartesianGrid, Line, Legend } from 'recharts'

export function Chart(props) {
  const width = props.data.length * 60

  return (
    <LineChart width={width} height={450} data={props.data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <XAxis dataKey="date" />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="pv" stroke="#3399ff" yAxisId={0} />
      <Line type="monotone" dataKey="uv" stroke="#ff9933" yAxisId={0} />
      <Legend />
    </LineChart>
  )
}

@inject('viewRecordStore')
@observer
export default class ViewRecordList extends React.Component {
  componentDidMount() {
    this.props.viewRecordStore.getAnalysis()
  }

  render() {
    const analysis = this.props.viewRecordStore.analysis

    return (
      <div className="do-container view-record-chart-page">
        <div className="view-record-chart-card">
          <h4>访问量统计</h4>
          <div className="view-record-chart-wrapper">
            <Chart data={analysis} />
          </div>
        </div>
      </div>
    )
  }
}
