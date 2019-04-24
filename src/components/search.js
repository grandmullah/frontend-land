import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import Searched from './searched'
export default class search extends Component {
  constructor (props) {
    super(props)

    this.state = { dataKey: null, land: 'weretyu' }
    this.searched = this.searched.bind(this)
  }
  searched (item) {
    const dd = item
    this.setState({ land: dd })
  }
  componentDidMount () {
    const { drizzle, drizzleState } = this.props
    const contract = drizzle.contracts.Lands
    const dataKey = contract.methods['registeredLands'].cacheCall()
    this.setState({ dataKey })
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
    // console.log(this.state.land)
    return (
      <div className='App'>
      < >
        <Row>
          <Col md={4}>
            {LandArr.map((item) =>
              <div className='cot' key={item.ln} onClick={(e) => this.searched(item.ln, e)}>name:{item.ln}<br /> {item.sz} <br />{item.lo}
              </div>)}
          </Col>
          <Col>
            <Searched drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} land={this.state.land} />
          </Col>
        </Row>
      </>
      </div>
    )
  }
}
