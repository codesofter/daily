import React from 'react';
import { MainContainer } from './MainContainer';
import { Route, Switch } from 'react-router-dom'
import { NotFound } from './NotFound';
import { Footer } from './Footer';


export const App = () => (
	<div>
		<Switch>
			<Route path="/:id" component={MainContainer} />
			<Route path="/" component={NotFound}/>
		</Switch>

		<Footer />
	</div>
)