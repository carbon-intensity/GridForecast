import React, { Component } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ForecastDayView from './ForecastDayView';

export default class ForecastView extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var later = new Date();
    later.setDate(later.getDate() + 2);

    return (        
      <ScrollableTabView>
        <ForecastDayView 
          date={today.toISOString().split('T')[0]} 
          style={{flex: 1}} 
          tabLabel='today'
          apiBaseUrl={this.props.apiBaseUrl}
          apiKey={this.props.apiKey}
        />
        <ForecastDayView 
          date={tomorrow.toISOString().split('T')[0]} 
          style={{flex: 1}} 
          tabLabel='tomorrow'
          apiBaseUrl={this.props.apiBaseUrl}
          apiKey={this.props.apiKey}
        />
        <ForecastDayView 
          date={later.toISOString().split('T')[0]} 
          style={{flex: 1}} 
          tabLabel='later'
          apiBaseUrl={this.props.apiBaseUrl}
          apiKey={this.props.apiKey}
        />
      </ScrollableTabView>
    );
  }
}
