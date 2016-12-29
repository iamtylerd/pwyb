import React, { Component } from 'react';
import {
   Picker,
   StyleSheet,
   Text
} from 'react-native';
import fbcreds from '../../fbcreds';

import {rootRef} from '../../index.ios.js';


export class ExPicker extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      selectedExercise: this.props.thisExercise
      }
  }


  componentWillMount() {

  }

  render() {
    if(this.props.ex.length === 0) {
      return (<Text>...Loading</Text>)
    } else {
        return (
          <Picker selectedValue = {this.state.selectedExercise} onValueChange = {(ex) => {
            this.setState({selectedExercise: ex})
          }} style={styles.picker}>
             <Picker.Item label = "Choose an Exercise" value = "" />
             {this.props.ex.map((ex, i) => <Picker.Item label = {ex} value = {ex} key = {i} />)}
          </Picker>
          )
      }
  }
}



const styles = StyleSheet.create ({
  picker: {
    width: 100
  }
});


// module.exports = ExercisePicker;
