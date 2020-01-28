import React from 'react'
import { inject, observer } from 'mobx-react'
import { LineChart, Tooltip, XAxis, CartesianGrid, Line, Legend } from 'recharts'

export function Chart(props) {
  if (!props.data || !props.data.length) {
    return <div style={{ padding: '100px 0' }}>暂无数据</div>
  }

  const data = JSON.parse(JSON.stringify(props.data))
  const width = props.data.length * 60 > 1000 ? props.data.length * 60 : 1000

  return (
    <LineChart width={width} height={450} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <XAxis dataKey="date" />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="pv" stroke="#3399ff" yAxisId={0} />
      <Line type="monotone" dataKey="uv" stroke="#ff9933" yAxisId={0} />
      <Legend />
    </LineChart>
  )
}

const durationSelects = [30, 15, 7]

@inject('viewRecordStore')
@observer
export default class ViewRecordList extends React.Component {
  state = {
    duration: 7
  }

  componentDidMount() {
    this.fetchData()
  }

  handleDurationChanage = duration => {
    this.setState({ duration }, this.fetchData)
  }

  fetchData = () => {
    this.props.viewRecordStore.getAnalysis(this.state.duration)
  }

  render() {
    const analysis = this.props.viewRecordStore.analysis
    const currentDuration = this.state.duration

    return (
      <div className="do-container view-record-chart-page">
        <div className="view-record-chart-card">
          <div className="head-row">
            <h4>访问量统计</h4>
            <div className="duration-select">
              {durationSelects.map(item => (
                <span
                  key={item}
                  className={item === currentDuration ? 'active' : ''}
                  onClick={() => this.handleDurationChanage(item)}
                >
                  {item}天内
                </span>
              ))}
            </div>
          </div>

          <div className="view-record-chart-wrapper">
            <Chart data={analysis} />
          </div>
        </div>
      </div>
    )
  }
}
