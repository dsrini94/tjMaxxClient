//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { AppRegistry, StyleSheet, Text, View, Alert, TouchableOpacity, TextInput } from 'react-native';

//importing Barcode scanner Modules
import BarcodeScanner from 'react-native-barcode-scanner-google';

var code1='843990058534';
var code2='664689657261';
var code3='61377450000599'

export default class ItemiceScan extends Component {

  //making the header invisible
  static navigationOptions = {
        header: null
    }

    constructor(props){
      super(props);

      this.handleScan = this.handleScan.bind(this);

      this.state={
        pdts:[],
        invoiceNo:''
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleScan(barcode){
      this.props.navigation.navigate('loading',{
        barcode:barcode
      });

    }

    handleSubmit(){
        if(this.state.invoiceNo!='')
            this.props.navigation.navigate('loading',{
              barcode:this.state.invoiceNo
            });
    }

  render() {

    return (
      <View style={{flex: 1}}>

        {/* {this.handleScan(code2)} */}

          <View style={{flex:4}}>
            <BarcodeScanner
                style={{flex: 1}}
                onBarcodeRead={({data, type}) => {
                  this.handleScan(data)
                    // handle your scanned barcodes here!
                    // as an example, we show an alert:
                    // Alert.alert(`Barcode '${data}' of type '${type}' was scanned.`);
                    // this.props.navigation.navigate('itemScanPage',{
                    //   barcode:data,
                    //   pdtScan:true
                    // });
                }}
            />
          </View>

          <View style={{flex:1,backgroundColor:'#fff',padding:10}}>

            <Text style={{fontSize:16,fontWeight:'bold',color:'#99261a'}}>Enter Receipt Number</Text>

            <View >
                <TextInput
                      style={{height: 40, borderColor: 'gray', borderBottomWidth: 2,margin:20}}
                      onChangeText={(text) => this.setState({invoiceNo:text})}
                      value={this.state.invoiceNo}
                    />

                <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
          </View>

      </View>
    );
  }
}

const styles={
  buttonContainer:{
    backgroundColor:'#99261a',
    padding:10,
    marginLeft:20,
    marginRight:20
  },
  buttonText:{
    color:'white',
    fontSize:16,
    textAlign:'center',
    fontWeight:'bold',
  }
}
