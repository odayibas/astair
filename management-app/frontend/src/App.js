import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Pages/Login '
import Landing  from './components/Pages/Landing'
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div style={{paddingTop: '100px'}}>
        <Route  exact path="/" component={Landing}/>
        <Route  exact path="/login" component={Login}/>
        <Route  exact path="/dashboard" component={Dashboard}/>
        </div>
      </div>

    </Router>
  );
}

export default App;