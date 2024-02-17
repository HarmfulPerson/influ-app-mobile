import { router } from "expo-router";
import { Text, View } from "tamagui";

export default function Influencer() {
    return (
        <View flex={1} alignItems="center" justifyContent="center">
            <Text color="darkblue" fontSize={20}>
                Influ
            </Text>
            <View
                padding="$6"
                onPress={() => {
                    console.log(router.canGoBack());
                    if (router.canGoBack()) router.back();
                    else router.navigate("home");
                }}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Text>Go back</Text>
            </View>
        </View>
    );
}
