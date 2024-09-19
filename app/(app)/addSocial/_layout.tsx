import { Stack } from "expo-router";

export default function AddSocialLayout() {
    return (
        <Stack initialRouteName="steps/start">
            <Stack.Screen name="steps/start" options={{ headerShown: false }} />
            <Stack.Screen
                name="steps/companyLink"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
