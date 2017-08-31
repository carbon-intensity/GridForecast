import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import Config from 'react-native-config';

class ForecastList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    }
  }
  
  componentDidMount() {
    let url = Config.INTENSITY_API_BASE_URL+"/national/2017-08-31"
    return fetch( url, {
      headers: {
        'X-Api-Key': Config.INTENSITY_API_KEY,
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

class ForecastBlock extends Component {
  render() {
    return (
      <View style={styles.forecast}>
        <Text style={styles.forecastTime}>{this.props.time}</Text>
        <Text style={[styles.forecastCondition, {color: this.props.colour}]}>{this.props.condition}</Text>
        <Text style={styles.forecastValue}>{this.props.value}g/kWh</Text>
      </View>
    );
  }
}

export default class App extends Component {
  
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.headertext}>UK Grid Forecast</Text>
        </View>
        <ForecastList />
        <View style={styles.footer}>
          <Image style={styles.footerimage} source={{ uri: "https://www.edf.org/sites/all/themes/edf/images/footLogo.gif" }} />
          <Text style={styles.footertext}>Data from the National Grid</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  header: {
    backgroundColor: '#bfd45f',
    paddingTop: 25,
    paddingLeft: 10,
    height: 70,
    borderBottomWidth: 2,
    borderColor: 'rgb(38,121,173)',
    marginBottom: 2,
  },
  
  headertext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
    
  forecast: {
    width: 100,
    justifyContent: 'center',
  },
  
  forecastTime: {
    fontSize: 20,
    textAlign: 'center',
  },
  
  forecastValue: {
    fontSize: 10,
    textAlign: 'center',
  },

  forecastCondition: {
    paddingTop: 50,
    paddingBottom: 50,
    fontSize: 25,
    fontWeight: 'bold',
  },

  footer: {
    height: 100,
    flexDirection: "row",
    backgroundColor: '#d8e8f4',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#c5d3de',
  },
  
  footertext: {
    flex: 1,
    color: 'black',
    paddingLeft: 20,
    paddingRight: 20,
  },

  footerimage: {
    flex: 1,
    height: 55,
    width: 154,
  },

});