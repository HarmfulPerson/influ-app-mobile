import { View, Text, Button as TamaguiButton } from "tamagui";
import NotLoggedBackground from "../../components/TopBox/NotLoggedBackground/NotLoggedBackground";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/password";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";
import Colors from "../../../constants/Colors";
import Button from "../../components/Button/Button";
import { router, useLocalSearchParams } from "expo-router";
import * as yup from "yup";
import { validate } from "../../../utils/yup";
import Input from "../../components/Input/Input";

type Password = {
    password: string;
    repeatPassword: string;
};

const passwordSchema = yup
    .object()
    .shape<Record<keyof Password, yup.AnySchema>>({
        password: yup
            .string()
            .min(3, "Hasło powinno mieć conajmniej 3 znaki")
            .required("Hasło jest wymagane"),
        repeatPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Hasła muszą być takie same")
            .required("Potwierdzenie hasła jest wymagane"),
    });

export default function Password() {
    const { phoneNumber, country, email, username } = useLocalSearchParams();

    const [password, setPassword] = useState<Password>({
        password: "",
        repeatPassword: "",
    });
    const [errors, setErrors] = useState<Partial<Password>>({
        password: "",
        repeatPassword: "",
    });
    const [passwordVisibility, setPasswordVisibility] = useState<any>({
        password: true,
        repeatPassword: true,
    });

    const handleClickNext = async () => {
        const possibleErrors = await validate<{
            password: string;
            repeatPassword: string;
        }>(passwordSchema, password);
        setErrors(possibleErrors);
        if (!Object.values(possibleErrors).length)
            router.push({
                pathname: "/signUp/steps/pickCategories",
                params: {
                    phoneNumber,
                    country,
                    email,
                    username,
                    password: password.password,
                    repeatPassword: password.repeatPassword,
                },
            });
    };

    const returnIconType = (visibility: boolean) => (
        <View style={styles.clearInput}>
            {visibility ? (
                <EyeOff size={12} color={Colors.grayscale.text.body} />
            ) : (
                <Eye size={12} color={Colors.grayscale.text.body} />
            )}
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <NotLoggedBackground hasBackButton dontDisplayLogo={true} />
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.titleText}>Stworz haslo</Text>
                        <Text style={styles.infoText}>
                            Podaj haslo do swojego konta
                        </Text>
                        <View></View>
                        <Input
                            keyboardType="visible-password"
                            secureTextEntry={passwordVisibility.password}
                            label="Hasło"
                            placeholder="Wprowadź hasło"
                            value={password.password}
                            onChangeText={(text) =>
                                setPassword({
                                    ...password,
                                    password: text,
                                })
                            }
                            onIconRightCick={() =>
                                setPasswordVisibility({
                                    ...passwordVisibility,
                                    password: !passwordVisibility.password,
                                })
                            }
                            iconRight={returnIconType(
                                passwordVisibility.password
                            )}
                        />
                        <Input
                            keyboardType="visible-password"
                            secureTextEntry={passwordVisibility.repeatPassword}
                            label="Powtórz hasło"
                            placeholder="Wprowadź hasło"
                            value={password.repeatPassword}
                            onChangeText={(text) =>
                                setPassword({
                                    ...password,
                                    repeatPassword: text,
                                })
                            }
                            onIconRightCick={() =>
                                setPasswordVisibility({
                                    ...passwordVisibility,
                                    repeatPassword:
                                        !passwordVisibility.repeatPassword,
                                })
                            }
                            iconRight={returnIconType(
                                passwordVisibility.repeatPassword
                            )}
                        />
                    </View>
                    <Button
                        style={styles.nextStepButton}
                        variant="primary"
                        disabled={
                            !(
                                !!password.password.length &&
                                !!password.repeatPassword.length
                            )
                        }
                        onPress={() => handleClickNext()}
                        text="Dalej"
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
