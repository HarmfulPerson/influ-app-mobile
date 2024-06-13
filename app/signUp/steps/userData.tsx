import { View, Text, XStack, Button as TamaguiButton, Input } from "tamagui";
import NotLoggedBackground from "../../components/TopBox/NotLoggedBackground/NotLoggedBackground";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/userData";
import Colors from "../../../constants/Colors";
import { X } from "lucide-react-native";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { router } from "expo-router";

export default function UserData() {
    const [userData, setUserData] = useState<{
        email: string;
        username: string;
    }>({ email: "", username: "" });

    const shouldDisable = () =>
        userData.email.length > 0 && userData.username.length > 0;
    return (
        <View style={{ flex: 1 }}>
            <NotLoggedBackground hasBackButton dontDisplayLogo={true} />
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.titleText}>Dane użytkownika</Text>
                        <Text style={styles.infoText}>
                            Podaj adres email oraz nazwe uzytkownika
                        </Text>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TamaguiButton
                            borderWidth={1}
                            borderColor={Colors.grayscale.surface.default}
                            style={styles.inputContainer}>
                            <View style={styles.input}>
                                <Input
                                    borderWidth={0}
                                    style={{ flex: 1 }}
                                    keyboardType="email-address"
                                    placeholder="Wprowadź adres email"
                                    backgroundColor={
                                        Colors.grayscale.surface.darker
                                    }
                                    value={userData.email}
                                    onChangeText={(text) =>
                                        setUserData({
                                            ...userData,
                                            email: text,
                                        })
                                    }
                                    borderColor={
                                        Colors.grayscale.surface.default
                                    }></Input>
                                {userData.email.length > 0 && (
                                    <View
                                        onPress={() =>
                                            setUserData({
                                                ...userData,
                                                email: "",
                                            })
                                        }
                                        style={styles.clearInput}>
                                        <X size={12} color="black" />
                                    </View>
                                )}
                            </View>
                        </TamaguiButton>
                        <Text style={styles.inputLabel}>Nazwa użytkownika</Text>
                        <TamaguiButton
                            borderWidth={1}
                            borderColor={Colors.grayscale.surface.default}
                            style={styles.inputContainer}>
                            <View style={styles.input}>
                                <Input
                                    borderWidth={0}
                                    style={{ flex: 1 }}
                                    keyboardType="default"
                                    placeholder="Wprowadź nazwę użytkownika"
                                    value={userData.username}
                                    onChangeText={(text) =>
                                        setUserData({
                                            ...userData,
                                            username: text,
                                        })
                                    }
                                    backgroundColor={
                                        Colors.grayscale.surface.darker
                                    }
                                    borderColor={
                                        Colors.grayscale.surface.default
                                    }></Input>
                                {userData.username.length > 0 && (
                                    <View
                                        onPress={() =>
                                            setUserData({
                                                ...userData,
                                                username: "",
                                            })
                                        }
                                        style={styles.clearInput}>
                                        <X size={12} color="black" />
                                    </View>
                                )}
                            </View>
                        </TamaguiButton>
                    </View>
                    <Button
                        style={styles.nextStepButton}
                        variant="primary"
                        disabled={!shouldDisable()}
                        onPress={() => router.push("/signUp/steps/password")}
                        text="Dalej"
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
