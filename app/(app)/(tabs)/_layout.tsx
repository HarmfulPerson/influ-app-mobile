import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "tamagui";
import { useSession } from "../../hooks/session/authenticationProvider";

export default function TabLayout() {
    const { signOut } = useSession();

    const handleInfoIconPress = () => {
        signOut();
    };
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "red",
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Tab One",
                    tabBarIcon: ({ color }) => <Text>Hello!</Text>,
                    headerRight: () => (
                        <Link href="/sign-in" asChild>
                            <Pressable onPress={handleInfoIconPress}>
                                <Text>Sign out</Text>
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: "Tab Two",
                    tabBarIcon: ({ color }) => <Text>Hello!</Text>,
                }}
            />
        </Tabs>
    );
}
