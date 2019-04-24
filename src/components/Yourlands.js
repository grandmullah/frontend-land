import React, { Component } from 'react'

export default class lands extends Component {
  constructor (props) {
    super(props)
    this.state = { datakey: null }
    const { drizzle, drizzleState } = this.props
  }
  componentDidMount () {
    const contract = this.props.drizzle.contracts.Lands
    const dataKey = contract.methods['owningLand'].cacheCall(this.props.drizzleState.accounts[0])
    this.setState({ dataKey })
  }
  render () {
    const { Lands } = this.props.drizzleState.contracts
    const lands = Lands.owningLand[this.state.dataKey]
    const vlue = lands && lands.value
    const lt = lands && lands.value.length
    const landsarr = []
    for (let i = 0; i < lt; i++) {
      const land = {
        ln: this.props.drizzle.web3.utils.toAscii(vlue[i])
      }
      landsarr.push(land)
    }
    console.log(vlue)
    return (
      <>
        {landsarr.map((item) =>
          <div className='cot' key={item.ln}>
            {item.ln}
         </div>)}
      </>
    )
  }
}
