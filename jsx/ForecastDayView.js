import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import ForecastBlock from './ForecastBlock';

export default class ForecastDayView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    }
  }
  
  loadData() {
    let url = this.props.apiBaseUrl+"/national/"+this.props.date
    return fetch( url, {
      headers: {
        'X-Api-Key': this.props.apiKey,
        'Accept': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        data: responseJson.data,
      }, function() {

      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  componentDidMount() {
    this.loadData();
    return;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator style={{flex: 1}} />
      );
    } else {
      let average = 250.0; // Fixed for now, needs to be obtained dynamically in some way.
      blocks = []
      for(item in this.state.data) {
        condition = "normal"
        colour = "orange"
        if(this.state.data[item].carbonForecast > average + 20.0) {
          condition = "high"
          colour = "red"
        }
        if(this.state.data[item].carbonForecast < average - 20.0) {
          condition = "low"
          colour = "green"
        }
        if (this.state.data[item].carbonOutturn == "") {
          blocks.push(
            <ForecastBlock 
              key={item}
              value={this.state.data[item].carbonForecast}
              condition={condition}
              colour={colour}
              period={this.state.data[item].settlementPeriod}
              time={this.state.data[item].timeFrom.split(" ")[1]}            
            />
          )
        }
      }
      
      var dateObj = new Date(this.props.date)
      var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      day = dayNames[dateObj.getDay()]
      date = dateObj.getDate().toString() + " " + monthNames[dateObj.getMonth()]
      
      return (
        <View style={{flex: 1}}>
          <View style={this.styles.dayContainer}>
            <Text style={this.styles.day}>{day}</Text>
            <Text style={this.styles.date}>{date}</Text>
          </View>
          <ScrollView horizontal style={{flex: 1}}>
            {blocks}
          </ScrollView>
        </View>        
      );
    }
  }
  
  styles = StyleSheet.create({
      
    dayContainer: {
      backgroundColor: 'transparent',
      marginLeft: 10,
    },
    
    day: {
      fontSize: 50,
      fontWeight: 'bold',
      color: 'white',
    },

    date: {
      fontSize: 20,
      color: 'grey',
    },

  });

}
