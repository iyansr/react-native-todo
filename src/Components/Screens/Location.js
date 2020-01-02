import React, { useState, useEffect } from 'react'
import {
	View,
	ScrollView,
	StyleSheet,
	ImageBackground,
	ToastAndroid,
	ActivityIndicator,
	PermissionsAndroid,
	Platform,
} from 'react-native'
import { Item, Input, Card, CardItem, Text, Button } from 'native-base'
import CustomHeader from '../Layout/CustomHeader'
import font from '../../Theme/font'
import colors from '../../Theme/colors'
import Axios from 'axios'
import Maps from '../Layout/Map'
import Geolocation from 'react-native-geolocation-service'

const Location = () => {
	const [latitude, setLatitude] = useState(0)
	const [longitude, setLongitude] = useState(0)
	const [loading, setLoading] = useState(true)
	const [address, setAddrress] = useState('')

	const getLocationPermission = async () => {
		if (
			Platform.OS === 'ios' ||
			(Platform.OS === 'android' && Platform.Version < 23)
		) {
			return true
		}
		const hasPermission = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		)
		if (hasPermission) {
			return true
		}
		const status = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		)
		if (status === PermissionsAndroid.RESULTS.GRANTED) {
			return true
		}
		if (status === PermissionsAndroid.RESULTS.DENIED) {
			ToastAndroid.show(
				'Location Permission Denied By User.',
				ToastAndroid.LONG
			)
		} else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
			ToastAndroid.show(
				'Location Permission Revoked By User.',
				ToastAndroid.LONG
			)
		}
		return false
	}

	const getLocation = async () => {
		const hasLocationPermission = await getLocationPermission()

		if (!hasLocationPermission) {
			return
		}
		Geolocation.getCurrentPosition(
			position => {
				setLatitude(position.coords.latitude)
				setLongitude(position.coords.longitude)

				Axios.get(
					`https://us1.locationiq.com/v1/reverse.php?key=d17151587b1e23&lat=${position
						.coords.latitude || 0}&lon=${position.coords.longitude ||
						0}&format=json`
				).then(response => {
					setAddrress(`${response.data.address.state}`)
				})
			},
			error => {
				ToastAndroid.show(error, ToastAndroid.LONG)
			},
			{
				enableHighAccuracy: true,
				timeout: 15000,
				maximumAge: 10000,
				distanceFilter: 50,
				forceRequestLocation: true,
			}
		)
		setLoading(false)
	}

	useEffect(() => {
		getLocation()
	}, [])

	return (
		<>
			<View>
				<CustomHeader />
				<ImageBackground
					source={require('../../Theme/bgImage.png')}
					style={{
						height: 350,
						width: null,
						paddingHorizontal: 16,
					}}>
					<View>
						<Text style={styles.userText}>Hello User</Text>
						<Text style={[styles.userText, { fontSize: 14 }]}>
							Here is your current location
						</Text>
					</View>
				</ImageBackground>

				<View style={{ marginTop: -270, paddingHorizontal: 16 }}>
					<Text style={[styles.userText, { fontSize: 16 }]}>
						{address || ''}
					</Text>
					<View style={{ flexDirection: 'row' }}>
						<Text style={[styles.userText, { fontSize: 14 }]}>Latitude:</Text>
						<Text style={[styles.userText, { fontSize: 14, marginLeft: 10 }]}>
							{latitude}
						</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={[styles.userText, { fontSize: 14 }]}>Longitude:</Text>
						<Text style={[styles.userText, { fontSize: 14, marginLeft: 10 }]}>
							{longitude}
						</Text>
					</View>
				</View>
				{loading ? (
					<View>
						<ActivityIndicator size='large' color={colors.purple} />
					</View>
				) : (
					<View style={{ marginTop: 80 }}>
						<Maps originLat={latitude} originLon={longitude} />
					</View>
				)}

				<View style={{ height: 50 }}></View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	userText: {
		fontSize: 26,
		fontFamily: font.PoppinsBold,
		color: colors.white,
	},
	userTextContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginTop: -350,
	},
	todoInput: {
		backgroundColor: colors.white,
		paddingHorizontal: 8,
		borderRadius: 5,
		borderColor: 'transparent',
		marginTop: 8,
		height: 40,
	},
	cardTodo: {
		flexDirection: 'column',
		borderRadius: 5,
		elevation: 0,
		borderColor: 'transparent',
	},
	cardItemTodo: {
		borderColor: 'transparent',
		backgroundColor: colors.white,
	},
})

export default Location
