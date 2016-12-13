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
import CreateWorkout from './createWorkout';

import styles from '../styles/common-styles.js';

import Firebase from 'firebase';



export default class account extends Component {
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
				<Header text="Account" loaded={this.state.loaded} />
				<View style={styles.body}>
					{
						this.state.user &&
							<View style={styles.body}>
								<View style={page_styles.email_container}>
									<Text syle={page_styles.email_text}>{this.state.user.email}</Text>
								</View>
							<Image
								style={styles.image}

							/>
							<Button
								text="Log Workout"
								onpress= {this.createWorkout.bind(this)}
								button_styles={styles.primary_button}
								button_text_styles={styles.primary_button_text} />
							<Button
								text="Logout"
								onpress={this.logout.bind(this)}
								button_styles={styles.primary_button}
								button_text_styles={styles.primary_button_text} />
							</View>
					}
				</View>
			</View>
		);
	}

		logout() {
			AsyncStorage.removeItem('user_data').then(() => {
				Firebase.auth().signOut().then(() => {
					this.props.navigator.push({
						component: Login
					});
				})
			});
		}
		createWorkout() {
			this.props.navigator.push({
				component: CreateWorkout
			})
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
