import React from 'react';
import { Layout, Menu } from 'antd';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { LeftSider, MainLayoutWithRouter } from './components'
import { Activities, SignUp, SignIn } from './views'
import './App.css';

function App() {

  const isLoggedIn = true;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router>
        {
          isLoggedIn ? 
          <>
            <Redirect exact from='/' to='/activities' />
            <Route path='/' component={LeftSider} />
            <Switch>
              <Route path='/activities' exact render={(props) => <Activities {...props} />} />
            </Switch>
          </>
          :
          <Switch>
            <Route path='/signup' exact render={(props) => <SignUp {...props} />} />
            <Route path='/' render={(props) => <SignIn {...props} />} />
          </Switch>
        }
      </Router>
    </Layout>
  );
}

export default App;
