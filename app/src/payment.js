//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

//importing Radio button group
import RadioGroup from 'react-native-radio-buttons-group';

export default class Payment extends Component{

  //configuring header
  static navigationOptions = {
    title:"Confirm Payment Method",
    headerTintColor:'#fff',
    headerStyle:{
      backgroundColor:'#99261a'
    }
  }

  constructor(props){
    super(props);

    this.state={
      data: [
            {
                label: 'Original mode of Payment',
                color:'black',
            },
            {
                label: 'Cash',
                value: "I'm not same as label",
            },
        ],
        pdtData:[],
        text:'',
        number:'',
        screen:'',
        returnCost:0
    }

    this.onPress = this.onPress.bind(this);
    this.handleContinue = this.handleContinue.bind(this)
  }

  componentDidMount(){
    const { navigation } = this.props;
    const data = navigation.getParam('data','NO-DATA');
    const screen = navigation.getParam('screen',null);
    const returnCost = navigation.getParam('returnCost',0);
    this.setState({pdtData:data,screen:screen,returnCost:returnCost})
  }

  onPress(data)
  {
    this.setState({ data });
  }

  handleContinue(){

    if(this.state.screen == 'itemScanPage')
    {
      this.props.navigation.navigate('returnsFetch',{
      mode:this.state.data,
      returnCost:this.state.returnCost,
      pdtData:this.state.pdtData})
    }
    else{
      this.props.navigation.navigate('returnInvoiceFetch',{
      mode:this.state.data,
      returnCost:this.state.returnCost,
      pdtData:this.state.pdtData})
    }

  }

  render(){

    return(
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={require('./../assets/images/credit-card.png')} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.header}>How do you want to get back your refund?</Text>
          <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />

          <View style={{width:'100%',marginTop:10,flexDirection:'row',marginLeft:15}}>
            <View style={{flex:1.5}}>
              <Text style={styles.heading1}>Name </Text>
            </View>

            <View style={{flex:3}}>
              <TextInput color='black'
                      style={{marginTop:10,alignItems:'center',color:'black',height: 40, borderColor: 'black', borderBottomWidth: 1,width:'70%'}}
                      onChangeText={(text) => this.setState({text})}
                      value={this.state.text}
                    />
            </View>
         </View>

         <View style={{width:'100%',marginTop:10,flexDirection:'row',marginLeft:15}}>
           <View style={{flex:1.5}}>
             <Text style={styles.heading1}>Contact No </Text>
           </View>

           <View style={{flex:3}}>
             <TextInput color='black'
                     style={{marginTop:10,alignItems:'center',color:'black',height: 40, borderColor: 'black', borderBottomWidth: 1,width:'70%'}}
                     onChangeText={(number) => this.setState({number})}
                     value={this.state.number}
                   />
           </View>
        </View>

        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={this.handleContinue}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
  },
  imgContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  contentContainer:{
    flex:3,
    alignItems:'center'
  },
  header:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
    marginBottom:20,
    marginTop:10,
  },
  buttonText:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
    color:'white',
  },
  button:{
    backgroundColor:'#99261a',
    padding:20
  },
  heading1:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
    marginTop:30,
  }
})
