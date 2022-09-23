import { Route, Redirect, Switch } from 'react-router-dom';
import Editpage from "./components/Edit";
import LogDatapage from "./components/LogData";
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import "./components/edit.css"
import React from "react";
import ViewData from "./components/ViewData";
import AdminPage from "./components/Admin";

const NoMatch = ({ location }) => (
    <div>
        <strong>Error!</strong> No route found matching:
        <div>
            <code>{location.pathname}</code>
        </div>
    </div>
);

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path='/logdata' component={LogDatapage} />
                <Route path='/editpage' component={Editpage} />
                <Route path='/loginpage' component={LoginPage} />
                <Route path='/viewdatapage' component={ViewData} />
                <Route path='/adminpage' component={AdminPage} />
                <Route path='/profilepage' component={ProfilePage} />

                <Route exact path='/' render={() => (
                    <Redirect
                        to='/loginpage'
                    />
                )} />
                <Route component={NoMatch} />
            </Switch>
        </div>
    );
}

export default App;
