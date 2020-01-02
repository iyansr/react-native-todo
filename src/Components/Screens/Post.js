import React, { useState, useEffect } from 'react'
import {
	View,
	ScrollView,
	StyleSheet,
	ImageBackground,
	ToastAndroid,
	ActivityIndicator,
} from 'react-native'
import { Item, Input, Card, CardItem, Text, Button } from 'native-base'
import CustomHeader from '../Layout/CustomHeader'
import font from '../../Theme/font'
import colors from '../../Theme/colors'
import Axios from 'axios'

const Post = () => {
	const [posts, setPosts] = useState([])
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [loading, setLoading] = useState(false)

	const getPosts = async () => {
		try {
			setLoading(true)
			const response = await Axios.get(
				'https://jsonplaceholder.typicode.com/posts?_limit=5'
			)
			setPosts(response.data)
			setLoading(false)
		} catch (error) {
			ToastAndroid.show(error.response.data, ToastAndroid.LONG)
		}
	}

	const addPost = async () => {
		try {
			setLoading(true)

			const data = {
				title,
				body: description,
			}
			const result = await Axios.post(
				'https://jsonplaceholder.typicode.com/posts',
				data
			)
			setPosts([result.data, ...posts])
			setLoading(false)

			setTitle('')
			setDescription('')
		} catch (error) {
			ToastAndroid.show(error.response.data, ToastAndroid.LONG)
		}
	}

	useEffect(() => {
		getPosts()
	}, [])

	return (
		<>
			<ScrollView showsVerticalScrollIndicator={false}>
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
							Articles you may interest to read, or you can add one
						</Text>
					</View>
					<Item style={styles.todoInput}>
						<Input
							placeholder='Title'
							style={{ fontFamily: font.PoppinsRegular, fontSize: 16 }}
							value={title}
							onChangeText={val => setTitle(val)}
						/>
					</Item>
					<Item style={styles.todoInput}>
						<Input
							placeholder='Description'
							style={{ fontFamily: font.PoppinsRegular, fontSize: 16 }}
							value={description}
							onChangeText={val => setDescription(val)}
						/>
					</Item>
					<Button
						onPress={addPost}
						style={{
							justifyContent: 'center',
							height: 40,
							backgroundColor: colors.purple,
							marginTop: 10,
							borderRadius: 5,
						}}>
						<Text>Add</Text>
					</Button>
				</ImageBackground>

				<View style={{ marginTop: -100, paddingHorizontal: 16 }}>
					{!loading ? (
						posts.map((post, index) => (
							<Card
								style={[styles.cardTodo, { marginBottom: 10 }]}
								key={post.id}>
								<CardItem style={styles.cardItemTodo}>
									<Text
										numberOfLines={1}
										style={{
											width: '100%',
											fontFamily: font.PoppinsBold,
										}}>
										{post.title.toUpperCase()}
									</Text>
								</CardItem>
								<CardItem style={[styles.cardItemTodo]}>
									<Text
										numberOfLines={3}
										style={{
											width: '100%',
										}}>
										{post.body}
									</Text>
								</CardItem>
							</Card>
						))
					) : (
						<View style={{ height: 200 }}>
							<ActivityIndicator size='large' color={colors.purple} />
						</View>
					)}
				</View>
				<View style={{ height: 50 }}></View>
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
		marginBottom: -12,
	},
})

export default Post
