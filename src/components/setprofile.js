import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Ipfs from '../ipfs'
import Profile from './personalprof.js'


export default class setprofile extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '', hash: '', ipfshash: '', StackId: null,he:'' }
    const { drizzle, drizzleState } = this.props
    this.handlesubmit = this.handlesubmit.bind(this)
    this.handlefile = this.handlefile.bind(this)
    this.handlename = this.handlename.bind(this)
    
  }
 
  handlename (event) {
    event.preventDefault()
    const nm = event.target.value
    this.setState({ name:nm })
  }
  handlefile (event) {
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () =>{
      this.setState({ hash:  Buffer(reader.result) })
      console.log(this.state.hash)
    }
    event.preventDefault()
  }
  handlesubmit (event) {
    event.preventDefault()
    Ipfs.files.add(this.state.hash, (error, result) => {
      if (error) {
        console.log(error)
        return
      }
      this.setState({ ipfshash: result[0].hash })
      console.log(this.state.ipfshash)
    
    })
     const contract = this.props.drizzle.contracts.Identity
     const stackId = contract.methods['register'].cacheSend( this.state.ipfshash,this.state.name, {
       from: this.props.drizzleState.accounts[0],
       gas: 500000
     })
    
     this.setState({
       StackId: stackId
     
    })
  }
     GettxStatus = () => {
       const txHash = this.props.drizzleState.transactionStack[this.state.StackId]
       if (!txHash) return null
       return `Transaction status: ${this.props.drizzleState.transactions[txHash] && this.props.drizzleState.transactions[txHash].status}`
     }
  
  render () {
    return (<div>
      <>
        <Row>
          <Col >
            <div className='formid'>
              <h2> register your identity</h2>
              <div className='form2'>
                <Form onSubmit={this.handlesubmit} >
                  <Form.Group>
                    <Form.Label> Name:</Form.Label>
                    <Form.Control type='text' onChange={this.handlename} />
                  </Form.Group >
                  <Form.Group>
                    <Form.Label> ID card :</Form.Label>
                    <Form.Control type='file' onChange={this.handlefile} />
                  </Form.Group>
                  <Form.Group>
                    <Button type='submit' color='primary' size='lg' block> UPLOAD </Button>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </></div>
    )
  }
}
