import { useOAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Ionicons } from '@expo/vector-icons';

const Strategy = {
  Google: "oauth_google",
  Apple: "oauth_apple",
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });

  const onSelectAuth = async (strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth
    }[strategy];
    
    try {
      const {createdSessionId, setActive} = await selectedAuth();
      if(createdSessionId) {
        setActive({ session: createdSessionId });
        router.back()
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <TouchableOpacity style={styles.button} onPress={() => onSelectAuth(Strategy.Google)}>
        <Ionicons name="logo-google" size={24} color="white" />
        <Text style={{ color: "white" }}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onSelectAuth(Strategy.Apple)}>
        <Ionicons name="logo-apple" size={24} color="white" />
        <Text style={{ color: "white" }}>Login with Apple</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    margin: 8,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "black",
    padding: 8,
    borderRadius: 8,
    color: "white",
    fontWeight: "bold",
  },
});

export default Login;
