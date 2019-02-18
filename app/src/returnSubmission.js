//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import {  StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';

//importing barcode package
import Barcode from "react-native-barcode-pdf417";

var DATE = new Date();

export default class ReturnSubmission extends Component {

  static navigationOptions = {
    title: 'Returned Products',
    headerStyle: {
      backgroundColor: '#99261a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:20
    },
  };

  constructor(props){
    super(props)

    this.state = {
      isLoading:'true',
      productsData:[]
    }

    this.handleScanOnPress = this.handleScanOnPress.bind(this);
  }

  handleScanOnPress(){
    //routing the screen
    this.props.navigation.navigate('scanner');
  }

  componentDidMount(){

    var data1 = {username:'test'};

    const { navigation } = this.props;
    const data = navigation.getParam('data','NO-DATA');
    this.setState({productsData:data})

    fetch('http://ec2-13-127-158-175.ap-south-1.compute.amazonaws.com:8080/returnInvoiceDetails', {
        method: 'POST',
        headers: new Headers({
          'Content-Type':'application/json'
        }),
        body: JSON.stringify(data),
      }).then((res) => {
          console.log(res);
          if(res.status == 200)
              this.setState({isLoading:false});
        })
      .catch(error => console.error('Error:', error));
  }

  render(){

    if(this.state.isLoading)
    {
      return(
        <View style={styles.loadingOuterContainer}>
          <View style={styles.loadingInnerContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingMessage}>Fetching data...</Text>
          </View>
        </View>)
    }
    else{
      return(
        <View style={{flex:1,backgroundColor:'white'}}>

           <FlatList
            data={this.state.productsData}
            renderItem={({item}) =>
                                    <View style={styles.listContainer}>
                                      <View style={styles.flexContainer}>
                                        <Image style={styles.image} source={{uri:item.image}} />
                                      </View>
                                      <View style={styles.productsBox}>
                                        <Text style={styles.productName}>{item.category}</Text>
                                        <Text style={styles.category}>{item.product_name}</Text>
                                        <Text style={styles.price}>{item.price}</Text>
                                      </View>
                                      <View>
                                      </View>
                                    </View>
                                  }
            keyExtractor={(index,data) => index.toString()}
          />

          <View style={{alignItems:'center',flex:3}}>
            <Image source={require('./../assets/images/2d.png')} />
            <Text style={styles.successMsg}>Returns have been initiated for the above items. Please go to the nearest store along with the items and show the barcode to the POS</Text>
          </View>

          {/* scan Icon */}
            {/* <TouchableOpacity style={styles.button} onPress={this.handleScanOnPress}>
              <Image source={require('./../assets/images/qr-code.png')} />
            </TouchableOpacity> */}

        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  listContainer:{
    flexDirection:'row',
    flex:1,
    marginLeft:20,
    marginRight:20,
    padding:10,
    borderBottomColor: 'black',
    borderBottomWidth:1
  },
  flexContainer:{
    flex:1
  },
  image:{
    height:80,
    width:'100%',
    resizeMode:'contain'
  },
  productName:{
    color:'black',
    fontSize:20,
    fontWeight:'normal'
  },
  category:{
    fontSize:15,
    fontWeight:'normal'
  },
  button:{
    position:'absolute',
    backgroundColor:"#99261a",
    borderRadius:50,
    padding:20,
    bottom:'5%',
    right:'5%'
  },
  productsBox:{
    flex:3,
    paddingLeft:20
  },
  successMsg:{
    fontSize:16,
    textAlign:'center',
    padding:20,
    color:'#99261a',
    fontWeight:'normal'
  },
  loadingOuterContainer:{
    flex:1,
    margin:20
  },
loadingInnerContainer:{
  justifyContent:'center',
  padding:25
  },
loadingMessage:{
  textAlign:'center',
  fontSize:20,
  paddingTop:10
},
  keyText:{
    color:'black',
    padding:5,
    fontSize:18,
    fontWeight:'bold'
  },
  valueText:{
    color:'black',
    padding:5,
    fontSize:18,
  },
  price:{
    color:'#99261a',
    padding:5,
    fontSize:20,
    fontWeight:'bold'
  }
});
