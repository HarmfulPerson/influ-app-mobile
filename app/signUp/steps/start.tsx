import { Button as TamaguiButton, Text, View } from "tamagui";
import Colors from "../../../constants/Colors";
import NotLoggedBackground from "../../components/TopBox/NotLoggedBackground/NotLoggedBackground";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import CountryFlag from "react-native-country-flag";
import { styles } from "../styles/start";
import Button from "../../components/Button/Button";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import useSmsService from "../../hooks/useSmsService";
import usePostData from "../../hooks/usePostData";

export default function start() {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [error, setError] = useState<string>("");

    const { getCode } = useSmsService();
    const { postData: checkIfNumberExists } = usePostData();
    const numberPrefix = "+48";
    useEffect(() => {
        if (phoneNumber.length === 9) {
            Keyboard.dismiss();
        }
    }, [phoneNumber]);

    const handleNavigateToNextPage = async () => {
        const wholeNumber = `${numberPrefix}${phoneNumber}`;
        const numberExists = await checkIfNumberExists(
            "/user/checkUniqueness",
            { phoneNumber: wholeNumber },
            false
        );
        if (numberExists?.data.phoneNumber)
            return setError("Ten numer telefonu jest zajęty");
        const response = await getCode(wholeNumber);

        router.push({
            pathname: "/signUp/steps/smsCode",
            params: {
                phoneNumber: wholeNumber,
            },
        });
    };
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
                                            {numberPrefix}
                                        </Text>
                                    </View>
                                }
                                style={styles.prefixButton}></TamaguiButton>
                            <View style={{ flex: 1 }}>
                                <Input
                                    keyboardType="numeric"
                                    placeholder="Wprowadź numer telefonu"
                                    value={phoneNumber}
                                    error={!!error}
                                    onChangeText={(text: any) =>
                                        setPhoneNumber(text)
                                    }
                                    infoMessage={error}
                                    onIconRightCick={() => setPhoneNumber("")}
                                    iconRight={<X size={12} color="black" />}
                                />
                            </View>
                        </View>
                    </View>
                    <Button
                        style={styles.nextStepButton}
                        onPress={handleNavigateToNextPage}
                        variant="primary"
                        disabled={phoneNumber.length < 9}
                        text="Zarejestruj się"
                    />
                </View>
            </TouchableWithoutFeedback>
        </>
    );
}
