import { Col } from 'react-bootstrap/Col';
import { Button, Row } from 'reactstrap'
import React, { Component } from 'react'
import { Modal, Form } from 'react-bootstrap'

export default class Allot extends Component {
  constructor (props) {
    super(props)
    this.state = { address: '', stackId: null }
    this.handleadd = this.handleadd.bind(this)
    this.handlesubmit = this.handlesubmit.bind(this)
  }
  handleadd (event) {
    this.setState({ address: event.target.value })
  }
  handlesubmit (event) {
    event.preventDefault()
    const contract = this.props.drizzle.contracts.Lands
    const landw = this.props.drizzle.web3.utils.fromAscii(this.props.land)
    const stackId = contract.methods['allotLand'].cacheSend(this.state.address, landw, {
      from:this.props.drizzlestate.accounts[0], gas:500000
    })
    this.setState({stackId: stackId})
  }
  GettxStatus = () => {
     const txHash = this.props.drizzlestate.transactionStack[this.state.StackId]
     if (!txHash) return null
     return `Transaction status: ${this.props.drizzlestate.transactions[txHash] && this.props.drizzlestate.transactions[txHash].status}`
  }
  render () {
    
    return (
      <Modal {...this.props}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Allotment of land
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           you are trying to Allot land number :<br />{this.props.land} <br />to a new  owner <br />
           you are under obligation to do the right thing with uttermost Intergrity<br /><br />
          <form onSubmit={this.handlesubmit} >
            <Form.Group as={Row}>
              <Form.Label> Address :</Form.Label>
                <Form.Control type='text' onChange={this.handleadd} />
            </Form.Group>
            <Form.Group>
              <Button type='submit' color='primary' size='lg' block> Allot Land</Button>
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
        <div >
         {this.GettxStatus()}
        </div>
      </Modal>
    )
  }
}
