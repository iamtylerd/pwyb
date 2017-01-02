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
import fbcreds from '../../fbcreds';
import {ExPicker} from '../components/picker';


import Login from './login';
import Account from './account';
import Chart from 'react-native-chart';

import styles from '../styles/common-styles.js';

import Firebase from 'firebase';
import {rootRef} from '../../index.ios.js';

	const data = [
    [0, 1],
    [1, 3],
    [3, 7],
    [4, 9],
];
export default class viewData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			exArray: []
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
		}
		try {
    await rootRef.ref('exercises/' + this.state.user.uid).once('value')
        .then((data) => {
        	if(data.val() === null) {
        		return this.setState({
        			loaded: true
        		})
        	}
        	console.log(data.val())
          let exercises = data.val();
          this.setState({
            exercise: exercises,
          })
          Object.keys(exercises).map((key) => {
		      this.state.exArray.push(key)
		    })
          this.setState({
          	loaded: true
          })
        })

    } catch (error) {
      console.log("Picker Error", error)
    }
}

 updateExercise = (ex) => {
    this.setState({selectedExercise: ex});
 }

		render(){
			console.log(this.state)
		return (
			<View style={styles.container}>
				<Header text="View Data" loaded={this.state.loaded} />
				<TouchableHighlight onPress={() => this.props.navigator.pop()}>
          <Text>Back</Text>
        </TouchableHighlight>
					{
						this.state.user &&
							<View style={styles.body}>
									<ExPicker
										user={this.state.user}
										ex={this.state.exArray}
										updateExercise={this.updateExercise}
										thisExercise={this.state.selectedExercise} />
									<View style={page_styles.container}>
										<Chart
                    style={page_styles.chart}
                    data={data}
                    verticalGridStep={5}
                    type="bar" />
                  </View>
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
		},
		container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
		chart: {
        width: 200,
        height: 200,
    },
	})
