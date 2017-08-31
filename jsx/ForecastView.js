import React, { Component } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import ForecastBlock from './ForecastBlock';

export default class ForecastView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    }
  }
  
  loadData(date) {
    let url = this.props.apiBaseUrl+"/national/"+date
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
    return this.loadData("2017-09-01");
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
      return (        
        <ScrollView horizontal style={{flex: 1}}>
          {blocks}
        </ScrollView>
      );
    }
  }
}
