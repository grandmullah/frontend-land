import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'

export default class landing extends Component {
  render() {
    return (
      <>
        <Row>
          <Col>
            <div className='App '>
               to check your land an update your profile <br />
              <Button outline color='link'>
                <NavLink to='/profile'className='button'>Profile</NavLink>
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
          </Col>
          <Col>
            <div className='App ' >
              To search lands and check owners and history <br />
              <Button outline color='link'>
                <NavLink to='/search'className='button'>Searches</NavLink>
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='App ' >
              this page is only for allowed/authorized users <br />
              <Button outline color='link'>
                <NavLink to='Government'className='button'>Government</NavLink>
              </Button>
            </div>
          </Col>
          <Col>
          </Col>
        </Row>
      </>
    )
  }
}
