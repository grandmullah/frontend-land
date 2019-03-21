import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { newContextComponents } from 'drizzle-react-components'
import { DrizzleContext } from 'drizzle-react'
import Navbar from './navbar'
import Gov from './government'
import Search from'./search'
import Default from './default'
import '../App.css'
const { AccountData, ContractData, ContractForm } = newContextComponents

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext
      if (!initialized) {
        return 'Loading...'
      }
      return (
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/' />
            <Route path='/Government' render={(props) => <Gov {...props} drizzle={drizzle} drizzleState={drizzleState} />} />
            <Route path='/search' component={Search} />
            <Route component={Default} />
          </Switch>
        </div>
      )
    }}
  </DrizzleContext.Consumer>
)
