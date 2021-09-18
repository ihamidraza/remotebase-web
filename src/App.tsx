import React from 'react';
import { Layout, Menu } from 'antd';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { LeftSider, MainLayoutWithRouter } from './components'
import { Activities, SignUp, SignIn } from './views'
import logo from './logo.svg';
import './App.css';

function App() {

  const layout = (props: any) => <> <LeftSider {...props} />
    <MainLayoutWithRouter {...props} /></>

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router>
        <Route path='/' component={LeftSider} />
        <Switch>
        <Route path='/signup' exact render={(props) => <SignUp {...props} />} />
        <Route path='/signin' exact render={(props) => <SignIn {...props} />} />
          <Route path='/' exact render={(props) => <Activities {...props} />} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
