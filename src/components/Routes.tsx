import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Shop from './core/Shop'
import Home from './core/Home'
import Signin from './core/Signin'
import Signup from './core/Signup'

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={ Home } exact></Route>
        <Route path='/shop' component={ Shop } exact></Route>
        <Route path='/signin' component={ Signin } exact></Route>
        <Route path='/signup' component={ Signup } exact></Route>
      </Switch>
    </HashRouter>
  )
}

export default Routes
