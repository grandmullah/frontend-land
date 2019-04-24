import React, { Component } from 'react'
import Setprofile from './setprofile'
import PersonalProf from './personalprof'
import Lands from './Yourlands'
import { Row, Col } from 'react-bootstrap'
import '../App.css'

export default class profile extends Component {
    state = { dataKey: null }
  componentDidMount() {
    const contract = this.props.drizzle.contracts.Identity
    const datakey = contract.methods['returnid'].cacheCall(this.props.drizzleState.accounts[0])
    this.setState({ datakey: datakey })
  }
  render() {
     const { Identity } = this.props.drizzleState.contracts
    const profile = Identity.returnid[this.state.datakey]
    const regis = profile && profile.value.re
 
    if(regis) {
      return (
        <div className='App' >
           <>
             <Row>
               <Col>
                 <PersonalProf  drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
               </Col>
               <Col>
                 <Lands  drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
               </Col>
               <Col>
                 slfjjkl
               </Col>
             </Row> 
           </>
        </div>  
      )
    }
    return (
      <div className='App'>
        <Setprofile  drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
      </div>
    )
  }
}
