import React from 'react'
import { Route, Switch } from "react-router"
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import DetailUser from './DetailUser/DetailUser'
import Home from './Home/Home'
import PriceDetail from './PriceDetail/PriceDetail'
import Prices from './Prices/Prices'

function Pages() {
    return (
        <Switch > 
            <Route path='/' exact component={Home}></Route>
            <Route path='/signin' exact component={SignIn}></Route>
            <Route path='/signup' exact component={SignUp}></Route>
            <Route path='/detail' exact component={DetailUser}></Route>
            <Route path='/prices' exact component={Prices}></Route>
            <Route path='/prices/:id' exact component={PriceDetail}></Route>
        </Switch>
    )
}

export default Pages
