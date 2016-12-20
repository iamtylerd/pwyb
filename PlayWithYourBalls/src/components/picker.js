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

      }
  }


  componentWillMount() {
    // try {
    //  await rootRef.ref('exercises/' + this.props.user.uid).once('value')
    //     .then((data) => {
    //       let exercises = data.val();
    //         this.setState({
    //           exercise: exercises,
    //         })
    //     })

    // } catch (error) {
    //   console.log("Picker Error", error)
    // }
  }

  render() {
    // let exArray = [];
    // Object.keys(this.props.ex).map((key) => {
    //   let item = this.props.ex[key]
    //   exArray.push(item.exercise)
    // })
    console.log(this.props.ex)
    return (
      <Text>"Hi"</Text>
      // <Picker selectedValue = {this.state.language} onValueChange = {this.props.updateLanguage} style={styles.picker}>
      //    <Picker.Item label = "Choose an Exercise" value = "" />
      //    <Picker.Item label = "Java" value = "Java" />
      //    <Picker.Item label = "JavaScript" value = "JavaScript" />
      // </Picker>
      //    {this.state.ex.map((ex, i) => {
      //     return <Text>ex</Text>
      //    })
      //    }}
      // <ul>
      //   {this.props.ex.map((ex) => {
      //     return <li key={ex.exer>{ex.exercise}</li>
      //   })}
      // </ul>
      )
  }
}



const styles = StyleSheet.create ({
  picker: {
    width: 100
  }
});


// module.exports = ExercisePicker;
