import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Registeredland from './registeredlands'
import Registration from './landtes'
export default class Registerland extends Component {
   state = { dataKey: null }
  componentDidMount() {
    const { drizzle, drizzleState } = this.props
    const contract = drizzle.contracts.Lands
    const dataKey = contract.methods['returngov'].cacheCall();
    this.setState({ dataKey }) 
  }
  render () {
    const { Lands } = this.props.drizzleState.contracts
    const id = Lands.returngov[this.state.dataKey]
    const idf = id&&id.value
    if(idf === this.props.drizzleState.accounts[0]){
    return (
      < div className = 'App' >
        < >
          <Row>
            <Col  md={4}>
              <Registeredland drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
            </Col>
            <Col md={1}>
              
            </Col>
            <Col>
              <Registration drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
            </Col>
          </Row>
        </>
      </div>
    )
  }
  return (
    <div className='App'>
      you are un authorized to view this page 
  </div>)
  }
  
}
