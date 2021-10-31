import React from 'react'
import { Route, Switch } from "react-router"
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import Home from './Home/Home'
import Prices from './Prices/Prices'

function Pages() {
    return (
        <Switch > 
            <Route path='/' exact component={Home}></Route>
            <Route path='/signin' exact component={SignIn}></Route>
            <Route path='/signup' exact component={SignUp}></Route>
            <Route path='/prices' exact component={Prices}></Route>
        </Switch>
    )
}

export default Pages
