import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Pages/Landing'
import Login from './components/Pages/Login '

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Route  exact path="/" component={Landing}/>
        <div style={{paddingTop: '100px'}}>
        <Route  exact path="/login" component={Login}/>
        <Route  exact path="/dashboard" component={Dashboard}/>
        </div>
      </div>

    </Router>
  );
}

export default App;