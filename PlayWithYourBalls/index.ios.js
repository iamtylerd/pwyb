'use strict';
import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

import Signup from './src/pages/signup';
import Account from './src/pages/account';
import fbcreds from './fbcreds';

import Header from './src/components/header';

import Firebase from 'firebase';

// let app = new Firebase(`${fbcreds.databaseURL}`);

import styles from './src/styles/common-styles.js';

const firebaseConfig = {
  apiKey: fbcreds.apiKey,
  authDomain: fbcreds.authDomain,
  databaseURL: fbcreds.databaseURL,
  storageBucket: fbcreds.storageBucket,
  messagingSenderId: fbcreds.messagingSenderId,
};

let app = Firebase.initializeApp(firebaseConfig);

class PlayWithYourBalls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: null,
      loaded: false
    };
  }
  componentWillMount() {
    AsyncStorage.getItem('user_data'). then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      let component = {component: Signup};
      if(user_data != null) {
        app.authWithCustomToken(user_data.token, (error, authData) => {
          if(error){
            this.setState(component);
          }else {
            this.setState({component: Account});
          }
        });
      }else{
        this.setState(component);
      }
    });
  }

  render(){
    if(this.state.component){
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      )
    }else{
      return (
        <View stle={styles.container}>
          <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
          <View style={styles.body}></View>
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('PlayWithYourBalls', () => PlayWithYourBalls);
