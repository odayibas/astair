import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Login from './views/Pages/Login'
 import Page404 from './views/Pages/Page404'
 import Page500 from './views/Pages/Page500'
 import DefaultLayout from './containers/DefaultLayout'
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers


// Pages
/*const Login = React.lazy(() => import('./views/Pages/Login'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));*/

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
