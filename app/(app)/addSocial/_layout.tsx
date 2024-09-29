import { Stack } from "expo-router";

export default function AddSocialLayout() {
  return (
    <Stack initialRouteName="steps/Start">
      <Stack.Screen name="steps/Start" options={{ headerShown: false }} />
      <Stack.Screen name="steps/CompanyLink" options={{ headerShown: false }} />
      <Stack.Screen
        name="steps/PlatformAndInfluencerPick"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="steps/TitleAndDescription"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
