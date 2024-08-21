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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        html, body {
            margin: 0;
            padding: 0;
           /* // height: 100%; */
            font-size: 8px; /* Adjust font size as needed */
        }
        .container {
            position: relative;
            width: 100%;
            min-height: 100%;
            background-color: white;
            padding: 5px;
            box-sizing: border-box;
        }
        .header, .content, .footer {
            text-align: center;
        }
        .header h1, .content p, .footer p {
            margin: 2px 0;
        }
        .footer {
            border-bottom: 1px solid;
            border-top: 1px solid;
            padding: 5px 0;
            margin-bottom: 5px;
        }
        .footer div {
            border: 1px solid;
            display: flex;
            align-items: center;
            padding: 5px;
        }
        @media print {
            body {
                width: 2.91in; /* A7 width */
                height: 4.13in; /* A7 height */
            }
        }
        @media screen {
            body {
                width: 8.27in; /* A4 width */
                height: 11.69in; /* A4 height */
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="font-size: 11px; font-weight: bold; text-transform: uppercase;">${addressData?.CompName}</h1>
            <p style="text-transform: capitalize; width: 60%; margin: 2px auto; font-size: 11px;">
                ${addressData?.Address1} <br> ${addressData?.Address2}<br> ${addressData?.Address3} <br>${addressData?.Address5 ? `${addressData.Address5} ` : ''}Ph: ${addressData?.MOBNO}
            </p>
        </div>
        <div class="content">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid; border-top: 1px solid; padding: 5px 0;">
                <p style="font-size: 9px;">Date: <strong style="font-size: 11px;">${currentDate}</strong></p>
                <p style="font-size: 9px;">Receipt No: <strong style="font-size: 11px;">${sevaDetails?.sevaReceiptID}</strong></p>
            </div>
            <div style="margin-top: 5px; padding-bottom: 5px;">
                <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                    <p style="font-weight: bold; margin: 2px 0; font-size: 12px;">Name:</p>
                    <p style="padding-left: 5px; margin: 2px 0; font-size: 13px;">${sevaDetails?.name}</p>
                </div>
                <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                    <p style="font-weight: bold; margin: 2px 0; font-size: 12px;">Gothra:</p>
                    <p style="padding-left: 5px; margin: 2px 0; font-size: 13px;">${sevaDetails?.gothra}</p>
                </div>
                <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                    <p style="font-weight: bold; margin: 2px 0; font-size: 12px;">Nakshatra:</p>
                    <p style="padding-left: 5px; margin: 2px 0; font-size: 13px;">${sevaDetails?.nakshatra}</p>
                </div>
                <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                    <p style="font-weight: bold; margin: 2px 0; font-size: 12px;">Rashi:</p>
                    <p style="padding-left: 5px; margin: 2px 0; font-size: 13px;">${sevaDetails?.rashi}</p>
                </div>
                <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                    <p style="font-weight: bold; margin: 2px 0; font-size: 12px;">Sannidhi:</p>
                    <p style="padding-left: 5px; margin: 2px 0; font-size: 13px;">${sevaDetails?.sannidhi}</p>
                </div>
                <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                    <p style="font-weight: bold; margin: 2px 0; font-size: 12px;">Seva:</p>
                    <p style="padding-left: 5px; font-weight: bold; font-size: 14px; margin: 2px 0;">${sevaDetails?.seva}</p>
                </div>
                <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                    <p style="font-weight: bold; margin: 2px 0; font-size: 12px;">Mobile:</p>
                    <p style="padding-left: 5px; margin: 2px 0; font-size: 13px;">${sevaDetails?.phoneNo}</p>
                </div>
            </div>
        </div>
        <div class="footer">
            <p style="font-size: 12px; font-weight: bold; text-align: left;">Seva Date: ${currentDate}</p>
            <div style="width: fit-content;">
                <p style="font-size: 13px; margin-left: 5px; margin-top: -4px; font-weight: bold;">₹${sevaAmount}</p>
            </div>
        </div>
    </div>
</body>
</html>
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
                <Text style={{ paddingLeft: 10, textAlign: "center", fontWeight: "bold", }}>{sevaDetails && sevaDetails.sannidhi}</Text>
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