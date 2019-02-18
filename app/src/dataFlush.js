////importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

export default class DataFlushComp extends Component{

  static navigationOptions = {
        header: null
    }

  constructor(props)
  {
    super(props);
  }

  componentDidMount(){

    fetch('http://ec2-13-127-158-175.ap-south-1.compute.amazonaws.com:8080/deleteReturns')
         .then((response) => {
            this.props.navigation.navigate('itemScanPage');
         })
         .catch((error)=>console.log(error))
  }

  render(){

    const { navigation } = this.props;
    const barcode = navigation.getParam('barcode',null)

    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.text}>Loading...</Text>
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
