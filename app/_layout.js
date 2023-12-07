import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },

  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

const InitialLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const segment = useSegments();
  const router = useRouter();
  useEffect(() => {
    if (!isLoaded) return;

    const isTabsGroup = segment[0] === "(auth)";

    if (isSignedIn && !isTabsGroup) {
      router.replace("/home");
    }

    console.log("isSignedIn", isSignedIn);
  }, [isSignedIn]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(public)"
        options={{
          headerShown: false,
        }}
      />

    </Stack>
  );
};

const Layout = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
};

export default Layout;
