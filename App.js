import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Config from 'react-native-config';
import ForecastView from './jsx/ForecastView';

export default class App extends Component {
  
  render() {
    
    let apiBaseUrl = Config.INTENSITY_API_BASE_URL
    let apiKey = Config.INTENSITY_API_KEY
    
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.headertext}>UK Grid Forecast</Text>
        </View>
        <Image source={require('./assets/images/background.jpg')} style={styles.container}>
          <ForecastView apiBaseUrl={apiBaseUrl} apiKey={apiKey}/>
        </Image>
        <View style={styles.footer}>
          <Image style={styles.footerimage} source={{ uri: "https://www.edf.org/sites/all/themes/edf/images/footLogo.gif" }} />
          <Text style={styles.footertext}>Data provided by the National Grid. Visit carbonintensity.org.uk for details.</Text>
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
  
  footer: {
    height: 80,
    flexDirection: "row",
    backgroundColor: '#d8e8f4',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#c5d3de',
  },
  
  footertext: {
    flex: 1,
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
  },

  footerimage: {
    height: 60,
    width: 170,
    marginLeft: 10,
  },

});