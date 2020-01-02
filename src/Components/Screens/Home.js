import React, { useState, useEffect } from 'react'
import {
	View,
	ScrollView,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native'
import {
	Item,
	Icon,
	Input,
	Card,
	CardItem,
	Left,
	Right,
	Text,
} from 'native-base'
import CustomHeader from '../Layout/CustomHeader'
import font from '../../Theme/font'
import colors from '../../Theme/colors'
import uuid from 'uuid/v4'
import AsyncStorage from '@react-native-community/async-storage'

const Home = () => {
	const [todoList, setTodoList] = useState([])

	const [newTodoName, setNewTodoName] = useState('')

	const toggleTodo = async (id, key, value) => {
		try {
			const copyArray = todoList.map(todo =>
				todo.id === id ? { ...todo, [key]: value } : todo
			)
			await AsyncStorage.setItem('usertodo', JSON.stringify(copyArray))
			setTodoList(copyArray)
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.LONG)
		}
	}
	const deleteTodo = async id => {
		try {
			const copyArray = todoList.filter(todo => todo.id !== id)
			await AsyncStorage.setItem('usertodo', JSON.stringify(copyArray))
			setTodoList(copyArray)
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.LONG)
		}
	}

	const addTodo = async () => {
		try {
			const newTodo = {
				id: uuid(),
				name: newTodoName,
				isChecked: false,
			}
			await AsyncStorage.setItem(
				'usertodo',
				JSON.stringify([...todoList, newTodo])
			)
			setTodoList([...todoList, newTodo])
			setNewTodoName('')
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.LONG)
		}
	}

	const getTodo = async () => {
		try {
			const todo = await AsyncStorage.getItem('usertodo')
			const currentTodo = JSON.parse(todo)
			setTodoList(currentTodo)
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
			<ScrollView showsVerticalScrollIndicator={false}>
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
							What are you going to do?
						</Text>
					</View>
					<Item style={styles.todoInput}>
						<Input
							placeholder='Add To-Do'
							style={{ fontFamily: font.PoppinsRegular, fontSize: 16 }}
							value={newTodoName}
							onChangeText={val => setNewTodoName(val)}
						/>
						<TouchableOpacity onPress={addTodo}>
							<Icon
								name='plus'
								type='FontAwesome5'
								style={{ fontSize: 16, color: colors.black }}
							/>
						</TouchableOpacity>
					</Item>
				</ImageBackground>

				<View style={{ marginTop: -215, paddingHorizontal: 16 }}>
					<Text style={[styles.userText, { fontSize: 14 }]}>
						Your To-Do List :
					</Text>

					{todoList.length > 0 ? (
						todoList.map((todo, index) => (
							<Card style={styles.cardTodo} key={todo.id}>
								<CardItem style={styles.cardItemTodo}>
									<Left>
										<TouchableOpacity
											onPress={() =>
												toggleTodo(todo.id, 'isChecked', !todo.isChecked)
											}>
											<Icon
												type='FontAwesome5'
												name={!todo.isChecked ? 'square' : 'check-square'}
												style={{ fontSize: 14 }}
											/>
										</TouchableOpacity>
									</Left>
									<Text
										numberOfLines={1}
										style={{
											width: '70%',
											textDecorationLine: todo.isChecked
												? 'line-through'
												: 'none',
										}}>
										{todo.name}
									</Text>
									<Right>
										<TouchableOpacity onPress={() => deleteTodo(todo.id)}>
											<Icon
												type='FontAwesome5'
												name='trash-alt'
												style={{ fontSize: 14, color: colors.black }}
											/>
										</TouchableOpacity>
									</Right>
								</CardItem>
							</Card>
						))
					) : (
						<View style={{ height: 100 }}></View>
					)}
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
		height: 45,
	},
	cardTodo: {
		borderRadius: 5,
		elevation: 0,
		borderColor: 'transparent',
	},
	cardItemTodo: {
		borderRadius: 5,
		elevation: 3,
		borderColor: 'transparent',
		backgroundColor: colors.white,
	},
})

export default Home
