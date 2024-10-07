import React from "react";
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
} from "react-native";

export default function Login() {
  const [userName, onUserNameChange] = React.useState("");
  const [userPassward, onUserPasswardChange] = React.useState("");
  const [btn, setBtn] = React.useState(false);
  //-----------------------------------------------------------------
  // functions
  const validateUserNameAndPassword = () => {
    const trimmedUserName = userName.trim();
    const trimmedUserPassword = userPassward.trim();

    if (trimmedUserName !== "admin" || trimmedUserPassword !== "svt123") {
      Alert.alert("Invalid Credentials");
    } else {
      Alert.alert("Login Successfully");
    }
  };

  console.log(userName, userPassward);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("./assets/img1.jpg")}
        style={styles.backgroundImage}
      >
        <Image
          style={styles.tinyLogo}
          source={require("./assets/mobile.png")}
        ></Image>
        <Text
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: 20,
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          Login
        </Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="User name"
          onChangeText={onUserNameChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Passward"
          onChangeText={onUserPasswardChange}
        />
        <View style={[styles.buttonCss]}>
          <Button
            title="Login"
            disabled={btn}
            onPress={validateUserNameAndPassword}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    height: 40,
    margin: 12,
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 1,
    padding: 10,
    width: 210,
  },
  backgroundImage: {
    flex: 1,
    width: 400,
    justifyContent: "center",
  },
  buttonCss: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  tinyLogo: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 250,
    height: 50,
    marginBottom: 10,
  },
});
