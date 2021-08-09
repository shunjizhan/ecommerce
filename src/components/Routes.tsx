import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Shop from './core/Shop'
import Home from './core/Home'
import Signin from './core/Signin'
import Signup from './core/Signup'
import Dashboard from './admin/Dashboard'
import PrivateRoute from './admin/PrivateRoute'
import AdminRoute from './admin/AdminRoute'
import AdminDashboard from './admin/AdminDashboard'

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={ Home } exact />
        <Route path='/shop' component={ Shop } />
        <Route path='/signin' component={ Signin } />
        <Route path='/signup' component={ Signup } />
        <PrivateRoute path='/user/dashboard' component={ Dashboard } />
        <AdminRoute path='/admin/dashboard' component={ AdminDashboard } />
      </Switch>
    </HashRouter>
  )
}

export default Routes
