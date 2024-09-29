import "../tamagui-web.css";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { config } from "../tamagui.config";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SessionProvider } from "./hooks/session/authenticationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import CurrentToast from "./components/Toast";
import { usePushNotifications } from "./hooks/usePushNotifications";

export { ErrorBoundary } from "expo-router";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("../assets/fonts/Poppins-Regular.ttf"),
    InterBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });
  const queryClient = new QueryClient();

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { expoPushToken, notification } = usePushNotifications();
  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
      <ToastProvider>
        <SessionProvider>
          <ThemeProvider value={DefaultTheme}>
            <ToastViewport top={50} left={0} right={0} />
            <CurrentToast />

            <Slot></Slot>
          </ThemeProvider>
        </SessionProvider>
      </ToastProvider>
    </TamaguiProvider>
  );
}
