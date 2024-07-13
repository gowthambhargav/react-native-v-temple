import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
  ImageBackground,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Home from "./screns/HomeScreen.js";

export default function App() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const validateUserNameAndPassword = () => {
    if (userName !== "admin" || userPassword !== "svt123") {
      Alert.alert("Invalid Credentials");
    } else {
      setLoggedIn(true); // Set the loggedIn state to true
    }
  };
  const scrollViewRef = useRef();
  const renderLoginForm = () => (
    <SafeAreaView style={styles.container}>
      
      <ImageBackground
        source={require("./assets/img1.jpg")}
        style={styles.backgroundImage}
      >
        <Image
          style={styles.tinyLogo}
          source={require("./assets/mobile.png")}
        />
        <ScrollView style={{top:200,height:500}} ref={scrollViewRef}contentContainerStyle={{height:700}}>

           <KeyboardAvoidingView style={{flex:1}}>
         
        <View style={
          {
          justifyContent:"center",
          alignContent:"center",
          alignItems:"center",
          }}>
          <Text
            style={{
              fontSize: 15,
              marginRight: "auto",
              marginLeft: 60,
              color: "#fff",
            }}
          >
            User Name
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="User name"
            onChangeText={setUserName}
          />
          <Text
            style={{
              fontSize: 15,
              marginRight: "auto",
              marginLeft: 60,
              color: "#fff",
            }}
          >
            Password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={setUserPassword}
            secureTextEntry={true}
          />

          <View style={styles.buttonCss}>
            <Button
              title="Login"
              disabled={userName === "" || userPassword === ""}
              onPress={validateUserNameAndPassword}
            />
        </View>
          </View>
         </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <Home
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setUserName={setUserName}
          setUserPassword={setUserPassword}
        />
      ) : (
        renderLoginForm()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    // backgroundColor: '#ffffff',
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    margin: 12,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    width: "70%",
    borderRadius: 3,
  },
  backgroundImage: {
    flex: 1,
    width: 400,
    justifyContent: "center",
  },
  buttonCss: {
    marginTop: 20,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tinyLogo: {
    position: 'absolute',
    alignSelf: 'center', // Align logo horizontally center
    width: '80%', // Use percentage for width
    height: 100, // Fixed height
    marginBottom: 10,
    top: '10%', // Use percentage for top position
    left: '51%', // Center horizontally
    marginLeft: '-40%', // Adjust for centering (negative half of width)
    
    
  },
});
