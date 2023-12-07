import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/home.jpg")}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.desc}>
          Streamline your living space and enhance disaster preparedness with
          Home Inventory – your go-to solution for creating a secure digital
          record of possessions, complete with details and images.
        </Text>
      </View>
      <Link href="/login" style={styles.linkContainer}>
          <Text style={styles.linkText}>Login to Xplore</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    marginVertical: 20,
    color: "black",
  },
  descriptionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    backdropFilter: "blur(10px)",
  },
  desc: {
    fontSize: 16,
    color: "black",
    textAlign: "justify",
  },
  linkContainer: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  linkText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 390,
    height: 350,
  },
});

export default Welcome;
