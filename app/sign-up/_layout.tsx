import { Redirect, Stack, Link, router } from "expo-router";
import { useColorScheme } from "react-native";
import { Button, View, Text } from "tamagui";
import { Camera } from "lucide-react-native";
import { Circle, Square, XStack } from "tamagui";
import { Image } from "react-native";
import Advertiser from "./(choices)/advertiser";
function LogoTitle() {
    return (
        <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        />
    );
}

export default function SignUpLayout() {
    return (
        <Stack initialRouteName="(choices)/intro">
            {/* Optionally configure static options outside the route. */}
            <Stack.Screen
                name="(choices)/intro"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="(choices)/influencer"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="(choices)/advertiser"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
