import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/views/Pages/Landing'
import Login from './components/views/Pages/Login '

import Register from './components/views/Pages/Register'
import Profile from './components/views/Dashboard/Profile'
import Monitor from './components/views/Monitor/Monitor'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Route  exact path="/" component={Landing}/>
        <div className="container">
        <Route  exact path="/register" component={Register}/>
        <Route  exact path="/login" component={Login}/>
        <Route  exact path="/profile" component={Profile}/>
        <Route  exact path="/monitor" component={Monitor}/>

        </div>
      </div>

    </Router>
  );
}

export default App;
