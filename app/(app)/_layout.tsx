import { Redirect, Stack } from "expo-router";
import { useSession } from "../hooks/session/authenticationProvider";
import { Text } from "react-native";
import { ChatProvider } from "../hooks/useChat";
import { createContext, useRef } from "react";

export const ListenersContext = createContext<React.MutableRefObject<boolean> | null>(null);

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const isListenersAdded = useRef(false);
  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }
  // Only require aahentication within the (app) group's layout as users
  // need to be able to access the (auh) group and sign in again.
  if (!session) {
    // On web, static renderings will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href={"/welcomeScreen" as any} />;
  }
  // This alayout can be deferred because it's not the root layout.
  return (
    <ChatProvider>
      <ListenersContext.Provider value={isListenersAdded}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="addCollaboration" options={{ headerShown: false }} />
          <Stack.Screen name="addSocial" options={{ headerShown: false }} />
          <Stack.Screen name="advertisement" options={{ headerShown: false }} />
          <Stack.Screen name="social" options={{ headerShown: false }} />
          {/* <Stack.Screen name="social/taskList" options={{ headerShown: false }} /> */}
          <Stack.Screen name="chat" options={{ headerShown: false }} />
        </Stack>
      </ListenersContext.Provider>
    </ChatProvider>
  );
}
