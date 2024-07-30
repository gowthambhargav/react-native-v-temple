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
// import DropdownComponent from "../compnents/dropdown";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
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
import axios from "axios";
import SevaReciept from "../compnents/SevaReciept";
import Showrreciept from "../compnents/Showrreciept";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatabaseExample from "./DatabaseExample";
import { fetchUsers } from "../db/queries";

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
  const [submissionError, setSubmissionError] = useState(false);
  const [showResipt, setShowResipt] = useState(false);
  const [ReceiptDetails, setReceiptDetails] = useState();
  const [translateMenu, setTranslateMenu] = useState(-250);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [showReceiptDetails, setShowReceiptDetails] = useState(false);
  const [sqlDetails, setSqlDetails] = useState();
  useEffect(() => {
    const initializeSerialNo = async () => {
      const date = new Date();
      const currentDate = date.getDate();
      const yearLastTwoDigits = date.getFullYear().toString().slice(-2);
      const deviceID = "01";

      const storedData = await AsyncStorage.getItem('storedData');
      let storedDate, storedCount;

      if (storedData) {
        [storedDate, storedCount] = storedData.split('-').map(Number);
      }

      if (storedDate === currentDate) {
        // Same day, use the current count without incrementing
        const currentCount = storedCount.toString().padStart(5, '0');
        setSeralNo(`${yearLastTwoDigits}${currentDate}${deviceID}${currentCount}`);
      } else {
        // New day, reset the count
        const newCount = "00001";
        setSeralNo(`${yearLastTwoDigits}${currentDate}${deviceID}${newCount}`);
        await AsyncStorage.setItem('storedData', `${currentDate}-1`);
      }
    };

    initializeSerialNo();
    const sqldata = async () => {
      await fetchUsers().then((res) => {
        console.log(res, "data from db");
      }).catch((err) => {
        console.log(err);
      });
    };
    sqldata();
  }, []);

  const handleSubmit = () => {
    let hasError = false;

    // Check if 'name' is empty
    if (name === "") {
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

    // If there are no errors, submit the form
    const url = "https://react-native-v-temple-b.onrender.com/api/sevaReceipt";
    const url2 = "https://react-native-v-temple-b.onrender.com/api/sevareceiptsql";
    // Get Seva Receipt ID from the server using the url and then submit the form on url2 with the data
    // whine submitting the form with the url use the patch to get the sevaId and rashiiId and gothraId ...so on
    // then submit the form with the data on url2


console.log('====================================');
console.log(sqlDetails, "sqlDetails");
console.log('====================================');


    // submit the form with the data on url first time
    axios
      .post(url, {
        seva,
        sannidhi,
        name,
        phoneNo: phone,
        gothra,
        nakshatra,
        rashi,
        sevaReceiptID: SeralNo,
      })
      .then( async (res) => {
        setError({ type: "", msg: "" });
        setName();
        setSannidhi("");
        setSeva("");
        setPhone("");
        setGothra("");
        setNakshatra("");
        setRashi("");
        // update the serial number in the state and AsyncStorage
        const storedSerialNo = await AsyncStorage.getItem('serialNo');
const newSerialNo = (parseInt(storedSerialNo) + 1).toString().padStart(5, '0');
setSeralNo(newSerialNo);
await AsyncStorage.setItem('serialNo', newSerialNo);
        // submit the form with the data on url2
        axios.patch(url, {
          sevaID:  seva,
          sannidhiID:sannidhi,
          gothraID: gothra,
          nakshatraId: nakshatra,
          rashiID: rashi,
        }).then((res) => {
          const {
            findSevaId,
            findSannidhiId,
            findSevaAmt,
            findNakshatraId,
            findGothraId,
            findRashiId,
          } = res.data.data;
          console.log(res.data.data, "ldsjflslfj", "data from patch");
          setSqlDetails(res.data.data);
          console.log('====================================');
          console.log( 
          {
            SEVAID: findSevaId,
            SEVANO: SeralNo,
            PrintSEVANO: SeralNo,
            SANNIDHIID: findSannidhiId,
            SevaRate: findSevaAmt,
            TotalAmt: findSevaAmt,
            NAKSHATRAID: res.data.data.findNakshatraId ,
            GOTHRAID: res.data.data.findGothraId ,
            SVAID: findSevaId ,
            MOBNUM: "9876543210",
            RASHIID: res.data.data.findRashiId ,
          },
          "data from patch");
          console.log('====================================');
          axios
            .post(url2, {
              SEVAID: res.data.data.findSevaId,
              SEVANO: SeralNo,
              PrintSEVANO: SeralNo,
              SANNIDHIID: res.data.data.findSannidhiId,
              SevaRate: res.data.data.findSevaAmt,
              TotalAmt:res.data.data.findSevaAmt,
              NAKSHATRAID:res.data.data.findNakshatraId,
              GOTHRAID: res.data.data.findGothraId,
              SVAID: findSevaId ,
              MOBNUM: phone,
              RASHIID: res.data.data.findRashiId,
              KNAME: name,
            })
            .then((res) => {
              console.log(res.data.data, "data from post");
            })
            .catch((err) => {
              console.log(err);
            });
        }).catch((err) => {
          console.log(err);
        })
        Alert.alert("Seva Receipt", "Seva Receipt is submitted successfully");

        setReceiptDetails(res.data.data);
      })
      .catch((err) => {
        setSubmissionError(true);
        Alert.alert(
          "Seva Receipt",
          "Seva Receipt is not submitted successfully"
        );
        console.log(err);
      });
  };

  const scrollViewRef = useRef();
  const HandelClear = () => {
    setName("");
    setSannidhi("");
    setSeva("");
    setPhone("");
    setGothra("");
    setNakshatra("");
    setRashi("");
  };
  const HandleSavePrint = () => {
    let hasError = false;

    // Check if 'name' is empty
    if (!name) {
      setError({ type: "name", msg: "Name is required" });
      hasError = true;
      // Alert.alert("Name is required");
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
    const url = "https://react-native-v-temple-b.onrender.com/api/sevaReceipt";
    const url2 = "https://react-native-v-temple-b.onrender.com/api/sevareceiptsql";
    axios
      .post(url, {
        seva,
        sannidhi,
        name,
        phoneNo: phone,
        gothra,
        nakshatra,
        rashi,
        sevaReceiptID: SeralNo,
      })
      .then( async (res) => {
        setError({ type: "", msg: "" });
        setName("");
        setSannidhi("");
        setSeva("");
        setPhone("");
        setGothra("");
        setNakshatra("");
        setRashi("");
        // update the serial number in the state and AsyncStorage;
        const storedSerialNo = await AsyncStorage.getItem('serialNo');
const newSerialNo = (parseInt(storedSerialNo) + 1).toString().padStart(5, '0');
setSeralNo(newSerialNo);
await AsyncStorage.setItem('serialNo', newSerialNo);
setShowResipt(true);
        setReceiptDetails(res.data.data);
        axios.patch(url, {
          sevaID:  seva,
          sannidhiID:sannidhi,
          gothraID: gothra,
          nakshatraId: nakshatra,
          rashiID: rashi,
        }).then((res) => {
          const {
            findSevaId,
            findSannidhiId,
            findSevaAmt,
            findNakshatraId,
            findGothraId,
            findRashiId,
          } = res.data.data;
          console.log(res.data.data, "ldsjflslfj", "data from patch");
          setSqlDetails(res.data.data);
          axios
            .post(url2, {
              SEVAID: res.data.data.findSevaId,
              SEVANO: SeralNo,
              PrintSEVANO: SeralNo,
              SANNIDHIID: res.data.data.findSannidhiId,
              SevaRate: res.data.data.findSevaAmt,
              TotalAmt:res.data.data.findSevaAmt,
              NAKSHATRAID:res.data.data.findNakshatraId,
              GOTHRAID: res.data.data.findGothraId,
              SVAID: findSevaId ,
              MOBNUM: phone,
              RASHIID: res.data.data.findRashiId,
              KNAME: name,
            })
            .then((res) => {
              console.log(res.data.data, "data from post");
            })
            .catch((err) => {
              console.log(err);
            });
        }).catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        setSubmissionError(true);
        console.log(err);
      });
      if (hasError) {
        return;
      }
  };

  const HandelSyncClick =()=>{
    console.log("Sync button pressed")
    axios.post("https://react-native-v-temple-b.onrender.com/api/sevareceiptsql/sync ").then((res) => {
      console.log("data from sync");
      Alert.alert("Sync", "Sync is done successfully");
    }).catch((err) => {
      console.log(err);
      Alert.alert("Sync", "Sync is not done successfully");
    })
  }





  return (
    <SafeAreaView>
      <SafeAreaView style={{ top: 5, flex: 1 }}>
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
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  left: 100,
                  top: -28,
                }}
              >
                Seva Receipt
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", left: -10 }}>
            <CurrentDateComponent />
            <SerialNo SeralNo={SeralNo} setSeralNo={setSeralNo} />

          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-end", paddingHorizontal: 20 }}>
      <View style={{ width: "30%" , borderRadius: 10,}}>
        <Button color="#4287f5" title="Sync" onPress={HandelSyncClick}/>
      </View>
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
            <View style={{flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",}}>
          
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
              <Text style={{ color: "red" }}>Name is required</Text>
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
          <TouchableOpacity onPress={handleSubmit} style={{ top: -140 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                backgroundColor: "#4287f5",
                paddingBottom: 10,
                paddingTop: 10,
              }}
            >
              <FontAwesome6 name="save" size={24} color="white" /> Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={HandleSavePrint} style={{ top: -130 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                backgroundColor: "#4287f5",
                paddingBottom: 10,
                paddingTop: 10,
              }}
            >
              <FontAwesome6 name="print" size={24} color="white" /> Save & Print
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={HandelClear} style={{ top: -120 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                backgroundColor: "#4287f5",
                paddingBottom: 10,
                paddingTop: 10,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="minus-circle" size={24} color="white" />{" "}
              <Text></Text>
              Clear
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "#fafbfc",
            height: 580,
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
                style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}
              >
                Admin
              </Text>
              <TouchableOpacity style={{left:70}} onPress={()=>{setTranslateMenu(-250);}}>
              <AntDesign name="closecircle" size={28} color="red" />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 50 }}>
              <Button
                title="Show Receipt"
                onPress={() => {
                  setShowReceiptDetails(true);
                  setTranslateMenu(-250); 
console.log("close button pressed");
                }}
              />
              <Text
                onPress={() => {
                  setLoggedIn(false);
                  setUserName("");
                  setUserPassword("");
                }}
                style={styles.buttonStyle}
              >
                Logout
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </SafeAreaView>
     {showReceiptDetails&& <Showrreciept setShowReceiptDetails={setShowReceiptDetails}/>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingTop: StatusBar.currentHeight,
    padding: 20,
    top: 10,
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
});

export default FormScreen;
