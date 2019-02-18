////importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Modal, Dimensions } from 'react-native';

var products = [];
var pdts = [];

export default class ItemScanPage extends Component {

  //configuring header
  static navigationOptions = {
    title:'Return Creation',
    headerTintColor:'#fff',
    headerStyle:{
      backgroundColor:'#99261a'
    }
  }

  constructor(props){
    super(props);

    this.state={
      invoiceNo:'',
      invoiceScan:false,
      pdtScan:false,
      products:[],
      modalVisible:false,
      returnCost:0
    }

    this.handleScanInvoice = this.handleScanInvoice.bind(this);
    this.handleItemScan = this.handleItemScan.bind(this);
    this.handleGenerateReturns = this.handleGenerateReturns.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleScanInvoice(){
    this.props.navigation.navigate('invoiceScanner');
  }

  handleItemScan(){
    console.log('clicked');
    this.props.navigation.navigate('itemScanner');
  }

  handleGenerateReturns(){
    var returnCost = 0;
    pdts.map((item,i)=>{
      var cost  = item.price.split(''),returnCost = this.state.returnCost;
      cost = cost[1]+cost[2];
      returnCost += parseInt(cost);
    })

    console.log(returnCost);

      this.setState({modalVisible:true,returnCost:returnCost})
  }

  handleSubmit(){

    this.setState({modalVisible:false})
    this.props.navigation.navigate('returnsFetch',{
      screen:'itemScanPage',
      returnCost:this.state.returnCost
    });
  }

  render(){

    const { navigation } = this.props;
    const invNo = navigation.getParam('invNo','');
    const pdtScan = navigation.getParam('pdtScan',false);
    const barcode = navigation.getParam('barcode',null);
    pdts = navigation.getParam('pdts',null);
    console.log(pdts);
    const date = navigation.getParam('date',null);
    const price = navigation.getParam('price',null);


    if(pdts == null && date == null && price == null)
    {
      return(
        <View style={styles.outerContainer}>
          <View style={styles.section1}>

            <Text style={styles.heading}>Receipt Details</Text>

            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>


            <TouchableOpacity style={styles.buttonContainer} onPress={this.handleScanInvoice}>
              <Text style={styles.buttonText}>Scan Your Receipt</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.section2}>

            <Text style={styles.heading}>Products to Return</Text>

            <View style={styles.infoContainer}>
              <Image source={require('./../assets/images/ss.png')} />
              <Text style={styles.invoiceScanMsg}>Receipt has to be scanned first to scan the products.</Text>
            </View>

            {/* <View style={styles.camButtonContainer} >
              <TouchableOpacity style={styles.camButton} onPress={this.handleItemScan}>
                <Image source={require('./../assets/images/barcode.png')} />
              </TouchableOpacity>
              <Text style={styles.invoiceNo}>Scan</Text>
            </View> */}
          </View>
        </View>
      )
    }
    else {
      return(
        <View style={styles.outerContainer}>
          <View style={styles.section1}>

            <Text style={styles.heading}>Receipt Details</Text>

            <View style={{flexDirection:'row'}}>
              <View>
                <Text style={styles.invoiceHeading}>Receipt No</Text>
                <Text style={styles.invoiceHeading}>Date</Text>
                <Text style={styles.invoiceHeading}>Purchase Total</Text>
              </View>

              <View>
                <Text style={styles.invoiceNo}>{invNo}</Text>
                <Text style={styles.invoiceNo}>{date}</Text>
                <Text style={styles.invoiceNo}>{price}</Text>
              </View>
            </View>


            {/* <TouchableOpacity style={styles.buttonContainer} onPress={this.handleScanInvoice}>
              <Text style={styles.buttonText}>Scan Your Receipt</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.section2}>

            <Text style={styles.heading}>Products to Return</Text>

            <FlatList
             data={pdts}
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

           <View style={styles.camButtonContainer}>
             <TouchableOpacity style={styles.camButton} onPress={this.handleItemScan}>
               <Image source={require('./../assets/images/barcode.png')} />
             </TouchableOpacity>
               <Text style={styles.invoiceNo}>Scan the products</Text>
           </View>

            <View>
              <TouchableOpacity style={styles.submitButton} onPress={this.handleGenerateReturns}>
                <Text style={styles.submitButtonText}>Generate Returns Invoice</Text>
              </TouchableOpacity>
            </View>
          </View>


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
    padding:8,
    borderBottomColor: 'black',
    borderBottomWidth:1
  },
  flexContainer:{
    flex:1,
  },
  outerContainer:{
    flex:1,
    flexDirection:'column'
  },
  section1:{
    flex:1,
    backgroundColor:'#fff',
    margin:5
  },
  section2:{
    flex:4,
    margin:5,
    backgroundColor:'#fff',
    paddingTop:5
  },
  buttonText:{
    color:'#fff',
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
  },
  buttonContainer:{
    backgroundColor:'#99261a',
    padding:10,
    marginLeft:20,
    marginRight:20
  },
  heading:{
    fontWeight:'bold',
    fontSize:18,
    color:'#000',
    marginLeft:10
  },
  invoiceNo:{
    fontSize:16,
    color:'#99261a',
    margin:5,
    marginLeft:10,
    fontWeight:'bold',
  },
  camButton:{
    borderRadius:50,
    backgroundColor:'#99261a',
    padding:15
  },
  camButtonContainer:{
    bottom:30,
    justifyContent:'center',
    alignItems:'center',
    // position:'absolute',
    // right:45,
    marginBottom:10
  },
  infoContainer:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  submitButton:{
    backgroundColor:'#99261a',
    padding:10
  },
  submitButtonText:{
    textAlign:'center',
    color:'white',
    fontSize:18,
    fontWeight:'bold'
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
  price:{
    color:'#99261a',
    padding:5,
    fontSize:20,
    fontWeight:'bold'
  },
  productsBox:{
    flex:3,
    paddingLeft:20
  },
  invoiceHeading:{
    fontSize:16,
    margin:5,
    marginLeft:10,
    fontWeight:'bold',
    color:'black'
  },
  invoiceScanMsg:{
    fontSize:16,
    color:'#99261a',
    margin:5,
    marginLeft:10,
    fontWeight:'bold',
    textAlign:'center'
  }
});
