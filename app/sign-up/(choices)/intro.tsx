import { router } from "expo-router";
import { View, Text } from "tamagui";
import { Camera } from "lucide-react-native";
import { Circle, Square, XStack } from "tamagui";

export default function Intro() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Which account type would you like to create?</Text>
            <View
                padding="$6"
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Circle
                    onPress={() =>
                        router.replace("/sign-up/(choices)/influencer")
                    }
                    size={100}
                    backgroundColor={"$blue1"}
                    elevation="$4">
                    <Camera size={48} />
                </Circle>
                <Text>Influencer</Text>
            </View>
            <View
                padding="$6"
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Circle
                    size={100}
                    onPress={() =>
                        router.replace("/sign-up/(choices)/advertiser")
                    }
                    backgroundColor={"$blue1"}
                    elevation="$4">
                    <Camera size={48} />
                </Circle>
                <Text>Advertiser</Text>
            </View>
            <View
                padding="$6"
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Text>Go back</Text>
            </View>
        </View>
    );
}
