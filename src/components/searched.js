import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import Iframe from 'react-iframe'

export default class searched extends Component {
  constructor (props) {
    super(props)
    this.state = { dataKey: null }
  }
  componentDidMount () {
    const { drizzle, land, drizzleState } = this.props
    const contract = drizzle.contracts.Lands
    const landw = drizzle.web3.utils.fromAscii(land)
    const datakey = contract.methods['landSpec'].cacheCall(landw)
    this.setState({ datakey })
  }
  componentDidUpdate (prevProps) {
    if (this.props.land !== prevProps.land) {
      this.componentDidMount()
    }
  }
  render () {
    const { Lands } = this.props.drizzleState.contracts
    const specs = Lands.landSpec[this.state.datakey]
    const sp = specs && specs.value[0]
    const sp1 = specs && specs.value[1]
    const sp2 = specs && specs.value[2]
    const sp3 = specs && specs.value[3]
    const sp4 = specs && specs.value[4]
    const titledeed = 'https://ipfs.io/ipfs/' + sp1
    const map = 'http://www.google.com/maps/place/' + sp3 + ',' + sp4
    console.log(map)
    return (
      <div >
      <>
        <Table className='App'>
          <tbody>
            <tr>
              <td>
              Current Owner:<br />
                {sp}
              </td>
              <td>
                Registration Date: <br />
                {sp2}
              </td>
            </tr>
            <tr>
              <td>
                to download and find the land restriction and  rules find them in the linnk below <br />
                <a href={titledeed} >kericho</a>
              </td>
              <td>
                {sp3}
              </td>
            </tr>
            <tr>
              <td>
                <a href={map} >
                  <Iframe url={map}
                    position='relative'
                  />
                </a>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
      </div>
    )
  }
}
