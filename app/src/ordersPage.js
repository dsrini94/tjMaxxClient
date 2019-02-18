//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, CheckBox, ActivityIndicator } from 'react-native';

var DATE = new Date();

export default class OrdersPage extends Component{

  //setting the title to the header
  static navigationOptions = {
    title: 'Receipt Details',
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
      error:false,
      loading:true,
      selectedProducts:[],
      modalVisible:false,
      returnCost:0
    }

    //binding the events
    this.handleScanOnPress = this.handleScanOnPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleScanOnPress(){
    //routing the screen
    this.props.navigation.navigate('scanner');
  }

  handleCheckBox(item){
    var cost  = item.price.split(''),returnCost = this.state.returnCost;
    cost = cost[1]+cost[2];
    returnCost += parseInt(cost);
    var products = this.state.selectedProducts;
    products.push(item);
    this.setState({selectedProducts:products,returnCost:returnCost});
  }

  handleSubmit(){

    this.setState({modalVisible:false});

    fetch('http://ec2-13-127-158-175.ap-south-1.compute.amazonaws.com:8080/returnInvoiceDetails', {
        method: 'POST',
        headers: new Headers({
          'Content-Type':'application/json'
        }),
        body: JSON.stringify(this.state.selectedProducts),
      }).then((res) => {
          console.log(res);
          if(res.status == 200)
          {
            this.props.navigation.navigate('returnInvoiceFetch',{
              data:this.state.selectedProducts,
              returnCost:this.state.returnCost,
            });
          }
        })
      .catch(error => console.error('Error:', error));

  }

