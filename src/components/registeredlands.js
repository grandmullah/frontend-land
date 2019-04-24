import React from 'react'
import Allot from './AllotModal'

export default class Registeredland extends React.Component {
  constructor (props) {
    super(props)
    this.state = { dataKey: null, land: '', modalIsOpen: false }
    this.openModal = this.openModal.bind(this)
  }
  componentDidMount () {
    const { drizzle, drizzleState } = this.props
    const contract = drizzle.contracts.Lands
    const dataKey = contract.methods['registeredLands'].cacheCall()
    this.setState({ dataKey })
  }
  openModal (item) {
    const dd = item
    this.setState({ land: dd })
    this.setState({ modalIsOpen: true })
  }
  render () {
    const { Lands } = this.props.drizzleState.contracts
    const registeredlands = Lands.registeredLands[this.state.dataKey]
    const lb = registeredlands && registeredlands.value
    const lt = registeredlands && registeredlands.value[0].length
    const lna = 0
    const loa = 1
    const sza = 2
    const LandArr = []
    for (let i = 0; i < lt; i++) {
      const lands = {
        ln: this.props.drizzle.web3.utils.toAscii(lb[lna][i]),
        sz: this.props.drizzle.web3.utils.toAscii(lb[sza][i]),
        lo: this.props.drizzle.web3.utils.toAscii(lb[loa][i])
      }
      LandArr.push(lands)
    }
    let modalClose = () => this.setState({ modalIsOpen: false })
    return (
      <div>
        {LandArr.map((item) =>
          <div className='cot' key={item.ln} onClick={(e) => this.openModal(item.ln, e)}>
            name:{item.ln}<br />
            {item.sz} <br />
            {item.lo}
          </div>
        )}
        <Allot show={this.state.modalIsOpen} land={this.state.land} onHide={modalClose} drizzle={this.props.drizzle} drizzlestate={this.props.drizzleState} />
      </div>
    )
  }
}
