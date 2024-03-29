import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "tamagui";
import { useSession } from "../../hooks/session/authenticationProvider";
import { Home, Info, Mail, Settings, User } from "lucide-react-native";

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
                name="three"
                options={{
                    title: "Wiadomości",
                    tabBarIcon: ({ color }) => <Mail />,
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: "Informacje",
                    tabBarIcon: ({ color }) => <Info />,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: "Główna",
                    tabBarIcon: ({ color }) => <Home />,
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
                name="four"
                options={{
                    title: "Ustawienia",
                    tabBarIcon: ({ color }) => <Settings />,
                }}
            />
            <Tabs.Screen
                name="five"
                options={{
                    title: "Profil",
                    tabBarIcon: ({ color }) => <User />,
                }}
            />
            <Tabs.Screen
                name="(collaboration)"
                options={{
                    headerShown: false,
                    href: null,
                }}
            />
            <Tabs.Screen
                name="(manageCollaboration)"
                options={{
                    headerShown: false,
                    href: null,
                }}
            />
        </Tabs>
    );
}
