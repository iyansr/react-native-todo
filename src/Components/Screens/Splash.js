import React, { useEffect } from 'react'
import {
	View,
	ScrollView,
	StyleSheet,
	ImageBackground,
	ToastAndroid,
} from 'react-native'
import { Text } from 'native-base'
import CustomHeader from '../Layout/CustomHeader'
import font from '../../Theme/font'
import colors from '../../Theme/colors'
import AsyncStorage from '@react-native-community/async-storage'

const Splash = ({ navigation }) => {
	const getTodo = async () => {
		try {
			const todo = await AsyncStorage.getItem('usertodo')
			if (!todo) {
				await AsyncStorage.setItem('usertodo', JSON.stringify([]))
				return navigation.navigate('AppNavigation')
			}
			const todoList = JSON.parse(todo)
			if (todoList.length > 0) {
				return navigation.navigate('AppNavigation')
			}
			await AsyncStorage.setItem('usertodo', JSON.stringify([]))
			return navigation.navigate('AppNavigation')
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.LONG)
		}
	}

	useEffect(() => {
		getTodo()
	}, [])

	return (
		<>
			<CustomHeader />
			<ScrollView>
				<ImageBackground
					source={require('../../Theme/bgImage.png')}
					style={{
						height: 350,
						width: null,
						paddingHorizontal: 10,
					}}>
					<View>
						<Text style={styles.userText}>Welcome</Text>
						<Text style={[styles.userText, { fontSize: 14 }]}>
							Please Wait..
						</Text>
					</View>
				</ImageBackground>

				<View style={{ marginTop: -215, paddingHorizontal: 10 }}>
					<View style={{ height: 100 }}></View>
				</View>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	userText: {
		fontSize: 26,
		fontFamily: font.PoppinsBold,
		color: colors.white,
	},
})

export default Splash
