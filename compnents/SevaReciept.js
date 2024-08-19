import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from "@expo/vector-icons";
import fontStyles from "../utils/fontStyles";
import * as Print from 'expo-print';

function SevaReciept({ HandleSavePrint, sevaDetails, setShowResipt }) {
  const date = new Date();
  const [currentDate, setCurrentDate] = useState("");
  const [sevaAmount, setSevaAmount] = useState(0);
  const [addressData, setaddressData] = useState();
const [seralNo, setSeralNo] = useState();

  const HandleFetchSevaAmount = async () => {
    try {
      const response = await axios.post(
        "https://react-native-v-temple-b.onrender.com/api/seva/",
        { SVANAME: sevaDetails && sevaDetails.seva }
      );
      if (response.data && response.data.data && response.data.data.length > 0) {
        setSevaAmount(response.data.data[0].AMT);
      } else {
        console.error("No valid data received from API");
        setSevaAmount(0);
      }
    } catch (error) {
      console.error("Error fetching seva amount:", error);
      setSevaAmount(0);
    }
  };

  const HandleFetchCompanyAddress = async () => {
    const addresResponse = await axios.get("https://react-native-v-temple-b.onrender.com/api/mstcomp/");
    console.log(addresResponse.data.data[0].CompName);
    setaddressData(addresResponse.data.data[0]);
  };

  useEffect(() => {
    HandleFetchCompanyAddress();
    const interval = setInterval(() => {
      const date = new Date();
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
      const formattedDate = `${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
      setCurrentDate(formattedDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePrint = async () => {
    const htmlContent = `
    <div style="position: relative; width: 100%; height: 100%; background-color: white;">
      <div style="padding: 20px; background: white;">
        <div style="text-align: center;">
          <h1 style="font-size: 18px; font-weight: bold; text-transform: uppercase;">${addressData?.CompName}</h1>
          <p style="text-transform: capitalize; width: 60%; margin: 0 auto;">${addressData?.Address1}</p>
          <p>${addressData?.Address2}</p>
          <p>${addressData?.Address3}</p>
          ${addressData?.Address5 ? `<p>${addressData.Address5}</p>` : ''}
          <p>Ph: ${addressData?.MOBNO}</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid; border-top: 1px solid; padding: 10px 0;">
          <p>Date: <strong>${currentDate}</strong></p>
          <p>Receipt No: <strong>${sevaDetails?.sevaReceiptID}</strong></p>
        </div>
        <div style="margin-top: 10px; padding-bottom: 10px;">
          <div style="display: flex; justify-content: flex-start; padding-right: 10px; align-items: center;">
            <p style="font-weight: bold;">Sannidhi:</p>
            <p style="padding-left: 10px;">${sevaDetails?.sannidhi}</p>
          </div>
          <div style="display: flex; justify-content: flex-start; padding-right: 10px; align-items: center;">
            <p style="font-weight: bold;">Seva:</p>
            <p style="padding-left: 10px; font-weight: bold; font-size: 15px;">${sevaDetails?.seva}</p>
          </div>
          <div style="display: flex; justify-content: flex-start; padding-right: 10px; align-items: center;">
            <p style="font-weight: bold;">Name:</p>
            <p style="padding-left: 10px; font-weight: bold;">${sevaDetails?.name}</p>
          </div>
          <div style="display: flex; justify-content: flex-start; padding-right: 10px; align-items: center;">
            <p style="font-weight: bold;">Gothra:</p>
            <p style="padding-left: 10px; font-weight: bold;">${sevaDetails?.gothra}</p>
          </div>
          <div style="display: flex; justify-content: flex-start; padding-right: 10px; align-items: center;">
            <p style="font-weight: bold;">Rashi:</p>
            <p style="padding-left: 10px; font-weight: bold;">${sevaDetails?.rashi}</p>
          </div>
          <div style="display: flex; justify-content: flex-start; padding-right: 10px; align-items: center;">
            <p style="font-weight: bold;">Mobile:</p>
            <p style="padding-left: 10px; font-weight: bold;">${sevaDetails?.phoneNo}</p>
          </div>
        </div>
        <div style="border-bottom: 1px solid; border-top: 1px solid; padding: 10px 0; margin-bottom: 5px;">
          <p style="font-size: 14px; font-weight: bold;">Seva Date: ${currentDate}</p>
          <div style="border: 1px solid; display: flex; align-items: center; padding: 10px;">
            <p style="font-size: 20px; margin-left: 5px; margin-top: -4px; font-weight: bold;">₹${sevaAmount}</p>
          </div>
        </div>
      </div>
    </div>
  `;

    try {
      await Print.printAsync({ html: htmlContent });
    } catch (error) {
      console.error('Error printing:', error);
    }
  };

  HandleFetchSevaAmount();

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
      onPress={() => {}}
    >
      <SafeAreaView>
        <TouchableOpacity
          style={{ position: "absolute", top: -60, right: 0 }}
          onPress={() => {
            setShowResipt(false);
            HandleSavePrint();
          }}
        >
          <AntDesign name="closecircle" size={28} color="red" />
        </TouchableOpacity>
        <View style={styles.popupContainer}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", textTransform: "uppercase", textAlign: "center" }}>
              {addressData && addressData.CompName}
            </Text>
            <Text style={{ textAlign: "center", textTransform: "capitalize", width: "60%" }}>
              {addressData && addressData.Address1}
            </Text>
            <Text>{addressData && addressData.Address2}</Text>
            <Text>{addressData && addressData.Address3}</Text>
            {addressData && addressData.Address5 ? <Text>{addressData.Address5}</Text> : null}
            <Text>Ph:{addressData && addressData.MOBNO}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", borderBottomWidth: 1, borderTopWidth: 1 }}>
            <Text>Date: <Text style={{ fontWeight: "bold", fontSize: 13 }}>{currentDate}</Text></Text>
            <Text>Reciept No: <Text style={{ fontWeight: "bold", fontSize: 13 }}>{sevaDetails && sevaDetails.sevaReceiptID}</Text></Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end", marginTop: 10, paddingBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingRight: 10, alignItems: "center" }}>
                <Text style={[styles.SevaRecieptDetails, fontStyles.robotoBold]}>Sannidhi:</Text>
                <Text style={{ paddingLeft: 10, textAlign: "center" }}>{sevaDetails && sevaDetails.sannidhi}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingRight: 10, alignItems: "center" }}>
                <Text style={[styles.SevaRecieptDetails, fontStyles.robotoBold]}>Seva:</Text>
                <Text style={{ paddingLeft: 10, fontWeight: "bold", fontSize: 15 }}>{sevaDetails && sevaDetails.seva}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingRight: 10, alignItems: "center" }}>
                <Text style={[styles.SevaRecieptDetails, fontStyles.robotoBold]}>Name:</Text>
                <Text style={[{ paddingLeft: 10 }, fontStyles.robotoBold]}>{sevaDetails && sevaDetails.name}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingRight: 10, alignItems: "center" }}>
                <Text style={[styles.SevaRecieptDetails, fontStyles.robotoBold]}>Gothra:</Text>
                <Text style={[{ paddingLeft: 10 }, fontStyles.robotoBold]}>{sevaDetails && sevaDetails.gothra}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingRight: 10, alignItems: "center" }}>
                <Text style={[styles.SevaRecieptDetails, fontStyles.robotoBold]}>Rashi:</Text>
                <Text style={[{ paddingLeft: 10 }, fontStyles.robotoBold]}>{sevaDetails && sevaDetails.rashi}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingRight: 10, alignItems: "center" }}>
                <Text style={[styles.SevaRecieptDetails, fontStyles.robotoBold]}>Mobile:</Text>
                <Text style={[{ paddingLeft: 10 }, fontStyles.robotoBold]}>{sevaDetails && sevaDetails.phoneNo}</Text>
              </View>
            </View>
          </View>
          <View style={{ borderBottomWidth: 1, borderTopWidth: 1, paddingBottom: 10, paddingTop: 5, marginBottom: 5 }}>
            <Text style={[{ fontSize: 14 }, fontStyles.robotoBold]}>Seva Date:{currentDate}</Text>
            <View style={{ borderWidth: 1, width: "auto", flexDirection: "row", alignItems: "center", padding: 10, borderRadius: 10 }}>
              <FontAwesome name="rupee" size={20} color="black" />
              <Text style={{ fontSize: 20, marginLeft: 5, marginTop: -4, fontWeight: "bold" }}>{sevaAmount}</Text>
            </View>
          </View>
          <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
            <TouchableOpacity style={styles.button} onPress={() => { console.log("khkh"); }}>
              <FontAwesome name="share-square-o" size={24} color="white" />
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePrint}>
              <FontAwesome6 name="print" size={24} color="white" />
              <Text style={styles.buttonText}>Print</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  popupContainer: {
    width: "80%",
    height: "auto",
    backgroundColor: "white",
    top: -30,
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  SevaRecieptDetails: {
    fontSize: 14,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: "auto",
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
});

export default SevaReciept;