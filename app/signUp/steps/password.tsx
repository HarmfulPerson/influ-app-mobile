import { View, Text, Button as TamaguiButton, Input } from "tamagui";
import NotLoggedBackground from "../../components/TopBox/NotLoggedBackground/NotLoggedBackground";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/password";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";
import Colors from "../../../constants/Colors";
import Button from "../../components/Button/Button";
import { router } from "expo-router";

export default function Password() {
    const [password, setPassword] = useState<any>({
        password: "",
        repeatPassword: "",
    });
    const [passwordVisibility, setPasswordVisibility] = useState<any>({
        password: true,
        repeatPassword: true,
    });

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
                        <Text style={styles.inputLabel}>Hasło</Text>
                        <TamaguiButton
                            borderWidth={1}
                            borderColor={Colors.grayscale.surface.default}
                            style={styles.inputContainer}>
                            <View style={styles.input}>
                                <Input
                                    borderWidth={0}
                                    style={{ flex: 1 }}
                                    keyboardType="visible-password"
                                    secureTextEntry={
                                        passwordVisibility.password
                                    }
                                    placeholder="Wprowadź hasło"
                                    backgroundColor={
                                        Colors.grayscale.surface.darker
                                    }
                                    value={password.password}
                                    onChangeText={(text) =>
                                        setPassword({
                                            ...password,
                                            password: text,
                                        })
                                    }
                                    borderColor={
                                        Colors.grayscale.surface.default
                                    }></Input>
                                {password.password.length > 0 && (
                                    <View
                                        onPress={() =>
                                            setPasswordVisibility({
                                                ...passwordVisibility,
                                                password:
                                                    !passwordVisibility.password,
                                            })
                                        }
                                        style={styles.clearInput}>
                                        {passwordVisibility.password ? (
                                            <EyeOff
                                                size={12}
                                                color={
                                                    Colors.grayscale.text.body
                                                }
                                            />
                                        ) : (
                                            <Eye
                                                size={12}
                                                color={
                                                    Colors.grayscale.text.body
                                                }
                                            />
                                        )}
                                    </View>
                                )}
                            </View>
                        </TamaguiButton>
                        <Text style={styles.inputLabel}>Powtórz hasło</Text>
                        <TamaguiButton
                            borderWidth={1}
                            borderColor={Colors.grayscale.surface.default}
                            style={styles.inputContainer}>
                            <View style={styles.input}>
                                <Input
                                    borderWidth={0}
                                    secureTextEntry={
                                        passwordVisibility.repeatPassword
                                    }
                                    style={{ flex: 1 }}
                                    keyboardType="default"
                                    placeholder="Powtórz hasło"
                                    value={password.repeatPassword}
                                    onChangeText={(text) =>
                                        setPassword({
                                            ...password,
                                            repeatPassword: text,
                                        })
                                    }
                                    backgroundColor={
                                        Colors.grayscale.surface.darker
                                    }
                                    borderColor={
                                        Colors.grayscale.surface.default
                                    }></Input>
                                {password.repeatPassword.length > 0 && (
                                    <View
                                        onPress={() =>
                                            setPasswordVisibility({
                                                ...passwordVisibility,
                                                repeatPassword:
                                                    !passwordVisibility.repeatPassword,
                                            })
                                        }
                                        style={styles.clearInput}>
                                        {passwordVisibility.repeatPassword ? (
                                            <EyeOff
                                                size={12}
                                                color={
                                                    Colors.grayscale.text.body
                                                }
                                            />
                                        ) : (
                                            <Eye
                                                size={12}
                                                color={
                                                    Colors.grayscale.text.body
                                                }
                                            />
                                        )}
                                    </View>
                                )}
                            </View>
                        </TamaguiButton>
                    </View>
                    <Button
                        style={styles.nextStepButton}
                        variant="primary"
                        onPress={() =>
                            router.push("/signUp/steps/pickCategories")
                        }
                        text="Dalej"
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
