//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { View, Text, Image, StyleSheet, TouchableOpacity, NetInfo } from 'react-native';

export default class HomePage extends Component{

  //making the header invisible
  static navigationOptions = {
        header: null
    }

    constructor(props){
      super(props);
      //binding the events
      // this.handleScanOnPress = this.handleScanOnPress.bind(this);
      this.handleViewOrders = this.handleViewOrders.bind(this);
      this.handleReturnsOnPress = this.handleReturnsOnPress.bind(this);
      this.handleScanItemOnPress = this.handleScanItemOnPress.bind(this);
    }

    // handleScanOnPress(){
    //   //routing the screen
    //   this.props.navigation.navigate('scanner');
    // }

    handleScanItemOnPress(){
      //routing the screen
      this.props.navigation.navigate('dataFlush');
    }

    handleViewOrders(){
      //routing the screen
      this.props.navigation.navigate('invoices');
    }

    handleReturnsOnPress(){
      //routing the screen
      this.props.navigation.navigate('returnsInvoice');
    }


  render(){
    return(
      <View style={styles.homePageContainer}>

        <View style={styles.smallViews}>
          {/* <Image style={styles.logo} resizeMode="center" source={require('./../assets/images/logo.png')} /> */}
          <Text style={{fontSize:68,fontWeight:'bold',color:'#99261a'}}>Aquaberry</Text>
        </View>

        <View style={styles.centerView}>
          <Image style={styles.image}  source={require('./../assets/images/sacnner.jpg')} />
        </View>

        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.handleViewOrders}>
            <Image source={require('./../assets/images/eye.png')}/>
            <Text style={styles.buttonText}>E Purchases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleScanOnPress}>
            <Image source={require('./../assets/images/scan.png')}/>
            <Text style={styles.buttonText}>Scan Invoices</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.handleViewOrders}>
            <Image source={require('./../assets/images/eye.png')}/>
            <Text style={styles.buttonText}>E Receipts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleScanItemOnPress}>
            <Image source={require('./../assets/images/supermarket-scanner.png')}/>
            <Text style={styles.buttonText}>Scan Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleReturnsOnPress}>
            <Image source={require('./../assets/images/return.png')}/>
            <Text style={styles.buttonText}>My Returns</Text>
          </TouchableOpacity>
       </View>



      </View>
    );
  }
}


const styles = StyleSheet.create({
  homePageContainer: {
    backgroundColor: 'white',
    flex:1,
    borderWidth: 5,
    // borderColor: '#99261a',
    flexDirection:'column'
  },
  buttonContainer:{
    flex:0.9,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#99261a',
    alignItems:'center'
  },
  smallViews:{
    flex:1.3,
    justifyContent:'center',
    alignItems:'center'
  },
  centerView:{
    flex:1.3,
    // justifyContent:'center',
    alignItems:'center'
  },
  logo: {
    height:'70%',
    width:'80%',
  },
  image:{
    height:195,
    width:'100%',
  },
  button:{
    flex:1,
  justifyContent:'center',
  alignItems:'center'
  },
  buttonText:{
    color:'white',
    fontSize:16,
    textAlign:'center',
    fontWeight:'bold',
    marginTop:10
  }
});
