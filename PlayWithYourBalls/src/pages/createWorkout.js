'use strict';
import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	AsyncStorage
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';
import fbcreds from '../../fbcreds'

import Login from './login';
import Account from './account';

import styles from '../styles/common-styles.js';

import Firebase from 'firebase';

export default class createWorkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
		}
	}
	async componentWillMount() {
		try {
  		const value = await AsyncStorage.getItem('user_data');
  		if (value !== null){
    		// We have data!!
    		let user_data = JSON.parse(value);
    		console.log(this.state.user);
            this.setState({
                user: user_data,
                loaded: true
            });
  		}
		} catch (error) {
  			console.log("storage err", error)
		} }

		render(){
		return (
			<View style={styles.container}>
				<Header text="Create Workout" loaded={this.state.loaded} />
				<View style={styles.body}>
					{
						this.state.user &&
							<View style={styles.body}>
								<View style={page_styles.email_container}>
									<Text syle={page_styles.email_text}>{this.state.user.email}</Text>
								</View>
							</View>
					}
				</View>
			</View>
		);
	}
}

const page_styles = StyleSheet.create({
		email_container: {
			padding: 20
		},
		email_text: {
			fontSize: 18
		}
	})
