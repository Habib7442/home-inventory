import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import Welcome from "../components/home/welcome/Welcome";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "whitesmoke" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTitle: "Home Inventory",
          headerShadowVisible: false,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Welcome />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
