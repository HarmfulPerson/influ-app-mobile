import { Link, Tabs } from "expo-router";
import { Pressable, StyleSheet, ImageBackground } from "react-native";
import { Text, View } from "tamagui";
import { useSession } from "../../hooks/session/authenticationProvider";
import Colors from "../../../constants/Colors";
import MenuHome from "../../../assets/images/menu-home.svg";
import MenuSearch from "../../../assets/images/menu-search.svg";
import MenuSuseu from "../../../assets/images/menu-suseu.svg";
import MenuMessage from "../../../assets/images/menu-message.svg";

export default function TabLayout() {
    const { signOut } = useSession();

    const handleInfoIconPress = () => {
        signOut();
    };
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "black",
                    borderTopWidth: 0,
                },
            }}
            sceneContainerStyle={{
                backgroundColor: Colors.grayscale.surface.subtle,
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color }) => <MenuHome />,
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarIcon: ({ color }) => <MenuSearch />,
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => <MenuSuseu />,
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
                name="messages"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => <MenuMessage />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={styles.container}>
                            <ImageBackground
                                source={require("../../../assets/images/menu-user-gopher.png")}
                                style={styles.circle}
                                imageStyle={styles.circleImage}>
                                {/* Optionally add other components inside the circle */}
                            </ImageBackground>
                        </View>
                    ),
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: "hidden",
    },
    circleImage: {
        borderRadius: 20,
    },
});
