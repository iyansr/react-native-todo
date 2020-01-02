import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

const Maps = ({ originLat, originLon }) => {
	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				showsUserLocation={true}
				region={{
					latitude: originLat,
					longitude: originLon,
					latitudeDelta: 0.0043,
					longitudeDelta: 0.0034,
				}}></MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 200,
		width: '89%',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
	},
	map: {
		height: 300,
		width: '100%',
		marginHorizontal: 20,
	},
})

export default Maps
