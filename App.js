//importing React Components
import React, { Component } from 'react';

//importing React Native Modules
import { View, Text } from 'react-native'

//importing navigation Modules
import { createStackNavigator } from 'react-navigation';

//importing custom Components
import HomePage from './app/src/homepage.js'
import Scanner from './app/src/scanner.js'
import OrderList from './app/src/orderList.js'
import ReturnSubmission from './app/src/returnSubmission.js'
import OrderInvoices from './app/src/orderInvoices'
import OrdersPage from './app/src/ordersPage'
import ReturnsFetch from './app/src/returnsDataFetch'
import ReturnsInvoice from './app/src/returnInvoice'
import Payment from './app/src/payment'
import ItemScan from './app/src/itemScanPage'
import ItemScanner from './app/src/itemScanner'
import InvoiceScanner from './app/src/invoiceScanner'
import LoadingComponent from './app/src/loadingComp'
import DataFlush from './app/src/dataFlush'
import ReturnInvoiceFetch from './app/src/returnInvoiceFetch'
import ScanInvoicePage from './app/src/invoiceScanPage'


//routes
const RootStack = createStackNavigator({
  Home: {
    screen: HomePage,
  },
  scanner:{
    screen:Scanner
  },
  orderList:{
    screen:OrderList
  },
  returnsPage:{
    screen:ReturnSubmission
  },
  invoices:{
    screen:OrderInvoices
  },
  orders:{
    screen:OrdersPage
  },
  returnsFetch:{
    screen:ReturnsFetch
  },
  returnsInvoice:{
    screen:ReturnsInvoice
  },
  payment:{
    screen:Payment
  },
  itemScanPage:{
    screen:ItemScan
  },
  itemScanner:{
      screen:ItemScanner
  },
  invoiceScanner:{
    screen:InvoiceScanner
  },
  loading:{
    screen:LoadingComponent
  },
  dataFlush:{
    screen:DataFlush
  },
  returnInvoiceFetch:{
    screen:ReturnInvoiceFetch
  }
});

export default class App extends Component{

  render(){
    return(
       <RootStack />
    );
  }
}
