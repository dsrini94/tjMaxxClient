//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, CheckBox, ActivityIndicator } from 'react-native';

//importing barcode package
import Barcode from "react-native-barcode-pdf417";


var DATE = new Date();

export default class ReturnsFetch extends Component {

  static navigationOptions = {
    title: 'Returns',
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
      paymentMode:'None',
      returnCost:0,
      msg:''
    }
  }

  componentDidMount(){

    console.log('inside returnsDataFetch');
    var returnCost = 0;
    const { navigation } = this.props;
    const mode = navigation.getParam('mode','NO-DATA');
    const returnCost = navigation.getParam('returnCost',0);
    const POSMsg = navigation.getParam('screen',false);
    var msg;
    console.log(POSMsg);
    if(POSMsg == 'myReturns')
      {
        msg='Please go to the POS along with the items and show the barcode. Refund will be credited to the original mode of payment';
        this.setState({msg:msg});
      }
    else{
      msg = 'Returns have been initiated for the above items. Please go to the nearest store along with the items and show the barcode to the POS';
      this.setState({msg:msg});
    }



    const paymentMode = mode[0].selected ? 'Payment will be credited to your bank account with in 2-3 working days.' : 'Please collect your refund amount at the POS counter'
    this.setState({paymentMode:paymentMode,msg:msg})


      fetch('http://ec2-13-127-158-175.ap-south-1.compute.amazonaws.com:8080/finalReturnData')
          .then(response => response.json())
          .then((responseJson)=>{

            this.setState({products:responseJson});

            responseJson.map((item,i)=>{
              var cost  = item.price.split(''),returnCost = this.state.returnCost;
              cost = cost[1]+cost[2];
              returnCost += parseInt(cost);
              this.setState({returnCost:returnCost});
            })
            console.log('=======>',returnCost);
          }).then(()=>{
            this.setState({isLoading:false})
          })
          .catch((error) => console.error(error))

  }



  render(){

    console.log('////////',this.state.returnCost);

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

          <View style={{flexDirection:'row',margin:20}}>
            <View>
              <Text style={styles.refundKeyText}>Refund Amount : </Text>
            </View>
            <View>
              <Text style={styles.refundText}>${this.state.returnCost}</Text>
            </View>
          </View>

          <View>
            <FlatList
             data={this.state.products}
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
                                     </View>
                                   }
             keyExtractor={(index,data) => index.toString()}
           />
         </View>

         <View style={{alignItems:'center',margin:20}}>
           <Image source={require('./../assets/images/2d.png')} style={{resizeMode:'contain',height:110,width:'80%'}}/>
           <Text style={styles.successMsg}>{this.state.msg}</Text>
           {/* <Text style={styles.successMsg}>{this.state.paymentMode}</Text> */}
        </View>

        <View style={{width:'100%',position:'absolute',bottom:0}}>
           <TouchableOpacity style={{padding:15,backgroundColor:'#99261a'}} onPress={()=>this.props.navigation.navigate('Home')}>
             <Text style={{color:'#fff',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Home</Text>
           </TouchableOpacity>
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
    padding:5,
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
  },
  refundContainer:{
    borderColor:'#99261a',
    margin:10,
    padding:5,
    flexDirection:'row',
    textAlign:'center'
  },
  refundText:{
    color:'#99261a',
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold'
  },
  refundKeyText:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
    color:'#000',

  }
});
