import { router } from "expo-router";
import { Button, Text, View } from "tamagui";

export default function Advertiser() {
    return (
        <View flex={1} alignItems="center" justifyContent="center">
            <Text color="darkblue" fontSize={20}>
                Advertiser
            </Text>
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
