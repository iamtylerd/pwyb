'use strict';
import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	TextInput,
	View,
	AsyncStorage
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Signup from './signup';
import Account from './account';
import fbcreds from '../../fbcreds'

import Firebase from 'firebase';

// let app = new Firebase(`${fbcreds.databaseURL}`);

import styles from '../styles/common-styles.js';

export default class login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loaded: true
		}
	}

	render(){
		return(
			<View style={styles.container}>
				<Header text="Login" loaded={this.state.loaded} />
				<View style={styles.body}>
					<TextInput
						style={styles.textinput}
						onChangeText={(text) => this.setState({email: text})}
						value={this.state.email}
						placeholder={"Email Address"}
					/>
					<TextInput
						style={styles.textinput}
						onChangeText={(text) => this.setState({password: text})}
						value={this.state.password}
						secureTextEntry={true}
						placeholder={"Password"}
					/>
					<Button
						text="Login"
						onpress={this.login.bind(this)}
						button_styles={styles.primary_button}
						button_text_styles={styles.primary_button_text} />
					<Button
						text="New Here?"
						onpress={this.goToSignup.bind(this)}
						button_styles={styles.transparent_button}
						button_text_styles={styles.transparent_button_text} />
				</View>
			</View>
		)
	}

	login(){
		this.setState({
			loaded: false
		});
		let email = this.state.email;
		let password = this.state.password;

		Firebase.auth()
			.signInWithEmailAndPassword(email, password)
				.then((user_data) => {
					this.setState({
						loaded: true
					});
					AsyncStorage.setItem('user_data', JSON.stringify(user_data));
					this.props.navigator.push({
						component: Account
					});
				})
	}

	goToSignup(){
		console.log(this.props.navigator)
		this.props.navigator.push({
			compoent: Signup
		});
	}
}
AppRegistry.registerComponent('login', () => login);
