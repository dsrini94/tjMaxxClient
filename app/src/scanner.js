//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { AppRegistry, StyleSheet, Text, View, Alert, PermissionsAndroid } from 'react-native';

//importing Barcode scanner Modules
import BarcodeScanner from 'react-native-barcode-scanner-google';


export default class BarcodeApp extends Component {

  //making the header invisible
  static navigationOptions = {
        header: null
    }

    constructor(props){
      super(props);
    }

  render() {

    return (
      <View style={{flex: 1,flexDirection:'column'}}>
          <BarcodeScanner
              style={{flex: 1}}
              onBarcodeRead={({data, type}) => {
                  // handle your scanned barcodes here!
                  // as an example, we show an alert:
                  // Alert.alert(`Barcode '${data}' of type '${type}' was scanned.`);
                  this.props.navigation.navigate('orderList',{
                    barcode:data
                  });
              }}
          />

          <View style={{flex:2}}>
            <Text style={{fontSize:32,color:'black'}}>Hello world</Text>
          </View>
      </View>
    );
  }
}
