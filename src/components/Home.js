import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import { newContextComponents } from 'drizzle-react-components'
import { DrizzleContext } from 'drizzle-react'
import Navbar from './navbar'
import Gov from './government'
import Search from './search'
import Default from './default'
import Landing from './landingpage'
import Profile from './profile'
import '../App.css'
// const { AccountData, ContractData, ContractForm } = newContextComponents

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext
      if (!initialized) {
        return 'Loading...'
      }
      return (
        <div className='App' >
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/Government' render={(props) => <Gov {...props} drizzle={drizzle} drizzleState={drizzleState} />} />
            <Route path='/search'  render={(props) => <Search {...props} drizzle={drizzle} drizzleState={drizzleState} />}/>
            <Route path='/profile' render={(props) => <Profile {...props} drizzle={drizzle} drizzleState={drizzleState} />} />
            <Route component={Default} />
          </Switch>
        </div>
      )
    }}
  </DrizzleContext.Consumer>
)
