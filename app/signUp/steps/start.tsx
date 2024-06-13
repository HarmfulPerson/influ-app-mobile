import { Input, Button as TamaguiButton, Text, View } from "tamagui";
import Colors from "../../../constants/Colors";
import NotLoggedBackground from "../../components/TopBox/NotLoggedBackground/NotLoggedBackground";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import CountryFlag from "react-native-country-flag";
import { styles } from "../styles/start";
import Button from "../../components/Button/Button";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useEffect, useState } from "react";

export default function start() {
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    useEffect(() => {
        if (phoneNumber.length === 9) {
            Keyboard.dismiss();
        }
    }, [phoneNumber]);
    return (
        <>
            <NotLoggedBackground hasBackButton dontDisplayLogo={true} />
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.titleText}>Zaczynajmy</Text>
                        <Text style={styles.infoText}>
                            Podaj twoj numer telefonu. Wyslemy Ci kod
                            potwierdzajacy
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
                                        <Text style={styles.phonePrefix}>
                                            +48
                                        </Text>
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
                                        keyboardType="numeric"
                                        placeholder="Wprowadź numer telefonu"
                                        maxLength={9}
                                        value={phoneNumber}
                                        onChangeText={(text) =>
                                            setPhoneNumber(text)
                                        }
                                        backgroundColor={
                                            Colors.grayscale.surface.darker
                                        }
                                        borderColor={
                                            Colors.grayscale.surface.default
                                        }></Input>
                                    <View
                                        onPress={() => setPhoneNumber("")}
                                        style={styles.clearInput}>
                                        <X size={12} color="black" />
                                    </View>
                                </View>
                            </TamaguiButton>
                        </View>
                    </View>
                    <Button
                        style={styles.nextStepButton}
                        onPress={() =>
                            router.push({
                                pathname: "/signUp/steps/smsCode",
                                params: { phoneNumber },
                            })
                        }
                        variant="primary"
                        disabled={phoneNumber.length < 9}
                        text="Zarejestruj się"
                    />
                </View>
            </TouchableWithoutFeedback>
        </>
    );
}
