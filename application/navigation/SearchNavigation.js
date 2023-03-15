import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPass from '../screens/ForgotPass';
import Terms from '../screens/Terms';
import About from '../screens/About';
import Search from '../screens/Search';
import SearchResults from '../screens/SearchResults';
import ColorsApp from '../config/ColorsApp';
import Strings from "../config/Strings";
import SingleDeal from '../screens/SingleDeal';
import SingleCategory from '../screens/SingleCategory';
import SingleStore from '../screens/SingleStore';

const RootStack = createStackNavigator();

export default function SearchNavigation(props){

	const {navigation} = props;

	const navigatorOptions = {
		headerStyle: {
			backgroundColor: ColorsApp.PRIMARY,
			shadowColor: 'transparent',
			elevation: 0,
			shadowOpacity: 0
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
			fontSize: 18,
		},
		headerTitleAlign: 'center',
		headerBackTitleVisible:false,
		/*gestureEnabled: true,
		presentation: "modal"
		cardOverlayEnabled: true,
		...TransitionPresets.ModalPresentationIOS*/
	}

	return (
    <RootStack.Navigator screenOptions={() => {return navigatorOptions}}>
	  <RootStack.Screen name="search" component={Search} options={{title: Strings.ST3}} />
	  <RootStack.Screen name="searchresults" component={SearchResults} options={{title: Strings.ST3}} />
	  <RootStack.Screen name="login" component={Login} options={{title: Strings.ST10}} />
      <RootStack.Screen name="register" component={Register} options={{title: Strings.ST11}} />
      <RootStack.Screen name="forgot" component={ForgotPass} options={{title: Strings.ST43}} />
      <RootStack.Screen name="aboutus" component={About} options={{title: Strings.ST110}} />
      <RootStack.Screen name="terms" component={Terms} options={{title: Strings.ST8}} />
	  <RootStack.Screen name="singledeal" component={SingleDeal} options={{headerTransparent: true, title: null }} />
      <RootStack.Screen name="singlecategory" component={SingleCategory} options={{title: null }} />
      <RootStack.Screen name="singlestore" component={SingleStore} options={{title: null }} />
    </RootStack.Navigator>
	)
}