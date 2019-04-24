import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import Form from 'react-bootstrap/Form'
import Ipfs from '../ipfs'


export default class Registration extends React.Component {
  constructor (props) {
    super(props)
    const { drizzle, drizzleState } = this.props
    this.state = { landnumber: '', size: '', location: '', lat: '', log: '', title: '', StackId: null, ipfshash: '', date:'' }
    this.handlelandnumber = this.handlelandnumber.bind(this)
    this.handlelandsize = this.handlelandsize.bind(this)
    this.handlelandlocation = this.handlelandlocation.bind(this)
    this.handlelandlat = this.handlelandlat.bind(this)
    this.handlelandlog = this.handlelandlog.bind(this)
    this.handlelandfile = this.handlelandfile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    
  }
  handlelandnumber (event) {
    const ln = this.props.drizzle.web3.utils.fromAscii(event.target.value)
    this.setState({ landnumber: ln })
    event.preventDefault() 
    const dy = new Date()
    const dy2 = dy.toString()
    console.log(dy)
    this.setState({date:dy2})
  }
  handlelandsize (event) {
    const z = this.props.drizzle.web3.utils.fromAscii(event.target.value)
    this.setState({ size: z })
    event.preventDefault()
  }
  handlelandlocation (event) {
    const yn = this.props.drizzle.web3.utils.fromAscii(event.target.value)
    this.setState({ location: yn })
    event.preventDefault()
  }
  handlelandlat (event) {
    this.setState({ lat: event.target.value })
   event.preventDefault()
  }
  handlelandlog (event) {
    this.setState({ log: event.target.value })
    event.preventDefault()
  }
  handlelandfile (event) {
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () =>{
      this.setState({ title:  Buffer(reader.result) })
     console.log(this.state.title)
    }
    event.preventDefault()
  }
  handleSubmit (event) {
    event.preventDefault()
    Ipfs.files.add(this.state.title, (error,result) => {
      if(error){
        console.log(error)
        return
      }
        this.setState({ ipfshash: result[0].hash })
         console.log(this.state.ipfshash)
 
       })
     
    console.log(this.state.date)
    const contract = this.props.drizzle.contracts.Lands
    const stackId = contract.methods['registerLand'].cacheSend(this.state.landnumber, this.state.size, this.state.location,this.state.log, this.state.lat, this.state.date, this.state.ipfshash,{
      from:this.props.drizzleState.accounts[0], gas:500000
    })
    this.setState({ StackId: stackId })
  }
  GettxStatus = () => {
    const txHash = this.props.drizzleState.transactionStack[this.state.StackId]
    if(!txHash) return null
    return `Transaction status: ${this.props.drizzleState.transactions[txHash] && this.props.drizzleState.transactions[txHash].status}`
  }
  render () {
    return (
      <div>
        <>
          <Row>
            <Col >
              <div className='formid'>
                <h2> Register Land </h2>
                <div className='form2'>
                  <form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} >
                      <Form.Label column sm={3} >LandNumber:</Form.Label>
                      <Col>
                        <Form.Control type='text' onChange={this.handlelandnumber} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={3} >Size:</Form.Label>
                      <Col>
                        <Form.Control type='text'onChange={this.handlelandsize} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={3} >Location</Form.Label>
                      <Col>
                        <Form.Control type='text' onChange={this.handlelandlocation} />
                      </Col>
                    </Form.Group>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label >lat</Form.Label>
                        <Form.Control type='text' onChange={this.handlelandlat} />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label >log</Form.Label>
                        <Form.Control type='text'onChange={this.handlelandlog} />
                      </Form.Group>
                    </Form.Row>
                    <Form.Group>
                      <Form.Label> Land Tittle Deed:</Form.Label>
                      <Form.Control type='file' onChange={this.handlelandfile} />
                    </Form.Group>
                    <Form.Group>
                      <Button type='submit' color='primary' size='lg' block> Register</Button>
                    </Form.Group>
                  </form>
                  <div>
                    {this.GettxStatus()}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </>
      </div>
    )
  }
}