  componentDidMount(){

    fetch('http://ec2-13-127-158-175.ap-south-1.compute.amazonaws.com:8080/getOrderData?barcode_no=031655337913')
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({products:responseJson[0].order_details.products,loading:false});
      })
      .catch((error) => {
        console.log(error);
        this.setState({error:true})
      });
  }


  render(){
    if(this.state.error === false && this.state.loading === true)
    {
      return(
        <View style={styles.loadingOuterContainer}>
          <View style={styles.loadingInnerContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingMessage}>Fetching data...</Text>
          </View>
        </View>)
    }
    if(this.state.error === false && this.state.loading === false)
    {
      return(
        <View style={{flex:1,backgroundColor:'white'}}>

          <Text style={styles.name}>Aquaberry Store</Text>
          <Text style={styles.address}>7735 N MacArthur Blvd, Irving, TX 75063, USA</Text>

          <View style={{borderColor:'black',borderWidth:1,margin:10,padding:5,flexDirection:'row'}}>
            <View style={{flex:1}}>
              <Text style={styles.keyText}>Purchase Date</Text>
              <Text style={styles.keyText}>Receipt Number</Text>
              <Text style={styles.keyText}>Purchase Total</Text>
              <Text style={styles.keyText}>Payment Mode</Text>
            </View>
            <View style={{flex:1}}>
              <View style={styles.outerContainer}>
                <Text style={styles.valueText}>{(DATE.getDate()-5)+'-'+(DATE.getMonth()+1)+'-'+DATE.getFullYear()}</Text>
                <Text style={styles.valueText}>403-25443-7883</Text>
                <Text style={styles.valueText}>$190 (5 items)</Text>
                <Text style={styles.valueText}>Debit Card</Text>
              </View>
            </View>
          </View>

          <FlatList
            data={this.state.products}
            renderItem={({item}) =>
                                    <View key={item.product_name} style={styles.listContainer}>
                                      <View style={styles.flexContainer}>
                                        <Image style={styles.image} source={{uri:item.image}} />
                                      </View>
                                      <View style={styles.productsBox}>
                                        <Text style={styles.productName}>{item.product_name}</Text>
                                        <Text style={styles.category}>{item.category}</Text>
                                        <Text style={styles.price}>{item.price}</Text>
                                      </View>
                                      <View>
                                        <CheckBox onValueChange={()=>this.handleCheckBox(item)}/>
                                      </View>
                                    </View>
                                  }
                                  keyExtractor={(item, index) => index.toString()}
          />

          <TouchableOpacity style={styles.submitButton} onPress={()=>this.setState({modalVisible:true})}>
            <Text style={styles.submitText}>Generate Returns Invoice</Text>
          </TouchableOpacity>

          {/* scan Icon */}
            {/* <TouchableOpacity style={styles.button} onPress={this.handleScanOnPress}>
              <Image source={require('./../assets/images/qr-code.png')} />
            </TouchableOpacity> */}




            <Modal style={{backgroundColor:'rgba(0,0,0,1)'}}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible:false});
          }}>
          <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',alignItems:'center',justifyContent:'center'}}>
          <View style={{marginTop: 22,backgroundColor:'white',padding:20}}>
              <Text style={{fontSize:20,margin:10,color:'black'}}>Do you want to generate returns?</Text>

              <View style={{flexDirection:'row'}}>
                <View style={{flex:1,alignItems:'center'}}>

                </View>

                <View style={{flex:1,alignItems:'center',flexDirection:'row'}}>

                  <TouchableOpacity style={{margin:10}}
                    onPress={() => {
                      this.setState({modalVisible:false});
                    }}>
                    <Text style={{paddingTop:10,paddingBottom:10,color:'blue',fontSize:18}}>Close</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{margin:10}}
                    onPress={this.handleSubmit}>
                    <Text style={{paddingTop:10,paddingBottom:10,color:'blue',fontSize:18}}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>

          </View>
        </View>
        </Modal>


        </View>
      );
    }
    else{
      return(
        <View style={styles.flexContainer}>
          <View style={styles.errorMessageContainer}>
            <Text style={styles.eMessage}>oops!!! Something Went Wrong</Text>
            <Text style={styles.message}>Try Scanning once again</Text>
          </View>

          {/* scan Icon */}
          <TouchableOpacity style={styles.button} onPress={this.handleScanOnPress}>
            <Image source={require('./../assets/images/qr-code.png')} />
          </TouchableOpacity>
      </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  loadingMessage:{
    textAlign:'center',
    fontSize:20,
    paddingTop:10},
  loadingInnerContainer:{
    justifyContent:'center',
    padding:25
  },
  loadingOuterContainer:{
    flex:1,
    margin:20
  },
  category:{
    fontSize:15,
    fontWeight:'normal'
  },
  listContainer:{
    flexDirection:'row',
    flex:1,
    marginLeft:20,
    marginRight:20,
    padding:10,
    borderBottomColor: 'black',
    borderBottomWidth:1
  },
  image:{
    height:80,
    width:'100%',
    resizeMode:'contain'
  },
  productsBox:{
    flex:3,
    paddingLeft:20
  },
  productName:{
    color:'black',
    fontSize:18,
    fontWeight:'normal'
  },
  button:{
    position:'absolute',
    backgroundColor:"#99261a",
    borderRadius:50,
    padding:20,
    bottom:'15%',
    right:'5%'
  },
  buttonContainer:{
    backgroundColor:'#99261a',
    flex:1
  },
  flexContainer:{
    flex:1
  },
  errorMessageContainer:{
    margin:20,
    backgroundColor:'white'
  },
  eMessage:{
    textAlign:'center',
    color:'black',
    fontSize:16,
    padding:25,
    fontWeight:'bold'
  },
  message:{
    textAlign:'center',
    color:'black',
    fontSize:16,
    paddingBottom:25,
    fontWeight:'bold'
  },
  submitButton:{
    backgroundColor:'#99261a',
    padding:20
  },
  submitText:{
    color:'white',
    textAlign:'center',
    fontSize:20
  },
  keyText:{
    color:'black',
    padding:5,
    fontSize:15,
    fontWeight:'bold'
  },
  valueText:{
    color:'black',
    padding:5,
    fontSize:15,
  },
  price:{
    color:'#99261a',
    padding:5,
    fontSize:20,
    fontWeight:'bold'
  },
  name:{
    color:'#99261a',
    fontSize:16,
    fontWeight:'bold',
    marginTop:10,
    marginLeft:10,
    marginRight:10,
  },
  address:{
    color:'#99261a',
    fontWeight:'normal',
    fontSize:16,
    marginTop:10,
    marginLeft:10,
    marginRight:10,
  }
})
