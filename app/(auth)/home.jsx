import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import Data from "../../components/fetchData/Data";
import { Link } from "expo-router";

const Home = () => {
  const { user } = useUser();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, {user?.firstName} 🎉</Text>
          <Link href="/form" style={styles.addButton}>
            <Text style={styles.buttonText}>Add Items</Text>
          </Link>
      </View>

      <View style={styles.dataContainer}>
        <Data />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#6c47ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dataContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default Home;
