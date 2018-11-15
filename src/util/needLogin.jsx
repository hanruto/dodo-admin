import React from 'react'
import store from '../store'


console.log(store)
export default function needLogin(Component) {
  return class NeedLoginComponent extends React.Component {
    state = {
      checked: false,
      withoutLayout: false,
    }

    componentDidMount() {
      store.userStore.getInfo()
        .then(() => {
          this.setState({ checked: true })
          const { userInfo } = store.userStore
          if (!userInfo) {
            this.props.history.push('/login')
          }
        })
    }

    render() {
      const { checked } = this.state
      if (!checked) return null

      return <Component />
    }
  }
}
