import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";

function SevaReciept({ HandleSavePrint, sevaDetails, setShowResipt }) {
  const date = new Date();
  const [currentDate, setCurrentDate] = useState("");
  const [sevaAmount, setSevaAmount] = useState(0);

  const HandleFetchSevaAmount = async () => {
    const response = await axios.post(
      "https://react-native-v-temple-b.onrender.com/api/seva/",
      { SVANAME: sevaDetails && sevaDetails.seva }
    );

    setSevaAmount(response.data.data[0].AMT);
  };

  HandleFetchSevaAmount();
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const formattedDate = `${date.getDate()}-${
        monthNames[date.getMonth()]
      }-${date.getFullYear()}`; // Format: dd/mm/yyyy
      setCurrentDate(formattedDate);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []); // Run only once
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        zIndex: 999,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
      }}
      onPress={() => {
        setShowResipt(false);
        HandleSavePrint();
      }}
    >
      <View style={styles.popupContainer}>
        {/* <Image source={require('../assets/temple.png')}/> */}
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            shre Varadanjaneya Swamy devasthana
          </Text>
          <Text
            style={{
              textAlign: "center",
              textTransform: "capitalize",
              width: "60%",
              marginBottom: 5,
            }}
          >
            7th Main Rd, Nagarabavi, RBI Layout, JP Nagar 7th Phase, J. P.
            Nagar, Bengaluru, Kothnur, Karnataka 560078
          </Text>
        </View>
        {/* Date Reciept no */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderBottomWidth: 1,
            borderTopWidth: 1,
          }}
        >
          <Text>Date: {currentDate}</Text>
          <Text>Reciept No: {sevaDetails && sevaDetails.sevaReceiptID}</Text>
        </View>
        {/* Seva Details */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginBottom: 10,
            marginTop: 10,
            paddingBottom: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            {/* Each label and value pair wrapped in its own View */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.SevaRecieptDetails}>Sannidhi:</Text>
              <Text style={{ paddingLeft: 10, textAlign: "center" }}>
                {sevaDetails && sevaDetails.sannidhi}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.SevaRecieptDetails}>Seva:</Text>
              <Text style={{ paddingLeft: 10 }}>
                {sevaDetails && sevaDetails.seva}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.SevaRecieptDetails}>Name:</Text>
              <Text style={{ paddingLeft: 10 }}>
                {sevaDetails && sevaDetails.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.SevaRecieptDetails}>Gothra:</Text>
              <Text style={{ paddingLeft: 10 }}>
                {sevaDetails && sevaDetails.gothra}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.SevaRecieptDetails}>Rashi:</Text>
              <Text style={{ paddingLeft: 10 }}>
                {sevaDetails && sevaDetails.rashi}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.SevaRecieptDetails}>Mobile:</Text>
              <Text style={{ paddingLeft: 10 }}>
                {sevaDetails && sevaDetails.phoneNo}
              </Text>
            </View>
          </View>
        </View>
        {/* Seva Date and amount */}
        <View style={{ borderBottomWidth: 1, borderTopWidth: 1 }}>
          {/* <Text>Seva Date: 12-12-2021</Text> */}
          <Text>Amount: {sevaAmount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  popupContainer: {
    width: "80%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 20,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  SevaRecieptDetails: {
    fontSize: 16,
  },
});
export default SevaReciept;
