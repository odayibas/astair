import React from 'react';
import Monitor from './views/Monitor/Monitor';
import Dashboard from './views/Dashboard';
/*
const Monitor = React.lazy(() => import('./views/Monitor/Monitor'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
*/


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/dashboard', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/monitor', name: 'Monitor', component: Monitor },

  
];

export default routes;
