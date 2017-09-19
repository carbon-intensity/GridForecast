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
    let url = this.props.apiBaseUrl+"/intensity/date/"+this.props.date
    return fetch( url, {
      headers: {
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
        condition = "😐"
        colour = "orange"
        switch(this.state.data[item].intensity.index) {
          case "very high":
            condition = "😠"
            colour = "red"
            break;
          case "high":
            condition = "🙁"
            colour = "orangered"
            break;
          case "low":
            condition = "🙂"
            colour = "yellowgreen"
            break;
          case "very low":
            condition = "😃"
            colour = "green"
            break;
        }
        if (this.state.data[item].intensity.actual == null) {
          blocks.push(
            <ForecastBlock 
              key={item}
              value={this.state.data[item].intensity.forecast}
              condition={condition}
              colour={colour}
              time={this.state.data[item].from.split("T")[1]}
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
          <ScrollView horizontal style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.25)'}}>
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
      marginBottom: 10,
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
