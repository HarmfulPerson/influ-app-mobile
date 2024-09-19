import { View, Text } from "tamagui";
import { styles } from "../styles/choosePhoto";
import BackgroundSvg from "../../../assets/images/suseu-gradient-colour.svg";
import Button from "../../components/Button/Button";
import Colors from "../../../constants/Colors";
import { Bell } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { Alert, Platform, AppState } from "react-native";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import CustomModal from "../../components/ModalPopup/ModalPopup";
// import * as IntentLauncher from "expo-intent-launcher";

export default function Notification() {
    const [areNotificationsEnabled, setAreNotificationsEnabled] =
        useState<boolean>(false);
    const [finalStatus, setFinalStatus] = useState<string>("denied");
    const appState = useRef(AppState.currentState);

    function openSettings() {
        if (Platform.OS === "ios") {
            Linking.openURL("app-settings:");
        } else {
            Linking.openSettings();
        }
    }

    const handleAppStateChange = async (nextAppState: any) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();

            setAreNotificationsEnabled(existingStatus === "granted");
        }
        appState.current = nextAppState;
    };

    useEffect(() => {
        checkNotification();
        const subscription = AppState.addEventListener(
            "change",
            handleAppStateChange
        );

        return () => {
            subscription.remove();
        };
    }, []);

    const checkNotification = async () => {
        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        setFinalStatus(existingStatus);

        setAreNotificationsEnabled(existingStatus === "granted");

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            setFinalStatus(status);
        }
    };

    async function registerForPushNotificationsAsync() {
        if (finalStatus !== "granted") {
            Alert.alert(
                "Potrzebna zgoda",
                "Wyraź zgodę, aby nasza aplikacja wysyłała Ci powiadomienia.",
                [
                    { text: "Anuluj", style: "cancel" },
                    {
                        text: "Otwórz ustawienia",
                        onPress: () => openSettings(),
                    },
                ]
            );
            return;
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.smallLogo}>
                    <BackgroundSvg width={40} height={40} />
                </View>
            </View>
            <View style={styles.contentWrapper}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.titleText}>Wlacz powiadomienia</Text>
                    <Text style={styles.infoText}>
                        Z wlaczonymi powiadomieniami zostaniesz powiadomiony o
                        zmianie statusu twoich wspolprac, umow czy konwersacji
                    </Text>
                    <View style={styles.centralAreaContainer}>
                        <LinearGradient
                            style={{
                                width: 210,
                                height: 210,
                                borderRadius: 105,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            colors={[
                                Colors.primary.text.label,
                                Colors.primary.surface.darker,
                            ]}
                            end={{ y: 1.0, x: 0.5 }}
                            start={{ y: 0.0, x: 0.5 }}>
                            <Bell
                                color={Colors.grayscale.surface.darker}
                                width={108}
                                height={108}
                                fill={Colors.grayscale.surface.darker}
                            />
                        </LinearGradient>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        style={styles.navigateNextButton}
                        variant="primary"
                        disabled={areNotificationsEnabled}
                        onPress={registerForPushNotificationsAsync}
                        text={areNotificationsEnabled ? "Włączone" : "Włącz"}
                    />
                    <CustomModal
                        triggerButton={
                            <Button
                                variant={
                                    areNotificationsEnabled
                                        ? "primary"
                                        : "secondary"
                                }
                                style={styles.skipButton}
                                text={
                                    areNotificationsEnabled ? "Dalej" : "Pomiń"
                                }
                            />
                        }
                        header="Dane zaktualizowane!"
                        subHeader="Od teraz mozesz korzystac z aplikacji"
                        buttonText="Idz do aplikacji"
                        buttonClick={() => router.push("/")}
                    />
                </View>
            </View>
        </View>
    );
}
