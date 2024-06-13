import { router } from "expo-router";
import { useSession } from "../hooks/session/authenticationProvider";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { Button as TamaguiButton, Form, Input, Text, View } from "tamagui";
import { LoginData } from "../types/signIn";
import NotLoggedBackground from "../components/TopBox/NotLoggedBackground/NotLoggedBackground";
import Colors from "../../constants/Colors";
import CountryFlag from "react-native-country-flag";
import { ChevronLeft, X } from "lucide-react-native";
import GoogleSign from "../../assets/images/google-coloured.svg";
import Button from "../components/Button/Button";
import { styles } from "./styles";

export default function SignIn() {
    const { signIn } = useSession();
    const phoneNumberPrefix = "+48";
    const [loginData, setLoginData] = useState<LoginData>({
        phoneNumber: "",
        password: "",
    });
    const handleLogin = async () => {
        await signIn({
            ...loginData,
            phoneNumber: `${phoneNumberPrefix}${loginData.phoneNumber}`,
        });
        router.replace("/");
    };
    const handleChangePhoneNumber = (text: string) => {
        setLoginData({ ...loginData, phoneNumber: text });
    };
    const handleChangePassword = (text: string) => {
        setLoginData({ ...loginData, password: text });
    };

    const canLogin =
        !loginData.password.length || !loginData.phoneNumber.length;

    return (
        <>
            <NotLoggedBackground hasBackButton />
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => Keyboard.dismiss()}>
                <Form onSubmit={() => handleLogin()} style={styles.wrapper}>
                    <Text style={styles.welcomeTitle}>Witamy ponownie!</Text>
                    <Text style={styles.subtitleText}>
                        Podaj swój numer telefonu połączony z kontem Suseu
                    </Text>
                    <View style={styles.phoneNumberContainer}>
                        <TamaguiButton
                            borderWidth={1}
                            borderColor={Colors.grayscale.surface.default}
                            icon={
                                <View style={styles.countryPrefixContainer}>
                                    <CountryFlag
                                        isoCode="pl"
                                        size={16}
                                        style={styles.flag}
                                    />
                                    <Text style={styles.phonePrefix}>+48</Text>
                                </View>
                            }
                            style={styles.prefixButton}></TamaguiButton>

                        <TamaguiButton
                            borderWidth={1}
                            borderColor={Colors.grayscale.surface.default}
                            style={styles.phoneNumberInput}>
                            <View style={styles.countryPrefixContainer}>
                                <Input
                                    borderWidth={0}
                                    style={{ flex: 1 }}
                                    value={loginData.phoneNumber}
                                    keyboardType="numeric"
                                    placeholder="Wprowadź numer telefonu"
                                    maxLength={9}
                                    onChangeText={(text: string) =>
                                        handleChangePhoneNumber(
                                            text.replace(/[^0-9]/g, "")
                                        )
                                    }
                                    backgroundColor={
                                        Colors.grayscale.surface.darker
                                    }
                                    borderColor={
                                        Colors.grayscale.surface.default
                                    }></Input>
                                <View
                                    onPress={() =>
                                        setLoginData({
                                            ...loginData,
                                            phoneNumber: "",
                                        })
                                    }
                                    style={styles.clearInput}>
                                    <X size={12} color="black" />
                                </View>
                            </View>
                        </TamaguiButton>
                    </View>
                    <View>
                        <TamaguiButton
                            style={styles.passwordInput}
                            borderWidth={1}
                            borderColor={Colors.grayscale.surface.default}>
                            <Input
                                borderWidth={0}
                                placeholder="Wpisz hasło"
                                style={{ flex: 1 }}
                                value={loginData.password}
                                secureTextEntry
                                onChangeText={handleChangePassword}
                                backgroundColor={
                                    Colors.grayscale.surface.darker
                                }
                                borderColor={
                                    Colors.grayscale.surface.default
                                }></Input>
                            <View
                                onPress={() =>
                                    setLoginData({
                                        ...loginData,
                                        password: "",
                                    })
                                }
                                style={styles.clearInput}>
                                <X size={12} color="black" />
                            </View>
                        </TamaguiButton>
                    </View>
                    <Text style={styles.lostPhoneInfo}>
                        Zgubiłem/am dostęp do mojego telefonu
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <Form.Trigger asChild>
                            <Button
                                style={styles.continueButton}
                                variant="primary"
                                text="Kontynuuj"
                                disabled={canLogin}
                            />
                        </Form.Trigger>

                        <TamaguiButton
                            borderWidth={1}
                            borderColor={Colors.grayscale.surface.subtle}
                            style={styles.registerWithGoogle}>
                            <GoogleSign width={24} height={24} />
                            <Text style={styles.registerWithGoogleText}>
                                Kontynuuj z Google
                            </Text>
                        </TamaguiButton>
                        <Text
                            onPress={() => console.log("XDDD")}
                            style={styles.dontHaveAccount}>
                            Nie posiadasz Konta?{" "}
                            <Text style={styles.dontHaveAccountRegister}>
                                Zarejestruj się
                            </Text>
                        </Text>
                    </View>
                </Form>
            </TouchableWithoutFeedback>
        </>
    );
}
