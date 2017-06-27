import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import Home from '../../pages/home/';
import Event from '../../pages/event/';
import Admin from '../../pages/admin/';
import App from './App';
import configureStore from '../store/configureStore';
// import HomePage from '../../pages/home';
// import AdminPage from '../../pages/admin';
// import SignupPage from '../../pages/signup';
// import LoginPage from '../../pages/login';


// const Signup = () => <div>Signup</div>;
const Root = () => (
	<Provider store={configureStore()}>
		<Router history={hashHistory}>
			<Route component={App}>
				<Route path="admin(/:type)" component={Admin} />
				<Route path="event(/:desc)" component={Event} />
				<Route path="/" component={Home} />
			</Route>
		</Router>
	</Provider>
);

/*
<Provider store={configureStore()}>
	<Router history={hashHistory}>
		<Route component={App}>
			<Route path="/" component={HomePage} />
			<Route path="/signup" component={SignupPage} />
			<Route path="/login" component={LoginPage} />
			<Route path="admin(/:type)" component={AdminPage} />
			<Route path="/(:eventId)" component={HomePage} />
		</Route>
	</Router>
</Provider>
*/

export default Root;
