import { Redirect, Stack } from "expo-router";
import { useSession } from "../hooks/session/authenticationProvider";
import { Text, useColorScheme } from "react-native";
export default function AppLayout() {
    const { session, isLoading } = useSession();
    const colorScheme = useColorScheme();
    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href={"/welcomeScreen" as any} />;
    }

    // This layout can be deferred because it's not the root layout.
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="addCollaboration"
                options={{ headerShown: false }}
            />
            <Stack.Screen name="addSocial" options={{ headerShown: false }} />
            <Stack.Screen
                name="advertisement"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
