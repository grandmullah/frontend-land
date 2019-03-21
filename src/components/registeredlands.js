import React from 'react'

export default class Registeredlands extends React.Component {
  
    state = { dataKey: null }
  
  componentDidMount () {
    const { drizzle } = this.props
    const contract = drizzle.contracts.Lands
    console.log(contract)
    const dataKey = contract.methods['registeredLands'].cacheCall();
    this.setState({ dataKey })
    console.log(dataKey)
  }

  render () {
    const { Lands } = this.props.drizzleState.contracts
    const registeredlands = Lands.registeredLands[this.state.dataKey]
    console.log(registeredlands)
    return (
      <p>
        {registeredlands && registeredlands.value}
      </p>
    )
  }
}
