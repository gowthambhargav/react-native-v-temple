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
  useEffect(() => {
    const date = new Date();
    const count = "0001";
    const deviceID = "01";
    const currentDate = date.getDate();
    const yearLastTwoDigits = date.getFullYear().toString().slice(-2);
    setSeralNo(`${yearLastTwoDigits}${currentDate}${deviceID}${count}`);
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
      .then((res) => {
        setError({ type: "", msg: "" });
        setName();
        setSannidhi("");
        setSeva("");
        setPhone("");
        setGothra("");
        setNakshatra("");
        setRashi("");
        setSeralNo(Number(SeralNo) + 1);
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
  console.log(error, "error");
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
    // If there are no errors, submit the form
    const url = "https://react-native-v-temple-b.onrender.com/api/sevaReceipt";
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
      .then((res) => {
        setError({ type: "", msg: "" });
        setName("");
        setSannidhi("");
        setSeva("");
        setPhone("");
        setGothra("");
        setNakshatra("");
        setRashi("");
        setSeralNo(Number(SeralNo) + 1);
setShowResipt(true);
        setReceiptDetails(res.data.data);
      })
      .catch((err) => {
        setSubmissionError(true);
        console.log(err);
      });
      if (hasError) {
        return;
      }
  };
  return (
    <SafeAreaView>
      <SafeAreaView style={{ top: 10, flex: 1 }}>
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
          <View style={{ position: "static", top: 40, bottom: 0 }}>
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
        </SafeAreaView>
        {/* borderBottomColor: "#000", borderBottomWidth:1 */}

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
              top: -100,
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
          </SafeAreaView>
          <TouchableOpacity onPress={handleSubmit} style={{ top: -150 }}>
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
          <TouchableOpacity onPress={HandleSavePrint} style={{ top: -140 }}>
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
          <TouchableOpacity onPress={HandelClear} style={{ top: -130 }}>
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
            </View>
            <View style={{ marginTop: 50 }}>
              <Button
                title="Close"
                onPress={() => {
                  setTranslateMenu(-250);
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
