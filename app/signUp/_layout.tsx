import { Stack } from "expo-router";

export default function SignUpLayout() {
    return (
        <Stack initialRouteName="steps/start">
            <Stack.Screen name="steps/start" options={{ headerShown: false }} />
            <Stack.Screen
                name="steps/smsCode"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="steps/registrationCountry"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="steps/userData"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="steps/password"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="steps/pickCategories"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="steps/choosePhoto"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
