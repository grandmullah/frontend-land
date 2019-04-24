import React, { Component } from 'react'

export default class personalProf extends Component {
  
  state = { dataKey: null }
  
  componentDidMount () {
    const { drizzle, drizzleState } = this.props
    const contract = this.props.drizzle.contracts.Identity
    const datakey = contract.methods['returnid'].cacheCall(this.props.drizzleState.accounts[0])
    this.setState({datakey})
    
  }
  render () {
    const { Identity } = this.props.drizzleState.contracts
    const profile = Identity.returnid[this.state.datakey]
    const val = profile && profile.value
    const valt = profile && profile.value[0]
    const val1 =  profile && profile.value[1]
    const img = 'https://ipfs.io/ipfs/'+valt 
    return (
      <div className = 'formgov' >
        <h1>This is Your Profile {val1} </h1>
        <div >
          <img src={img} alt=''/> ,<br />
          {}
        </div>
      </div>
    )
  }
}
