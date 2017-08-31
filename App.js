import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';

class ForecastBlock extends Component {
  render() {
    return (
      <Text style={styles.forecast}>{this.props.condition}</Text>
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
        <ScrollView horizontal style={{flex: 1}}>
          <ForecastBlock condition="red"/>
          <ForecastBlock condition="green"/>
          <ForecastBlock condition="yellow"/>
          <ForecastBlock condition="green"/>
          <ForecastBlock condition="ick"/>
          <ForecastBlock condition="nasty"/>
          <ForecastBlock condition="eeew"/>
          <ForecastBlock condition="lovely"/>
        </ScrollView>
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