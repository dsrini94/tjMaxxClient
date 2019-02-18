//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { AppRegistry, StyleSheet, Text, View, Alert, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

//importing Barcode scanner Modules
import BarcodeScanner from 'react-native-barcode-scanner-google';


export default class InvoiceScan extends Component {

  //making the header invisible
  static navigationOptions = {
        header: null
    }

    constructor(props){
      super(props);

      this.state={
        invoiceNo:''
      }
      this.handleScan = this.handleScan.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleScan(){
      this.props.navigation.navigate('itemScanPage',{
        invNo:'1000006712908',
        pdtScan:true,
        date:'10/27/2018',
        price:'$190 (5 Items)'
      });
    }

    handleSubmit(){

      if(this.state.invoiceNo!='')
      this.props.navigation.navigate('itemScanPage',{
        invNo:this.state.invoiceNo,
        pdtScan:true,
        date:'10/27/2018',
        price:'$190 (5 Items)'
      });
    }

  render() {

    return (
      <View style={{flex: 1,flexDirection:'column'}} behavior="padding" enabled>



        <View style={{flex:4}}>
          <BarcodeScanner
              style={{flex: 1}}
              onBarcodeRead={({data, type}) => {
                  // handle your scanned barcodes here!
                  // as an example, we show an alert:
                  // Alert.alert(`Barcode '${data}' of type '${type}' was scanned.`);
                  this.props.navigation.navigate('itemScanPage',{
                    invNo:data,
                    pdtScan:true,
                    date:'27/10/2018',
                    price:'$190 (5 Items)'
                  });
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

        {/* { this.handleScan() } */}



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
