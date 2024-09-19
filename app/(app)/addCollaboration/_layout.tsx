import { Stack } from "expo-router";

export default function AddCollabLayout() {
    return (
        <Stack initialRouteName="steps/start">
            <Stack.Screen name="steps/start" options={{ headerShown: false }} />
            <Stack.Screen
                name="steps/pickCategories"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="steps/description"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="steps/startDate"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="steps/socials"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="steps/filters"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="steps/summary"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
