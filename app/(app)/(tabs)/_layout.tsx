import { Tabs } from "expo-router";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Text, View } from "tamagui";
import Colors from "../../../constants/Colors";
import MenuHome from "../../../assets/images/menu-home.svg";
import MenuSuseu from "../../../assets/images/menu-suseu.svg";
import { CircleUserRound, MailIcon, SearchIcon } from "lucide-react-native";

export default function TabLayout() {
  const returnStyleWithFocused = (style: StyleProp<ViewStyle>, focused: boolean): StyleProp<ViewStyle>[] => [
    style,
    focused && {
      backgroundColor: Colors.grayscale.surface.subtle,
    },
  ];

  return (
    <View style={styles.tabsContainer}>
      <Tabs
        screenOptions={() => ({
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: Colors.primary.surface.lighter,
          tabBarInactiveTintColor: Colors.grayscale.surface.disabled,
        })}
        sceneContainerStyle={{
          backgroundColor: Colors.grayscale.surface.darker,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={returnStyleWithFocused(styles.iconContainer, focused)}>
                <MenuHome width={24} height={24} fill={color} />
                <Text style={styles.tabBarText}>HOME</Text>
              </View>
            ),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={returnStyleWithFocused(styles.iconContainer, focused)}>
                <SearchIcon width={24} height={24} color={color} />
                <Text style={styles.tabBarText}>SZUKAJ</Text>
              </View>
            ),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={returnStyleWithFocused(styles.iconContainer, focused)}>
                <MenuSuseu height={24} width={24} fill={color} />
                <Text style={styles.tabBarText}>SUSEU AI</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={returnStyleWithFocused(styles.iconContainer, focused)}>
                <MailIcon width={24} height={24} color={color} />
                <Text style={styles.tabBarText}>CZAT</Text>
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={returnStyleWithFocused(styles.iconContainer, focused)}>
                <CircleUserRound height={24} width={24} color={color} />
                <Text style={styles.tabBarText}>USTAWIENIA</Text>
              </View>
            ),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="AdvertisementList"
          options={{
            tabBarButton: () => null,
            headerShown: false,
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="CooperationList"
          options={{
            tabBarButton: () => null,
            headerShown: false,
            tabBarShowLabel: false,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flex: 1,
    backgroundColor: Colors.grayscale.surface.darker,
  },
  iconContainer: {
    alignItems: "center",
    width: 70,
    height: 56,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.grayscale.surface.default,
    justifyContent: "center",
  },
  tabBar: {
    backgroundColor: Colors.grayscale.surface.default,
    borderTopWidth: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 80,
    paddingTop: 12,
    paddingBottom: 16,
    position: "absolute",
    bottom: 0,
  },
  tabBarText: {
    fontSize: 8,
    color: Colors.grayscale.text.caption,
    marginTop: 4,
  },
});
