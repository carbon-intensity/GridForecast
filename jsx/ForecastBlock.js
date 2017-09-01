import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class ForecastBlock extends Component {

  render() {
    return (
      <View style={this.styles.forecast}>
        <Text style={this.styles.forecastTime}>
          {this.props.time}
        </Text>
        <Text style={[this.styles.forecastCondition, {color: this.props.colour}]}>
          {this.props.condition}
        </Text>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <Text style={[this.styles.forecastValue, {backgroundColor: this.props.colour}]}>
            {this.props.value}
          </Text>
        </View>
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
      backgroundColor: 'transparent',
      fontWeight: 'bold',
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
      marginTop: 20,
      marginBottom: 20,
      fontSize: 50,
      textAlign: 'center',
    },

  });
  
}