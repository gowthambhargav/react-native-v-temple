import React, { useEffect } from 'react'
import { Text,SafeAreaView,ScrollView, View, Touchable } from 'react-native'
import Card from './Card'
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native';
import axios from 'axios';
import { getAllTrnHdrSEVA } from '../db/database';
function Showrreciept({setShowReceiptDetails}) {
    const [receiptData, setReceiptData] = React.useState();
useEffect(() => 
    { 
      // getAllTrnHdrSEVA()
      getAllTrnHdrSEVA()
      .then((response) => {
        setReceiptData(response)
      }).catch((error) => {
        console.log(error)
      })  
        console.log("Showrreciept") 

    }, 

[]);


  return (
    <SafeAreaView style={{position:"absolute",backgroundColor:"#8a8a8a",flex:1,justifyContent:"center",width:"100%",height:"100%",}}>
        {/* <Text style={{textAlign:"center"}}>ShowrReciept</Text> */}


        <ScrollView style={{height:"auto"}}>
          <View style={{padding:10}}>
          {receiptData && receiptData.map((data, index) => (
            <Card key={index} data={data} />
          ))}             
          </View>

        </ScrollView>
      <View style={{width:"80%",marginLeft:"auto",marginRight:"auto",padding:10}}>
      <Button  title="Close" color={"tomato"} onPress={()=>{console.log("Print");setShowReceiptDetails(false) }}/>
      </View>
    </SafeAreaView>
  )
}

export default Showrreciept