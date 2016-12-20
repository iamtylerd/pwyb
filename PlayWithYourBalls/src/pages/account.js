'use strict';
import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	AsyncStorage,
	Item
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';
import {ExPicker} from '../components/picker'
import fbcreds from '../../fbcreds';

import Login from './login';
import CreateWorkout from './createWorkout';

import styles from '../styles/common-styles.js';

import Firebase from 'firebase';
import {rootRef} from '../../index.ios.js';





export default class account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			language: 'Choose an Exercise',

			}
	}
updateLanguage = (lang) => {
      this.setState({language: lang});
      console.log(this.state.language)
   }

async componentWillMount() {
try {
  const value = await AsyncStorage.getItem('user_data');
  if (value !== null){
    // We have data!!
    let user_data = JSON.parse(value);
            this.setState({
                user: user_data,
                exercise: null,
                exArray: []
            });
  }
} catch (error) {
  console.log("storage err", error)
}
try {
     rootRef.ref('exercises/' + this.state.user.uid).once('value')
        .then((data) => {
          let exercises = data.val();
          this.setState({
            exercise: exercises,
          })
          Object.keys(exercises).map((key) => {
		      let item = exercises[key]
		      this.state.exArray.push(item.exercise)
		    })
          this.setState({
          	loaded: true
          })
        })

    } catch (error) {
      console.log("Picker Error", error)
    }
}



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
								<ExPicker
									user={this.state.user}
									ex={this.state.exArray}
									updateLanguage = {this.updateLanguage} />
							<Button
								text="Create Exercise"
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
		},
	})
