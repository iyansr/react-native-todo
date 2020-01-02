import React from 'react'
import { Header, Left, Body, Right } from 'native-base'
import { StatusBar } from 'react-native'
import colors from '../../Theme/colors'
// import font from '../../Theme/font'

const CustomHeader = () => {
	return (
		<Header style={{ backgroundColor: colors.purple }}>
			<StatusBar backgroundColor={colors.purple} />
			<Left style={{ flex: 1 }}></Left>
			<Body
				style={{
					alignContent: 'center',
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
				}}></Body>
			<Right style={{ flex: 1 }}></Right>
		</Header>
	)
}

export default CustomHeader
