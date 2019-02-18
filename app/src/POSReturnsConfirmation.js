//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, CheckBox, ActivityIndicator } from 'react-native';

//importing barcode package
import Barcode from "react-native-barcode-pdf417";


var DATE = new Date();

export default class ReturnsFetch extends Component {

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
    super(props);

    this.state = {
      products:[],
      isLoading:'true',
      paymentMode:'None'
    }
  }

  componentDidMount(){

    const { navigation } = this.props;
    const pdtdata = navigation.getParam('pdtData','NO-DATA');
    const mode = navigation.getParam('mode','NO-DATA');
    const paymentMode = mode[0].selected ? 'Payment will be credited to your bank account with in 2-3 working days.' : 'Please collect your refund amount at the POS counter'
    this.setState({paymentMode:paymentMode,products:pdtdata})


    fetch('http://ec2-13-127-158-175.ap-south-1.compute.amazonaws.com:8080/getReturnData?return_invoice_barcodeNo=715676017633')
        .then(response => response.json())
        .then((responseJson)=>{
          this.setState({products:responseJson[0].order_details,isLoading:false})
        })
        .catch((error) => console.error(error))
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={styles.loadingOuterContainer}>
          <View style={styles.loadingInnerContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingMessage}>Fetching data...</Text>
          </View>
        </View>
      )
    }
    else{
      return(
        <View style={{flex:1,backgroundColor:'white'}}>

          <FlatList
           data={this.state.products}
           renderItem={({item}) =>
                                   <View style={styles.listContainer}>
                                     <View style={styles.flexContainer}>
                                       <Image style={styles.image} source={{uri:item.image}} />
                                     </View>
                                     <View style={styles.productsBox}>
                                       <Text style={styles.productName}>{item.product_name}</Text>
                                       <Text style={styles.category}>{item.category}</Text>
                                       <Text style={styles.price}>{item.price}</Text>
                                     </View>
                                     <View>
                                     </View>
                                   </View>
                                 }
           keyExtractor={(index,data) => index.toString()}
         />

         <View style={{alignItems:'center',flex:3,paddingTop:10}}>
           {/* <Barcode text="715676017633" width={250} height={100} /> */}
           <Text style={styles.successMsg}>Products Have been Returned</Text>
         </View>

         {/* <TouchableOpacity style={styles.button} onPress={this.handleScanOnPress}>
           <Image source={require('./../assets/images/qr-code.png')} />
         </TouchableOpacity> */}

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  listContainer:{
    flexDirection:'row',
    flex:1,
    marginLeft:20,
    marginRight:20,
    padding:20,
    borderBottomColor: 'black',
    borderBottomWidth:1
  },
  flexContainer:{
    flex:1
  },
  image:{
    height:100,
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
