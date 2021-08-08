import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Shop from './core/Shop'
import Home from './core/Home'

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={ Home } exact></Route>
        <Route path='/shop' component={ Shop } exact></Route>
      </Switch>
    </HashRouter>
  )
}

export default Routes
