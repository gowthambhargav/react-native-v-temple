import React, { useEffect } from 'react'
import { Text,SafeAreaView,ScrollView, View, Touchable, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native';
import axios from 'axios';
import CardWithShowMore from './CardWithShowMore';


const sampleData = [
    { name: 'John Doe', age: 28, occupation: 'Engineer' },
    { name: 'Jane Smith', age: 34, occupation: 'Designer' },
    { name: 'Sam Johnson', age: 45, occupation: 'Manager' },
    { name: 'Alice Brown', age: 29, occupation: 'Developer' },
    { name: 'Bob White', age: 50, occupation: 'CEO' },
  ];




function Getseva({setShowGetSeva}) {
    const [SevaNo, setSevaNo] = React.useState();
    const [SevaData, setSevaData] = React.useState([]);
    const HandelGetSeva =()=>{
      axios.get(`http://192.168.1.24/vTempleApi/GetSeva/${SevaNo}`).then((res)=>{
        const data = JSON.parse(res.data);
        console.log("Getseva from parse",data);
          setSevaData(data);
      }).catch((error)=>{
          console.log('====================================');
          console.log(error);
          console.log('====================================');
      })
    }
useEffect(() => 
    { 

    }, 

[]);

  return (
    <SafeAreaView style={{position:"absolute",backgroundColor:"#8a8a8a",flex:1,justifyContent:"center",width:"100%",height:"100%",}}>
        <View style={{ justifyContent: "center", padding: 10, alignContent: "center", alignItems: "center" }}>
  <TextInput
    style={{ top: 0, height: 40, borderColor: '#abcbff', borderWidth: 1, width: '100%', paddingHorizontal: 10 }}
    placeholder="Enter Seva No eg. 2400021"
    onChangeText={(text) => { setSevaNo(text) }}
    value={SevaNo}
    keyboardType="numeric"
    returnKeyType="done"
    autoCapitalize="none"
    autoCorrect={false}
    placeholderTextColor="#e5e3fc"
    secureTextEntry={false}
    maxLength={50}
  />
</View>
        <ScrollView style={{height:"auto"}}>
          <View style={{padding:10}}>
                 {SevaData && <CardWithShowMore data={SevaData} />}
          </View>

        </ScrollView>
      <View style={{width:"80%",marginLeft:"auto",marginRight:"auto",padding:10}}>
<TouchableOpacity style={{marginBottom:10}}>
<Button  title="Get Seva" color={"#4285F4"} onPress={()=>{
  console.log("clicked on Get Seva");
  HandelGetSeva();
       }}/>
</TouchableOpacity>
      <Button  title="Close" color={"tomato"} onPress={()=>{console.log("Print");setShowGetSeva(false) }}/>
      </View>
    </SafeAreaView>
  )
}

export default Getseva;