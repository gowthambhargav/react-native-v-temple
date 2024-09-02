

android apk build cmd
eas build -p android --profile preview

ximosay984@vasomly.com Pass:Gowtham@1234


select * from trnhdrseva


add sync btn whine the button is clicked get the all data saved in sevareceipts and update it to trnhdrseva this db in mysql


  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-size: 8px; /* Adjust font size as needed */
            }
            .container {
                position: relative;
                width: 100%;
                height: 100%;
                background-color: white;
                padding: 5px;
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
                <h1 style="font-size: 14px; font-weight: bold; text-transform: uppercase;">${addressData?.CompName}</h1>
                <p style="text-transform: capitalize; width: 60%; margin: 2px auto;">
                    ${addressData?.Address1} <br> ${addressData?.Address2}<br> ${addressData?.Address3} <br>${addressData?.Address5 ? `${addressData.Address5} ` : ''}Ph: ${addressData?.MOBNO}
                </p>
            </div>
            <div class="content">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid; border-top: 1px solid; padding: 5px 0;">
                    <p>Date: <strong>${currentDate}</strong></p>
                    <p>Receipt No: <strong>${sevaDetails?.sevaReceiptID}</strong></p>
                </div>
                <div style="margin-top: 5px; padding-bottom: 5px;">
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Name:</p>
                        <p style="padding-left: 5px; margin: 2px 0;">${sevaDetails?.name}</p>
                    </div>
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Gothra:</p>
                        <p style="padding-left: 5px; margin: 2px 0;">${sevaDetails?.gothra}</p>
                    </div>
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Nakshatra:</p>
                        <p style="padding-left: 5px; margin: 2px 0;">${sevaDetails?.nakshatra}</p>
                    </div>
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Rashi:</p>
                        <p style="padding-left: 5px; margin: 2px 0;">${sevaDetails?.rashi}</p>
                    </div>
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Sannidhi:</p>
                        <p style="padding-left: 5px; margin: 2px 0;">${sevaDetails?.sannidhi}</p>
                    </div>
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Seva:</p>
                        <p style="padding-left: 5px; font-weight: bold; font-size: 15px; margin: 2px 0;">${sevaDetails?.seva}</p>
                    </div>
                    <div style="display: flex; justify-content: flex-start; padding-right: 5px; align-items: center;">
                        <p style="font-weight: bold; margin: 2px 0;">Mobile:</p>
                        <p style="padding-left: 5px; margin: 2px 0;">${sevaDetails?.phoneNo}</p>
                    </div>
                </div>
            </div>
            <div class="footer">
                <p style="font-size: 12px; font-weight: bold; text-align: left;">Seva Date: ${currentDate}</p>
                <div>
                    <p style="font-size: 16px; margin-left: 5px; margin-top: -4px; font-weight: bold;">₹${sevaAmount}</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;




import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import CardWithShowMore from "./CardWithShowMore";
import * as Location from "expo-location";

const Getsevalist = ({ setShowSevaList }) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [SevaDataList, setSevaDataList] = useState();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFrom(Platform.OS === "ios");
    setFromDate(currentDate);
  };

  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowTo(Platform.OS === "ios");
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
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const HandeleGetsevaList = () => {
    console.log(
      formatDate(fromDate),
      formatDate(toDate),
      "Fetching Seva List"
    );

    axios
      .get(
        `http://192.168.1.24/vTempleApi/GetSevaList/${formatDate(
          fromDate
        )}/${formatDate(toDate)}`
      )
      .then((res) => {
        console.log("API Response:", res.data);
        const data = JSON.parse(`${res.data}`);
        console.log("Parsed Data:", data);
        setSevaDataList(data); // Make sure to set the data to state
      })
      .catch((err) => {
        console.error("Error fetching Seva List:", err);
      });
  };

  const HandelGetCurrentLocation = async () => {
    try {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Try to get the current location
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        // timeout: 5000, // Optionally set a timeout
      });
      setLocation(location);
      console.log("Current Location:", location);
    } catch (error) {
      console.error("Error getting current location:", error);
      setErrorMsg("Error fetching location. Make sure GPS is enabled.");
    }
  };

  return (
    <SafeAreaView
      style={{
        position: "absolute",
        backgroundColor: "#8a8a8a",
        flex: 1,
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 20, padding: 10 }}>
        <View style={{ flex: 1, margin: 5 }}>
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
        <View style={{ flex: 1, margin: 5 }}>
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
          <Text>
            {formatDate(fromDate)} - {formatDate(toDate)}
          </Text>
          {SevaDataList ? <CardWithShowMore data={SevaDataList} /> : null}
        </View>
        {location && (
          <View style={{ padding: 10 }}>
            <Text>Latitude: {location.coords.latitude}</Text>
            <Text>Longitude: {location.coords.longitude}</Text>
          </View>
        )}
        {errorMsg && (
          <View style={{ padding: 10 }}>
            <Text>{errorMsg}</Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: 10,
        }}
      >
        <Button
          title="Get Current Location"
          color={"green"}
          onPress={HandelGetCurrentLocation}
        />
        <TouchableOpacity style={{ marginBottom: 10 }}>
          <Button
            title="Get Seva"
            color={"#4285F4"}
            onPress={() => {
              console.log("Clicked on Get Seva");
              HandeleGetsevaList();
            }}
          />
        </TouchableOpacity>
        <Button
          title="Close"
          color={"tomato"}
          onPress={() => {
            setShowSevaList(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Getsevalist;

