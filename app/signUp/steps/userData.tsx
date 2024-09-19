import { View, Text } from "tamagui";
import NotLoggedBackground from "../../components/TopBox/NotLoggedBackground/NotLoggedBackground";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/userData";
import { X } from "lucide-react-native";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { router, useLocalSearchParams } from "expo-router";
import * as yup from "yup";
import Input from "../../components/Input/Input";
import { validate } from "../../../utils/yup";
import usePostData from "../../hooks/usePostData";

const userDataSchema = yup.object().shape({
    email: yup
        .string()
        .email("Nieprawidłowy email")
        .required("Email jest wymagany"),
    username: yup
        .string()
        .min(3, "Nazwa użytkownika powinna mieć conajmniej 3 znaki")
        .required("Nazwa użytkownika jest wymagana"),
});

export default function UserData() {
    const { phoneNumber, country } = useLocalSearchParams();
    const { postData: checkIfUserDataExists } = usePostData();

    const [userData, setUserData] = useState<{
        email: string;
        username: string;
    }>({ email: "", username: "" });

    const [errors, setErrors] = useState<{ email?: string; username?: string }>(
        {}
    );

    const canProceed = () =>
        userData.email.length > 0 && userData.username.length > 0;

    const navigateToNextPage = async () => {
        const errors = await validate(userDataSchema, userData);
        if (Object.values(errors).length) return setErrors(errors);
        const isDataTaken = await checkIfUserDataExists(
            "/user/checkUniqueness",
            userData,
            false
        );
        if (Object.values(isDataTaken.data).includes(true)) {
            let newErrors = {};
            if (isDataTaken.data.email)
                newErrors = { ...newErrors, email: "Ten email jest zajęty" };
            if (isDataTaken.data.username)
                newErrors = {
                    ...newErrors,
                    username: "Ta nazwa użytkownika jest zajęta",
                };

            return setErrors(newErrors);
        }
        setErrors({ email: "", username: "" });
        router.push({
            pathname: "/signUp/steps/password",
            params: {
                phoneNumber,
                country,
                email: userData.email,
                username: userData.username,
            },
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <NotLoggedBackground hasBackButton dontDisplayLogo={true} />
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.titleText}>Dane użytkownika</Text>
                        <Text style={styles.infoText}>
                            Podaj adres email oraz nazwe uzytkownika
                        </Text>
                        <View
                            style={{
                                marginTop: 24,
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}>
                            <Input
                                keyboardType="email-address"
                                placeholder="Wprowadź adres email"
                                value={userData.email}
                                iconRight={<X size={12} color="black" />}
                                label="Email"
                                error={!!errors.email}
                                infoMessage={errors.email}
                                onChangeText={(text) =>
                                    setUserData({
                                        ...userData,
                                        email: text,
                                    })
                                }></Input>

                            <Input
                                keyboardType="default"
                                placeholder="Wprowadź nazwę użytkownika"
                                value={userData.username}
                                label="Nazwa użytkownika"
                                error={!!errors.username}
                                infoMessage={errors.username}
                                iconRight={<X size={12} color="black" />}
                                onChangeText={(text) =>
                                    setUserData({
                                        ...userData,
                                        username: text,
                                    })
                                }></Input>
                        </View>
                    </View>
                    <Button
                        style={styles.nextStepButton}
                        variant="primary"
                        disabled={!canProceed()}
                        onPress={navigateToNextPage}
                        text="Dalej"
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
