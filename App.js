import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import ForecastView from './jsx/ForecastView';

export default class App extends Component {
  
  render() {
    
    let apiBaseUrl = "https://k1nehbcl85.execute-api.eu-west-2.amazonaws.com/v1"

    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.headertext}>UK Grid Forecast</Text>
        </View>
        <Image source={require('./assets/images/background.jpg')} style={styles.container}>
          <ForecastView apiBaseUrl={apiBaseUrl}/>
        </Image>
        <View style={styles.footer}>
          <Image style={styles.footerimage} source={require('./assets/images/edflogo.png')} />
          <Text style={styles.footertext}>This app shows the forecast carbon intensity of UK electricity in gCO2/kWh. Lower numbers mean your electricity is greener. Data provided by the National Grid. Visit carbonintensity.org.uk for details.</Text>
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

  container: {
    flex: 1,
    width: null,
    height: null,
  },
  
  footer: {
    height: 80,
    flexDirection: "row",
    backgroundColor: '#d8e8f4',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#c5d3de',
  },
  
  footertext: {
    fontSize: 9,
    flex: 1,
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
  },

  footerimage: {
    height: 35,
    width: 100,
    marginLeft: 10,
  },

});
