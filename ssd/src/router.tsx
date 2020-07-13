import React from "react";
import { BrowserRouter, Route, Switch  } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateSystem from './components/CreateSystem';

const Router = () => {
    return (
        <BrowserRouter>
            <Route path='/' exact component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/create' component={CreateSystem} />
            <Route path='/edit/:id' component={CreateSystem} />
        </BrowserRouter>
    );
}

export default Router;