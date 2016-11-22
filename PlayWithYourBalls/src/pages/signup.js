'use strict';
import React, {Component} from 'react';
import {
	AppRegistry,
	Text,
	TextInput,
	View
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';
import fbcreds from '../../fbcreds'

import Login from './login';

import Firebase from 'firebase';

// let app = new Firebase(`${fbcreds.databaseURL}`);


import styles from '../styles/common-styles.js';

export default class signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: true,
			email: '',
			password: ''
		};
	}
	signup() {
		this.setState({
			loaded: false,
		});
		let email = this.state.email;
		let password = this.state.password
		Firebase.auth().createUserWithEmailAndPassword(
			email, password)
			.then((userData) => {
				alert("Your account was created!");
				this.setState({
					email: '',
					password: '',
					loaded: true
				});
		});
	}

	goToLogin(){
		this.props.navigator.push({
			component: Login
		});
	}
	render(){
		return (
			<View style={styles.container}>
				<Header text="Signup" loaded={this.state.loaded} />
				<View style={styles.body}>
					<TextInput
						style={styles.textinput}
						onChangeText={(text) => {
							console.log(text)
							this.setState({email: text})}
						}
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
						text="Signup"
						onpress={() => {
							console.log(this.state)
							this.signup()}
						}
						button_styles={styles.primary_button}
						button_text_styles={styles.primary_button_text} />
					<Button
						text="Got an Account?"
						onpress={this.goToLogin.bind(this)}
						button_styles={styles.transparent_button}
						button_text_styles={styles.transparent_button_text} />
				</View>
			</View>
		);
	}
}
AppRegistry.registerComponent('signup', () => signup);
