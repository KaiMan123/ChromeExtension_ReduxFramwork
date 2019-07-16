import { Redirect, Route, Switch } from 'react-router-dom'
import { Router } from "react-router";
import React, { Component }  from 'react'
import history from "../history"
import { HOME_ROUTE, MAIN_ROUTE } from "../../shared/constants/routes"
import Home from '../containers/Home';
import Main from '../containers/Main';

class Routes extends Component {
    render() {
        return (
            <Router history = {history}>
                <Switch>
                    <Route path={HOME_ROUTE} component={Home} />
                    <Route path={MAIN_ROUTE} component={Main} />
                    <Redirect to={{ pathname: HOME_ROUTE }} />
                </Switch>
            </Router>
        )
    }
}

export default Routes
