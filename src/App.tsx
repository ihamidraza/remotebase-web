import React from 'react';
import { Layout } from 'antd';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { LeftSider, MainLayoutWithRouter } from './components'
import { Activities, SignUp, SignIn, Community, Recommendations, Profile } from './views'
import './App.css';
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

axios.interceptors.request.use((request: any) => {
	if (cookies.get('token')) {
		const token = cookies.get('token');
		if (token !== null && token !== undefined && token !== '') {
			request.headers.authorization = `Bearer ${token}`;
		}
	}
	return request;
}, function (error: any) {
	return Promise.reject(error);
});

// Axios response interceptor : Remove cookie and redirect to login
axios.interceptors.response.use((response: any) => {
	return response;
}, function (error: any) {
	if (error.response.status === 401) {
		cookies.remove('token', { path: '/' });
		setTimeout(() => {
			window.location.replace(`${window.location.origin}/login`);
		}, 2000);
		return Promise.reject(error);
	} else {
		return Promise.reject(error);
	}
});

const checkUserSession = () => {
	if (cookies.get('token')) {
		return true;
	} else {
		return false;
	}
}

function App() {

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Router>
				{
					checkUserSession() ?
						<>
							<Redirect exact from='/' to='/activities' />
							<Route path='/' component={LeftSider} />
							<Switch>
								<Route path='/activities' exact render={(props) => <Activities {...props} />} />
								<Route path='/community' exact render={(props) => <Community {...props} />} />
								<Route path='/recommendations' exact render={(props) => <Recommendations {...props} />} />
								<Route path='/profile' exact render={(props) => <Profile {...props} />} />

							</Switch>
						</>
						:
						<Switch>
							<Redirect exact from='/' to='/login' />
							<Route path='/signup' exact render={(props) => <SignUp {...props} />} />
							<Route path='/login' render={(props) => <SignIn {...props} />} />
						</Switch>
				}
			</Router>
		</Layout>
	);
}

export default App;
