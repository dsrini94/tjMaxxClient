//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

var DATE = new Date();

export default class ReturnInvoice extends Component{


  //setting the title to the header
  static navigationOptions = {
    title: 'Return Invoices',
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

    this.state={
      invoiceArray:[{
        date:(DATE.getDate()-5)+'-'+(DATE.getMonth()+1)+'-'+DATE.getFullYear(),
        purchased:5,
        return:0,
        handle:true,
        invoice:true
      },
      {
        date:'12-07-2018',
        purchased:4,
        return:'1 Items',
        handle:true,
        invoice:false
      },
      {
        date:'05-01-2018',
        purchased:4,
        handle:false,
        return:'1 Items',
        invoice:false,
        handle:false
      }],
      arrayCount:0,
      isLoading:true,
    }
  }

  handleInvoice(handle,invoice){
    if(handle)
    {
      if(invoice)
        this.props.navigation.navigate('returnsFetch',{
          screen:'myReturns'
        });
      else
      this.props.navigation.navigate('returnInvoiceFetch',{
        screen:'myReturns'});
    }
  }

  componentDidMount(){

    fetch('http://ec2-13-127-158-175.ap-south-1.compute.amazonaws.com:8080/getReturnData?return_invoice_barcodeNo=715676017633')
        .then(response => response.json())
        .then((responseJson)=>{
          this.setState({arrayCount:responseJson[0].order_details.length,isLoading:false})
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
        <View style={styles.outerContainer}>
          <FlatList
            data={this.state.invoiceArray}
            renderItem={({item,i}) => <TouchableOpacity style={styles.listContainer} onPress={()=>this.handleInvoice(item.handle,item.invoice)}>
                                        <View style={styles.outerContainer1}>
                                          <Text style={styles.keyText}>Original Purchase Date</Text>
                                          <Text style={styles.keyText}>No of items purchased</Text>
                                          <Text style={styles.keyText}>No of items to return</Text>
                                        </View>
                                        <View style={styles.outerContainer}>
                                          <Text style={styles.valueText}>{item.date}</Text>
                                          <Text style={styles.valueText}>{item.purchased} Items</Text>
                                          <Text style={styles.valueText}>{this.state.arrayCount} Items</Text>
                                        </View>
                                        <View style={styles.imageContainer}>
                                          <Image source={require('./../assets/images/arrow.png')}/>
                                        </View>
                                    </TouchableOpacity>}
                                    keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  outerContainer1:{
    flex:2
  },
  outerContainer:{
    flex:1
  },
  listContainer:{
    flex:1,
    backgroundColor:'white',
    flexDirection:'row',
    margin:10,
    padding:8
  },
  keyText:{
    color:'black',
    padding:5,
    fontSize:16,
    fontWeight:'bold'
  },
  valueText:{
    color:'black',
    padding:5,
    fontSize:16,
  },
  imageContainer:{
    justifyContent:'center'
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
})
