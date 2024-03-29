import { Stack } from "expo-router";
import { Text, View } from "tamagui";

export default function Ongoing() {
    return (
        <View flex={1} paddingTop="$10" alignItems="center">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <Text fontSize={20}>Ongoing</Text>
        </View>
    );
}
