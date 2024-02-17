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
        // <View
        //     style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        //     <Text>Which account type would you like to create?</Text>
        //     <View
        //         padding="$6"
        //         style={{
        //             justifyContent: "center",
        //             alignItems: "center",
        //         }}>
        //         <Circle
        //             onPress={() =>
        //                 router.replace("/sign-up/(choices)/influencer")
        //             }
        //             size={100}
        //             backgroundColor={"$blue1"}
        //             elevation="$4">
        //             <Camera size={48} />
        //         </Circle>
        //         <Text>Influencer</Text>
        //     </View>
        //     <View
        //         padding="$6"
        //         style={{
        //             justifyContent: "center",
        //             alignItems: "center",
        //         }}>
        //         <Circle
        //             onPress={() => console.log(2)}
        //             size={100}
        //             backgroundColor={"$blue1"}
        //             elevation="$4">
        //             <Camera size={48} />
        //         </Circle>
        //         <Text>Advertiser</Text>
        //     </View>
        // </View>
    );
}
