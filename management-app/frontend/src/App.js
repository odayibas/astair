import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Pages/Login '
import Landing  from './components/Pages/Landing'
import Monitor from './components/Monitor/Monitor'
import SlackForm from './components/SlackForm/SlackForm'
import ACControl from './components/ACControl/ACControl';
import Register from './components/Pages/Register'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div style={{paddingTop: '100px'}}>
        <Route  exact path="/" component={Landing}/>
        <Route  exact path="/login" component={Login}/>
        <Route  exact path="/dashboard" component={Dashboard}/>
        <Route  exact path="/monitor" component={Monitor}/>
        <Route  exact path="/form" component={SlackForm}/>
        <Route  exact path="/ac" component={ACControl}/>
        <Route  exact path="/register" component={Register}/>


        </div>
      </div>

    </Router>
  );
}

export default App;