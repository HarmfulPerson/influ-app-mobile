import { Stack } from "expo-router";

export default function SocialLayout() {
  return (
    <Stack>
      <Stack.Screen name="socialInfo" options={{ headerShown: false }} />
      <Stack.Screen name="taskList" options={{ headerShown: false }} />
    </Stack>
  );
}
