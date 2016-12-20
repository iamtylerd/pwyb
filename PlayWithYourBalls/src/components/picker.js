import React, { Component } from 'react';
import {
   Picker,
   StyleSheet
} from 'react-native';



export default PickerExample = (props) => {
   return (
      <Picker selectedValue = {props.language} onValueChange = {props.updateLanguage} style={styles.picker}>
         <Picker.Item label = "Choose an Exercise" value = "" />
         <Picker.Item label = "Java" value = "Java" />
         <Picker.Item label = "JavaScript" value = "JavaScript" />
         props.exercise.forEach((exc) => {
          <Picker.Item label = {exc} value={exc} />
         })
      </Picker>
   );
}

const styles = StyleSheet.create ({
  picker: {
    width: 100
  }
});
