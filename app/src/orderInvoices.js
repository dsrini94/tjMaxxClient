//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

var DATE = new Date();

export default class OrderInvoices extends Component {

  //setting the title to the header
  static navigationOptions = {
    title: 'Purchase Receipts',
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
        id:1,
        orderDate:(DATE.getDate()-5)+'-'+(DATE.getMonth()+1)+'-'+DATE.getFullYear(),
        invoiceNo:'403-25443-7883',
        orderTotal:'190 (5 items)',
        mode:'Debit Card',
        handle:true
      },
      {
        id:2,
        orderDate:'12-07-2018',
        invoiceNo:'103-65243-7883',
        orderTotal:'150 (4 items)',
        mode:'Debit Card',
        handle:false
      },
      {
        id:2,
        orderDate:'05-01-2018',
        invoiceNo:'453-1143-7883',
        orderTotal:'180 (4 items)',
        mode:'Debit Card',
        handle:false
      }]
    }

    this.handleInvoice = this.handleInvoice.bind(this);
  }

  handleInvoice(nav){
    if(nav)
      this.props.navigation.navigate('orders');
  }


  render(){

    return(
      <View style={styles.outerContainer}>
        <FlatList
          data={this.state.invoiceArray}
          renderItem={({item,i}) => <TouchableOpacity style={styles.listContainer} onPress={()=>this.handleInvoice(item.handle)}>
                                      <View style={styles.outerContainer}>
                                        <Text style={styles.keyText}>Purchase Date</Text>
                                        <Text style={styles.keyText}>Receipt Number</Text>
                                        <Text style={styles.keyText}>Purchase Total</Text>
                                        <Text style={styles.keyText}>Payment Mode</Text>
                                      </View>
                                      <View style={styles.outerContainer}>
                                        <Text style={styles.valueText}>{item.orderDate}</Text>
                                        <Text style={styles.valueText}>{item.invoiceNo}</Text>
                                        <Text style={styles.valueText}>${item.orderTotal}</Text>
                                        <Text style={styles.valueText}>{item.mode}</Text>
                                      </View>
                                      <View style={styles.imageContainer}>
                                        <Image source={require('./../assets/images/arrow.png')}/>
                                      </View>
                                  </TouchableOpacity>}
                                  keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
})
