import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import CurrentDateComponent from "../compnents/Date";
import LabeledTextInput from "../compnents/InputComp";
import SerialNo from "../compnents/SeralNo";
import LabeledTextInputPhone from "../compnents/InputCompPhone";
import SannidhiCom from "../compnents/SannidhiCom";
import SevaCom from "../compnents/SevaCom";
import Dgothra from "../compnents/Dgothra";
import Dnakshara from "../compnents/Dnakshara";
import Drashi from "../compnents/Drashi";
import SevaReciept from "../compnents/SevaReciept";
import Showrreciept from "../compnents/Showrreciept";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Getseva from "../compnents/Getseva";
import Getsevalist from "../compnents/Getsevalist";
import LoadingComponent from "../compnents/Loading";
import { useFonts } from "expo-font";
import { format } from "date-fns";
import {
  getDeviceID,
  GetReciptDetails,
  GetSevaAmt,
  getTrnHdrSevaBySevaId,
  insertDeviceID,
  insertTrnHdrSEVA,
  syncData,
  UpdateTrahdrsevaBySevaNo,
} from "../db/database";
import { ToWords } from "to-words";
import NetInfo from "@react-native-community/netinfo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const FormScreen = ({ setUserName, setUserPassword, setLoggedIn }) => {
  const [error, setError] = useState({ type: "", msg: "" });
  const [name, setName] = useState("");
  const [sannidhi, setSannidhi] = useState("");
  const [seva, setSeva] = useState("");
  const [phone, setPhone] = useState();
  const [gothra, setGothra] = useState("");
  const [nakshatra, setNakshatra] = useState("");
  const [rashi, setRashi] = useState("");
  const [SeralNo, setSeralNo] = useState(0);
  const [showResipt, setShowResipt] = useState(false);
  const [ReceiptDetails, setReceiptDetails] = useState();
  const [translateMenu, setTranslateMenu] = useState(-290);
  const [showReceiptDetails, setShowReceiptDetails] = useState(false);
  const [showGetSeva, setShowGetSeva] = useState(false);
  const [showSevaList, setShowSevaList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState("Loading");
  const [selectedNo, setSelectedNo] = useState(null);
  const [selectedNoData, setSelectedNoData] = useState();
  const [DeviceID, setDeviceID] = useState();
  useEffect(() => {
    (async () => {
      let devID = await insertDeviceID();
      if (devID && devID.DevID) {
        const devIDStr = String(devID.DevID).padStart(2, "0"); // Ensure it's a string and pad with leading zero if necessary
        await AsyncStorage.setItem("deviceID", devIDStr);
        console.log("====================================");
        console.log(devIDStr, "From HomeScreen");
        console.log("====================================");
        setDeviceID(devIDStr);
      } else {
        console.log(
          "Failed to fetch Device ID from insertDeviceID, trying getDeviceID"
        );
        devID = await getDeviceID();
        if (devID) {
          const devIDStr = String(devID).padStart(2, "0"); // Ensure it's a string and pad with leading zero if necessary
          await AsyncStorage.setItem("deviceID", devIDStr);
          setDeviceID(devIDStr);
          console.log("====================================");
          console.log(devIDStr, "From HomeScreen via getDeviceID");
          console.log("====================================");
        } else {
          console.log(
            "Failed to fetch Device ID from both insertDeviceID and getDeviceID"
          );
          Alert.alert(
            "Error",
            "Failed to fetch Device ID. Please try again later.",
            [{ text: "OK" }]
          );
        }
      }
    })();
  }, []);

  // loading fonts
  const [loaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Popins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  const scrollViewRef = useRef();

  const initializeSerialNo = async () => {
    const date = new Date();
    const currentDate = date.getDate().toString().padStart(2, "0"); // Ensure date is in 'dd' format
    const yearLastTwoDigits = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure month is in 'MM' format
    const deviceID = await AsyncStorage.getItem("deviceID"); // Default to "00" if not found

    const storedData = await AsyncStorage.getItem("storedData");
    let storedDate, storedCount;

    if (storedData) {
      [storedDate, storedCount] = storedData.split("-").map(Number);
    }

    if (storedDate === parseInt(currentDate)) {
      // Same day, use the stored count
      const currentCount = storedCount.toString().padStart(5, "0");
      const newSerialNo = `${yearLastTwoDigits}${month}${currentDate}${deviceID}${currentCount}`;
      setSeralNo(newSerialNo);
    } else {
      // New day, reset the count
      const newCount = "00001";
      const newSerialNo = `${yearLastTwoDigits}${month}${currentDate}${deviceID}${newCount}`;
      setSeralNo(newSerialNo);
      await AsyncStorage.setItem("storedData", `${currentDate}-1`);
    }
  };

  const updateSerialNo = async () => {
    const date = new Date();
    const currentDate = date.getDate().toString().padStart(2, "0"); // Ensure date is in 'dd' format
    const yearLastTwoDigits = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure month is in 'MM' format
    const deviceID = await AsyncStorage.getItem("deviceID"); // Default to "00" if not found

    const storedData = await AsyncStorage.getItem("storedData");
    let storedDate, storedCount;

    if (storedData) {
      [storedDate, storedCount] = storedData.split("-").map(Number);
    }

    if (storedDate === parseInt(currentDate)) {
      // Same day, increment the count
      const currentCount = (storedCount + 1).toString().padStart(5, "0");
      const newSerialNo = `${yearLastTwoDigits}${month}${currentDate}${deviceID}${currentCount}`;
      setSeralNo(newSerialNo);
      await AsyncStorage.setItem(
        "storedData",
        `${currentDate}-${storedCount + 1}`
      );
    } else {
      // New day, reset the count
      const newCount = "00001";
      const newSerialNo = `${yearLastTwoDigits}${month}${currentDate}${deviceID}${newCount}`;
      setSeralNo(newSerialNo);
      await AsyncStorage.setItem("storedData", `${currentDate}-1`);
    }
  };
  console.log(selectedNo, "from the HomeScreen.js");
  const GetSevaById = async () => {
    const test = await getTrnHdrSevaBySevaId(selectedNo);
    console.log("====================================");
    console.log(test, "test from HomeScreen");
    console.log("====================================");
    return test; // Return the fetched data
  };
  useEffect(() => {
    initializeSerialNo();
    GetSevaById()
      .then((data) => {
        setGothra(data && data.GOTHRAID);
        setNakshatra(data && data.NAKSHATRAID);
        setRashi(data && data.RASHIID);
        setName(data && data.KNAME);
        setPhone(data && data.MOBNUM);
        setSannidhi(data && data.SANNIDHIID);
        setSeva(data && data.SVAID);
        // setSeralNo(data && data.SEVANO);
      })
      .catch((error) => console.log(error));
  }, [selectedNo]);

  useEffect(() => {
    getDeviceID().then((res) => {
      console.log("Device ID from HomeScreen");
      console.log(res);
      console.log("====================================");
    });
  }, []);

  const convertAmountToWords = (amount) => {
    const toWords = new ToWords();

    let words = toWords.convert(amount, {
      currency: true,
      ignoreDecimal: true,
    });
    // words = Four Hundred Fifty Two Rupees Only
    return words;
  };

  const handleSubmit = async () => {
    let hasError = false;
    if (!DeviceID) {
      Alert.alert("Device ID not found", "Please try again later");
      return;
    }
    // Check if 'name' is empty
    if (name === "") {
      setError({ type: "name", msg: "Name is required" });
      hasError = true;
      return;
    }

    // Check if 'sannidhi' is empty
    if (sannidhi === "") {
      setError({ type: "sannidhi", msg: "Sannidhi is required" });
      hasError = true;
      return;
    }

    // Check if 'seva' is empty
    if (seva === "") {
      setError({ type: "seva", msg: "Seva is required" });
      hasError = true;
      return;
    }

    // If there are errors, disable the button and set the errors
    console.log(
      sannidhi,
      seva,
      name,
      phone,
      gothra,
      nakshatra,
      rashi,
      "from HomeScreen"
    );

    if (hasError) {
      return;
    }

    try {
      const sevaAmt = await GetSevaAmt(seva);
      if (!sevaAmt) {
        throw new Error("Invalid SevaAmt response");
      }

      const sevaData = {
        SEVANO: SeralNo,
        Prefix: "",
        PrintSEVANO: SeralNo,
        SEVADate: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"),
        SEVADateYear: new Date().getFullYear(),
        SEVADateMonth: new Date().getMonth() + 1,
        Authorised: "Y",
        AuthBy: "",
        AuthOn: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"),
        ChangedBy: "",
        ChangedOn: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"),
        Cancelled: "N",
        AddedBy: "Admin",
        AddedOn: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"),
        SANNIDHIID: sannidhi,
        RMKS: "",
        CHQNO: "",
        CHQDATE: "",
        SevaRate: sevaAmt, // need to fetch from the seva table
        NoOfdays: 1,
        TotalAmt: sevaAmt, // need to fetch from the seva table
        Add1: "",
        Add2: "",
        Add3: "",
        Add4: "",
        AMTINWRDS: convertAmountToWords(sevaAmt), // need to convert the amount in words
        RegularD: "N",
        DaysPrintText: "",
        KNAME: name,
        SECKNAME: "",
        NAKSHATRAID: nakshatra || "",
        SECNAKSHATRAID: "",
        GOTHRAID: gothra || "",
        BANKNAME: "",
        PAYMENT: "",
        SVAID: seva,
        MOBNUM: phone,
        REFNO: "",
        ADDRES: "",
        ISSUEDBY: "Admin",
        GRPSEVAID: "",
        NAMEINKAN: "",
        MOBNO: phone,
        PRASADA: "No",
        RASHIID: rashi || "",
        Synced: false,
      };

      insertTrnHdrSEVA(sevaData)
        .then((res) => {
          console.log("data inserted successfully");
          updateSerialNo();
          alert("Data Saved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
      HandelClear();
    } catch (error) {
      console.log("Error fetching SevaAmt:", error);
    }
    // submit the form with the data on url first time
  };

  const HandelClear = () => {
    setName("");
    setSannidhi("");
    setSeva("");
    setPhone("");
    setGothra("");
    setNakshatra("");
    setRashi("");
    setSelectedNoData("");
    setSelectedNo(null);
    setError({ type: "", msg: "" });
  };
  const HandleSavePrint = async () => {
    let hasError = false;

    // Check if 'name' is empty
    if (!name) {
      setError({ type: "name", msg: "Name is required" });
      hasError = true;
    }

    // Check if 'sannidhi' is empty
    if (sannidhi === "") {
      setError({ type: "sannidhi", msg: "Sannidhi is required" });
      hasError = true;
    }

    // Check if 'seva' is empty
    if (seva === "") {
      setError({ type: "seva", msg: "Seva is required" });
      hasError = true;
    }
    if (hasError) {
      return;
    }

    // If there are no errors, submit the form
    const sevaAmt = await GetSevaAmt(seva);
    const sevaData = {
      SEVANO: SeralNo,
      Prefix: "",
      PrintSEVANO: SeralNo,
      SEVADate: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"),
      SEVADateYear: new Date().getFullYear(),
      SEVADateMonth: new Date().getMonth() + 1,
      Authorised: "Y",
      AuthBy: "",
      AuthOn: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"),
      ChangedBy: "",
      ChangedOn: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"),
      Cancelled: "N",
      AddedBy: "Admin",
      AddedOn: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"),
      SANNIDHIID: sannidhi,
      RMKS: "",
      CHQNO: "",
      CHQDATE: "",
      SevaRate: sevaAmt, // need to fetch from the seva table
      NoOfdays: 1,
      TotalAmt: sevaAmt, // need to fetch from the seva table
      Add1: "",
      Add2: "",
      Add3: "",
      Add4: "",
      AMTINWRDS: convertAmountToWords(sevaAmt), // need to convert the amount in words
      RegularD: "N",
      DaysPrintText: "",
      KNAME: name,
      SECKNAME: "",
      NAKSHATRAID: nakshatra,
      SECNAKSHATRAID: "",
      GOTHRAID: gothra,
      BANKNAME: "",
      PAYMENT: "",
      SVAID: seva,
      MOBNUM: phone || "",
      REFNO: "",
      ADDRES: "",
      ISSUEDBY: "Admin",
      GRPSEVAID: "",
      NAMEINKAN: "",
      MOBNO: phone,
      PRASADA: "No",
      RASHIID: rashi,
      Synced: false,
    };

    try {
      setLoadingContent("Saving Data");
      setLoading(true);
      await insertTrnHdrSEVA(sevaData);
      console.log("data inserted successfully");
      await updateSerialNo();

      // Fetch receipt details and update state
      const receiptDetails = await GetReciptDetails();
      setReceiptDetails(receiptDetails);
      setShowResipt(true);
      setLoading(false);
      setLoadingContent("Loading");
    } catch (err) {
      console.log(err);
    }

    HandelClear();
  };

  const HandelSyncClick = async () => {
    // Check internet connection
    setLoadingContent("Syncing Data");
    setLoading(true);
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Alert.alert(
        "No Internet Connection",
        "Please turn on the internet to proceed with the sync."
      );
      return;
    }

    try {
      const res = await syncData();
      // console.log("data from sync");
      // console.log(res);
      // console.log("====================================");
      Alert.alert("Sync Complete", `${res.message}`);
    } catch (err) {
      console.log(err, "error from sync");
      Alert.alert("Sync Failed", `${err.message}`);
    } finally {
      setLoading(false);
      setLoadingContent("Loading");
    }
  };

  if (!loaded) {
    return <LoadingComponent name="Loading" />;
  }

  const HandleUpdateClick = async () => {
    try {
      // Fetch the current data
      const currentData = await GetSevaById();

      if (!currentData) {
        console.log("No data found for the selected SEVANO");
        return;
      }

      // Update the data with the new values from the form
      const updatedData = {
        ...currentData,
        Prefix: "", // Replace with actual value
        PrintSEVANO: SeralNo, // Replace with actual value
        SEVADate: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"), // Replace with actual value
        SEVADateYear: new Date().getFullYear(), // Replace with actual value
        SEVADateMonth: new Date().getMonth() + 1, // Replace with actual value
        Authorised: "Y", // Replace with actual value
        AuthBy: "", // Replace with actual value
        AuthOn: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"), // Replace with actual value
        ChangedBy: "", // Replace with actual value
        ChangedOn: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"), // Replace with actual value
        Cancelled: "N", // Replace with actual value
        AddedBy: "Admin", // Replace with actual value
        AddedOn: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"), // Replace with actual value
        SANNIDHIID: sannidhi, // Replace with actual value
        RMKS: "", // Replace with actual value
        CHQNO: "", // Replace with actual value
        CHQDATE: "", // Replace with actual value
        SevaRate: currentData.SevaRate, // Replace with actual value
        NoOfdays: 1, // Replace with actual value
        TotalAmt: currentData.TotalAmt, // Replace with actual value
        Add1: "", // Replace with actual value
        Add2: "", // Replace with actual value
        Add3: "", // Replace with actual value
        Add4: "", // Replace with actual value
        AMTINWRDS: convertAmountToWords(currentData.TotalAmt), // Replace with actual value
        RegularD: "N", // Replace with actual value
        DaysPrintText: "", // Replace with actual value
        KNAME: name, // Replace with actual value
        SECKNAME: "", // Replace with actual value
        NAKSHATRAID: nakshatra || "", // Replace with actual value
        SECNAKSHATRAID: "", // Replace with actual value
        GOTHRAID: gothra || "", // Replace with actual value
        BANKNAME: "", // Replace with actual value
        PAYMENT: "", // Replace with actual value
        SVAID: seva, // Replace with actual value
        MOBNUM: phone, // Replace with actual value
        REFNO: "", // Replace with actual value
        ADDRES: "", // Replace with actual value
        ISSUEDBY: "Admin", // Replace with actual value
        GRPSEVAID: "", // Replace with actual value
        NAMEINKAN: "", // Replace with actual value
        MOBNO: phone, // Replace with actual value
        PRASADA: "No", // Replace with actual value
        RASHIID: rashi || "", // Replace with actual value
        Synced: false, // Set to false as it's a new update
      };

      // Save the updated data back to the database
      await UpdateTrahdrsevaBySevaNo(updatedData, selectedNo);

      console.log("Record updated successfully");
      alert("Data updated successfully");
    } catch (error) {
      console.log("====================================");
      console.log("Error from HandleUpdateClick", error);
      console.log("====================================");
    }
  };

  return (
    <SafeAreaView>
      <SafeAreaView style={{ top: 0, flex: 1 }}>
        <Image
          style={{
            // left: -30,
            width: "100%", // Ensures the image takes up the entire width of its container
            //  height: '100%', // Ensures the image takes up the entire height of its container
            resizeMode: "contain", // Maintains aspect ratio and fits within the container
          }}
          source={require("../assets/Strip.png")}
        />
      </SafeAreaView>
      <SafeAreaView>
        {showResipt && (
          <SevaReciept
            sevaDetails={ReceiptDetails}
            setShowResipt={setShowResipt}
            HandleSavePrint={HandleSavePrint}
          />
        )}
        <SafeAreaView>
          <View style={{ position: "static", top: 35, bottom: 0 }}>
            <View
              style={{
                justifyContent: "space-around",
                alignItems: "baseline",
                left: 10,
                top: 10,
              }}
            >
              <Text
                onPress={() => {
                  setTranslateMenu(0);
                }}
                style={{ color: "#000", textAlign: "center", fontSize: 27 }}
              >
                ☰
              </Text>
              <Text
                style={[
                  {
                    // fontWeight: "500",
                    fontSize: 20,
                    left: 100,
                    top: -28,
                    alignContent: "center",
                    textAlign: "center",
                  },
                  styles.fontBold,
                ]}
              >
                Seva Receipt
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", left: -10 }}>
            <CurrentDateComponent />
            {<SerialNo SeralNo={SeralNo} setSeralNo={setSeralNo} />}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              paddingHorizontal: 20,
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                paddingHorizontal: 15,
              }}
            >
              <Text style={{ fontSize: 16 }}>
                Device ID: <Text style={{ color: "" }}>{DeviceID || ""}</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{
                marginTop: -27,
                width: "25%",
                borderRadius: 10,
                alignItems: "center",
                padding: 10,
                flexDirection: "row",
                backgroundColor: "#f2f2f2",
                alignContent: "center",
              }}
              onPress={HandelSyncClick}
            >
              <AntDesign name="cloud" size={19} color="#333333" />
              <Text
                style={[
                  {
                    color: "#333333",
                    marginLeft: 5,
                    textTransform: "uppercase",
                  },
                  styles.font,
                ]}
              >
                Sync
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.container}
        >
          <SafeAreaView
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: 590,
              top: -85,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <SannidhiCom
                requred={true}
                setSannidhi={setSannidhi}
                value={sannidhi}
                dplable={"Sannidhi*"}
                lable={"Sannidhi"}
              />
              {sannidhi === "" || undefined || null ? (
                <Text style={{ color: "red" }}>Sannidhi is required</Text>
              ) : null}
              {error.type === "sannidhi" ? (
                <Text style={{ color: "red" }}>Sannidhi is required</Text>
              ) : null}
              <SevaCom
                requred={true}
                value={seva}
                setSeva={setSeva}
                dplable={"seva*"}
                lable={"Seva"}
              />
              {error.type === "seva" ? (
                <Text style={{ color: "red" }}>Seva is required</Text>
              ) : null}
              <LabeledTextInput
                requred={true}
                error={error.type === "name" ? true : false}
                label={"name"}
                setName={setName}
                name={name}
                // placeholder={"Name"}
                key={2313}
              />
              {error.type === "name" ? (
                <Text style={{ color: "red", marginBottom: 10 }}>
                  Name is required
                </Text>
              ) : null}
              <LabeledTextInputPhone
                setPhone={setPhone}
                phone={phone}
                label={"phone no"}
                // placeholder={"Phone No"}
                keyboardType="numeric"
                key={"hy97975"}
              />
              <Dgothra
                gothra={gothra}
                setGothra={setGothra}
                dplable={"Gothra"}
                lable={"Gothra"}
              />
              <Dnakshara
                nakshatra={nakshatra}
                setNakshatra={setNakshatra}
                dplable={"Nakshara"}
                lable={"Nakshara"}
              />
              <Drashi
                rashi={rashi}
                setRashi={setRashi}
                dplable={"Rashi"}
                lable={"Rashi"}
              />
            </View>
          </SafeAreaView>
          {/* Button Container */}
          <View
            style={{
              top: -130,
              flex: 1,
              flexDirection: "column",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {selectedNo ? (
                <TouchableOpacity
                  onPress={() => {
                    console.log("====================================");
                    console.log("Update button pressed");
                    console.log("====================================");
                    HandleUpdateClick();
                  }}
                  style={{ marginBottom: 10, flexBasis: "48%" }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      textAlign: "center",
                      backgroundColor: "#4287f5",
                      paddingBottom: 5,
                      paddingTop: 5,
                      fontFamily: "Roboto-Regular",
                      borderRadius: 10,
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="update"
                      size={22}
                      style={{ marginBottom: 10 }}
                      color="white"
                    />{" "}
                    Update
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{ marginBottom: 10, flexBasis: "48%" }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      textAlign: "center",
                      backgroundColor: "#4287f5",
                      paddingBottom: 5,
                      paddingTop: 5,
                      fontFamily: "Roboto-Regular",
                      borderRadius: 10,
                    }}
                  >
                    <FontAwesome6 name="save" size={20} color="white" /> Save
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={HandleSavePrint}
                style={{ marginBottom: 10, flexBasis: "48%" }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    textAlign: "center",
                    backgroundColor: "#4287f5",
                    paddingBottom: 5,
                    paddingTop: 5,
                    fontFamily: "Roboto-Regular",
                    borderRadius: 10,
                  }}
                >
                  <FontAwesome6 name="print" size={20} color="white" /> Save &
                  Print
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={HandelClear}
                style={{ marginBottom: 10, flexBasis: "48%" }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    textAlign: "center",
                    backgroundColor: "#4287f5",
                    paddingBottom: 5,
                    paddingTop: 5,
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Roboto-Regular",
                    borderRadius: 10,
                  }}
                >
                  <Feather name="minus-circle" size={20} color="white" /> Clear
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowReceiptDetails(true);
                }}
                style={{ marginBottom: 10, flexBasis: "48%" }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#4287f5",
                    paddingBottom: 5,
                    paddingTop: 5,
                    borderRadius: 10,
                  }}
                >
                  <FontAwesome
                    name="list-ul"
                    size={20}
                    color="white"
                    style={{ marginTop: 3, marginBottom: "auto" }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      textAlign: "center",
                      marginLeft: 10, // Add some margin to separate the icon and text
                      fontFamily: "Roboto-Regular",
                    }}
                  >
                    List
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {/* Menu Section */}
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "#fafbfc",
            height: "100%",
            width: 250,
            transform: [{ translateX: translateMenu }],
            zIndex: 999,
            padding: 20,
            elevation: 20,
          }}
        >
          <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 60, height: 60 }}
                source={require("../assets/account.png")}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 10,
                  fontFamily: "Popins-Bold",
                }}
              >
                Admin
              </Text>
              <TouchableOpacity
                style={{ left: 60 }}
                onPress={() => {
                  setTranslateMenu(-290);
                }}
              >
                <AntDesign name="closecircle" size={28} color="red" />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 50 }}>
              <Button
                title="Seva List"
                onPress={() => {
                  setShowSevaList(true);
                  setTranslateMenu(-290);
                  console.log("Seva list button pressed");
                }}
              />
              <TouchableOpacity
                style={[{ marginTop: 10, marginBottom: 10 }, styles.font]}
              >
                <Button
                  title="Getseva"
                  onPress={() => {
                    setShowGetSeva(true);
                    setTranslateMenu(-290);
                    console.log("Getseva button pressed");
                  }}
                />
              </TouchableOpacity>
              <Button
                title="List"
                onPress={() => {
                  setLoading(true);
                  setLoadingContent("Loading Receipts");
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                  setShowReceiptDetails(true);
                  setTranslateMenu(-290);
                  console.log("close button pressed");
                }}
              />

              <Text
                onPress={() => {
                  setLoggedIn(false);
                  setUserName("");
                  setUserPassword("");
                }}
                style={[styles.buttonStyle, { fontFamily: "Roboto-Regular" }]}
              >
                Logout
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </SafeAreaView>
      {showReceiptDetails && (
        <Showrreciept
          setShowReceiptDetails={setShowReceiptDetails}
          setSelectedNo={setSelectedNo}
          setLoading={setLoading}
        />
      )}
      {showGetSeva && <Getseva setShowGetSeva={setShowGetSeva} />}
      {showSevaList && <Getsevalist setShowSevaList={setShowSevaList} />}
      {loading && <LoadingComponent name={loadingContent} />}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingTop: StatusBar.currentHeight,
    padding: 20,
    top: 10,
    fontFamily: "Roboto-Regular",
    // height: 700,
    // backgroundColor: "#000",
    // flex:1,
    // justifyContent:'center',
    // alignItems:"center"
  },
  buttonStyle: {
    textAlign: "center",
    marginTop: 20,
    backgroundColor: "tomato", // Button background color
    padding: 10, // Button padding
    borderRadius: 5, // Button border radius
    alignItems: "center", // Center the text inside the button
  },
  inputError: {
    borderColor: "red",
  },

  logoutButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  label: {
    textTransform: "capitalize",
    marginBottom: 5,
    fontWeight: "bold",
    marginRight: "auto",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  font: {
    fontFamily: "Roboto-Regular",
  },
  fontBold: {
    fontFamily: "Popins-Bold",
  },
});

export default FormScreen;
