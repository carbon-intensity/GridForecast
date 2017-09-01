import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class ForecastBlock extends Component {

  render() {
    return (
      <View style={this.styles.forecast}>
        <Text style={this.styles.forecastTime}>{this.props.time}</Text>
        <Text style={[this.styles.forecastCondition, {color: this.props.colour}]}>{this.props.condition}</Text>
        <Text style={this.styles.forecastValue}>{this.props.value}g/kWh</Text>
      </View>
    );
  }
  
  styles = StyleSheet.create({
      
    forecast: {
      width: 100,
      justifyContent: 'center',
    },
    
    forecastTime: {
      fontSize: 20,
      textAlign: 'center',
    },
    
    forecastValue: {
      fontSize: 20,
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      paddingTop: 10,
      paddingBottom: 10,
    },

    forecastCondition: {
      paddingTop: 50,
      paddingBottom: 50,
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
    },

  });
  
}