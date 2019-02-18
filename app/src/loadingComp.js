////importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

export default class LoadingComponent extends Component{

  static navigationOptions = {
        header: null
    }

  constructor(props)
  {
    super(props);

    this.handleDatafetch = this.handleDatafetch.bind(this);
  }

  handleDatafetch(barcode){
    fetch('http://ec2-13-127-158-175.ap-south-1.compute.amazonaws.com:8080/getproductData?barcode_no='+barcode)
         .then(response => response.json())
         .then((responseJson) => {
           console.log(responseJson);
           this.props.navigation.navigate('itemScanPage',{
             pdts:responseJson
           })
         })


  }

  render(){

    const { navigation } = this.props;
    const barcode = navigation.getParam('barcode',null)

    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.text}>Loading...</Text>
        {this.handleDatafetch(barcode) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    fontSize:16,
    marginTop:10,
    color:'black'
  }
});
