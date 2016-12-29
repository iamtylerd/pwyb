'use strict';
import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	AsyncStorage,
	TextInput,
	TouchableHighlight
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';
import fbcreds from '../../fbcreds'

import Login from './login';
import Account from './account';

import styles from '../styles/common-styles.js';

import Firebase from 'firebase';
import {rootRef} from '../../index.ios.js';

export default class createWorkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			exercise: '',
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

		saveExercise() {
			rootRef.ref('exercises/' + this.state.user.uid).child(this.state.exercise).push({
				init: true
			}).then((data) => {
				this.props.navigator.push({
				component: Account
			})
			})
		}



		render(){
		return (
			<View style={styles.container}>
				<Header text="Create Workout" loaded={this.state.loaded} />
				<TouchableHighlight onPress={() => this.props.navigator.pop()}>
          <Text>Back</Text>
        </TouchableHighlight>
					{
						this.state.user &&
							<View style={styles.body}>
								<View style={page_styles.email_container}>
									<Text syle={page_styles.email_text}>{this.state.user.email}</Text>
								</View>
									<TextInput
										style={styles.textinput}
										onChangeText={(text) => {
											this.setState({exercise: text})}
										}
										value={this.state.exercise}
										placeholder={"New Exercise"}
									/>
									<Button
										text="Save"
										onpress={this.saveExercise.bind(this)}
										button_styles={styles.primary_button}
										button_text_styles={styles.primary_button_text} />
							</View>
					}
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
