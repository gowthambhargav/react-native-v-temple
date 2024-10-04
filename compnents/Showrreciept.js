import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { getSevaDetails } from "../db/database";

function Showrreciept({ setShowReceiptDetails, setSelectedNo, setLoading }) {
  const [receiptData, setReceiptData] = React.useState([]);
  const [currentDate, setCurrentDate] = React.useState("");

  useEffect(() => {
    // Set current date
    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    setCurrentDate(formattedDate);

    // Fetch data from database
    getSevaDetails()
      .then((response) => {
        setReceiptData(response);
      })
      .catch((error) => {
        console.error("Error fetching seva details:", error);
      });

    console.log("Showrreciept");
  }, []);

  return (
    <SafeAreaView
      style={{
        position: "absolute",
        backgroundColor: "#8a8a8a",
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <ScrollView style={{ height: "auto" }}>
        <View style={{ padding: 5 }}>
          {/* Current Date */}
          <Text style={{ fontSize: 13, marginBottom: 5, padding: 10 }}>
            Date: {currentDate}
          </Text>

          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              alignItems: "center",
              paddingHorizontal: 2,
              backgroundColor: "#4287f5",
              width: "auto",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", flex: 1.8 }}>
              No
            </Text>
            <Text style={{ color: "white", fontWeight: "bold", flex: 4 }}>
              Seva Name
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                flex: 1,
              }}
            >
              Amount
            </Text>
          </View>

          {/* List Items */}
          {receiptData &&
            receiptData.map((data) => (
              <TouchableOpacity
                key={data.no}
                onPress={() => {
                  setSelectedNo(data.no);
                  setShowReceiptDetails(false);
                  // setLoading(true);
                  console.log(data.no, "From the Showrreciept");
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                >
                  <Text style={{ flex: 1.8 }}>{data.no}</Text>
                  <Text style={{ flex: 4 }}>{data.sevaName}</Text>
                  <Text style={{ flex: 1 }}>{data.amount}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
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
          title="Close"
          color={"tomato"}
          onPress={() => {
            console.log("Print");
            setShowReceiptDetails(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default Showrreciept;
