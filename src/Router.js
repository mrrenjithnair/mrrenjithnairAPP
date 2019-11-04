import React from 'react'
import { View, Text } from 'react-native'
import {Scene, Router} from 'react-native-router-flux';

import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';


const RouterComponent = () => {
    const { navbarStyle, titleStyle, headerTitleStyle } = styles;

	return (
		<Router navigationBarStyle={navbarStyle} titleStyle={titleStyle}>
			<Scene key="root">

				<Scene key="login" hideNavBar component={Login} type="reset" />
				<Scene key="Register" hideNavBar component={Register}  />
				<Scene key="dashboard" hideNavBar component={Dashboard} type="reset" />
		
				
			</Scene>
		</Router>
	);
}

const styles = {
	navbarStyle: {
		backgroundColor: '#4124b1'
	},
	titleStyle: {
		color: '#0A80F5'
	}
};

export default RouterComponent;