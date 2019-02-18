//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { AppRegistry, StyleSheet, Text, View, Alert, TouchableOpacity, TextInput } from 'react-native';

//importing Barcode scanner Modules
import BarcodeScanner from 'react-native-barcode-scanner-google';


export default class InvoiceScan extends Component {

  //making the header invisible
  static navigationOptions = {
    title:'Scan Your Receipt',
    headerTintColor:'#fff',
    headerStyle:{
      backgroundColor:'#99261a'
    }
  }

  constructor(props){
    super(props);

    this.state={
      invoiceNo:''
    }
  }



  render() {

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection:'row',marginTop:20}}>
            <View style={{flex:2}}>
              <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1,marginLeft:20,marginTop:5,marginBottom:5}}
                    onChangeText={(text) => this.setState({invoiceNo:text})}
                    value={this.state.invoiceNo}
                  />
           </View>

           <View style={{flex:1}}>
             <TouchableOpacity style={styles.buttonContainer} onPress={this.handleScanInvoice}>
               <Text style={styles.buttonText}>Submit</Text>
             </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer:{
    backgroundColor:'#99261a',
    padding:10,
    marginTop:5,
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
