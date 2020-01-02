import React from 'react'
import { Icon } from 'native-base'

import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import color from '../Theme/colors'

import Home from './Screens/Home'
import Post from './Screens/Post'
import Location from './Screens/Location'
import Splash from './Screens/Splash'

const AppNavigation = createBottomTabNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: {
				tabBarLabel: 'Home',
				tabBarIcon: ({ tintColor }) => (
					<Icon
						type='FontAwesome5'
						name='home'
						style={{ color: tintColor, fontSize: 23 }}
					/>
				),
			},
		},
		Post: {
			screen: Post,
			navigationOptions: {
				tabBarLabel: 'Posts',
				tabBarIcon: ({ tintColor }) => (
					<Icon
						type='FontAwesome5'
						name='file-alt'
						style={{ color: tintColor, fontSize: 23 }}
					/>
				),
			},
		},
		Location: {
			screen: Location,
			navigationOptions: {
				tabBarLabel: 'Location',
				tabBarIcon: ({ tintColor }) => (
					<Icon
						type='FontAwesome5'
						name='map-marker'
						style={{ color: tintColor, fontSize: 23 }}
					/>
				),
			},
		},
	},
	{
		tabBarOptions: {
			activeTintColor: color.purple,
			inactiveTintColor: color.grey,
			style: {
				backgroundColor: 'white',
				borderTopWidth: 0,
				shadowOffset: { width: 5, height: 3 },
				shadowColor: 'black',
				shadowOpacity: 0.5,
				elevation: 5,
			},
		},
	}
)

const AuthNavigator = createSwitchNavigator(
	{
		Splash,
		AppNavigation,
	},
	{
		headerMode: 'none',
	}
)

export default createAppContainer(AuthNavigator)
