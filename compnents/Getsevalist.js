import React, { useState, useEffect } from 'react';
import { View, Button, Text, Platform, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import CardWithShowMore from './CardWithShowMore';

const Getsevalist = ({setShowSevaList}) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
const [SevaDataList,setSevaDataList] = useState();
  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFrom(Platform.OS === 'ios');
    setFromDate(currentDate);
  };
  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowTo(Platform.OS === 'ios');
    setToDate(currentDate);
  };

  const showFromDatepicker = () => {
    setShowFrom(true);
  };

  const showToDatepicker = () => {
    setShowTo(true);
  };
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const HandeleGetsevaList = ()=>{
    console.log(formatDate(fromDate),formatDate(toDate),"fk;gk;'k;sga;lf;lfsj;falsfa");
    
    axios.get(`http://192.168.1.24/vTempleApi/GetSevaList/${formatDate(fromDate)}/${formatDate(toDate)}`)
    .then((res)=>{
      console.log(res.data);
      const data = JSON.parse(`${res.data}`);
      console.log('====================================');
      console.log("Parsed data",data);
      console.log('====================================');
      
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }

  useEffect(() => {
    // Add any side effects here if needed
  }, []);

  return (
    <SafeAreaView style={{ position: "absolute", backgroundColor: "#8a8a8a", flex: 1, justifyContent: "center", width: "100%", height: "100%" }}>
<View style={{ flexDirection: 'row', marginBottom: 20,padding:10}}>
  <View style={{ flex: 1,margin:5 }}>
    <Button onPress={showFromDatepicker} title="Select From Date" />
    {showFrom && (
      <DateTimePicker
        testID="dateTimePickerFrom"
        value={fromDate}
        mode="date"
        display="default"
        onChange={onChangeFrom}
      />
    )}
  </View>
  <View style={{ flex: 1,margin:5 }}>
    <Button onPress={showToDatepicker} title="Select To Date" />
    {showTo && (
      <DateTimePicker
        testID="dateTimePickerTo"
        value={toDate}
        mode="date"
        display="default"
        onChange={onChangeTo}
      />
    )}
  </View>
</View>
      <ScrollView style={{ height: "auto" }}>
        <View style={{ padding: 10 }}>
          <Text>{formatDate(fromDate)} - {formatDate(toDate)}</Text>
          {SevaDataList ?<CardWithShowMore data={SevaDataList} />:null}
        </View>
      </ScrollView>
      <View style={{width:"80%",marginLeft:"auto",marginRight:"auto",padding:10}}>
<TouchableOpacity style={{marginBottom:10}}>
<Button  title="Get Seva" color={"#4285F4"} onPress={()=>{console.log("clicked on Get Seva");
HandeleGetsevaList();
       }}/>
</TouchableOpacity>
      <Button  title="Close" color={"tomato"} onPress={()=>{setShowSevaList(false) }}/>
      </View>
    </SafeAreaView>
  );
};

export default Getsevalist;