import { View, Text, Input } from "tamagui";
import NotLoggedBackground from "../../components/TopBox/NotLoggedBackground/NotLoggedBackground";
import {
    Keyboard,
    NativeSyntheticEvent,
    TouchableWithoutFeedback,
} from "react-native";
import { styles } from "../styles/smsCode";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function smsCode(props: any) {
    const { phoneNumber } = useLocalSearchParams();
    const firstDigitRef = useRef<Input>(null);
    const secondDigitRef = useRef<Input>(null);
    const thirdDigitRef = useRef<Input>(null);
    const fourthDigitRef = useRef<Input>(null);
    const fifthDigitRef = useRef<Input>(null);
    const sixthDigitRef = useRef<Input>(null);
    const [digitController, setDigitController] = useState<{
        input1: string;
        input2: string;
        input3: string;
        input4: string;
        input5: string;
        input6: string;
    }>({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
    });

    const handleInputChange = (
        text: string,
        key: string,
        nextInputRef?: React.RefObject<Input>
    ) => {
        if (text.length === 1) {
            setDigitController({ ...digitController, [key]: text });
            nextInputRef?.current?.focus();
        }
        dissmissKeyboardIfLastDigit(key, text);
    };

    const dissmissKeyboardIfLastDigit = (key: string, text: string) => {
        if (key === "input6" && text.length === 1) {
            Keyboard.dismiss();
        }
    };

    useEffect(() => {
        firstDigitRef.current?.focus();
        console.log(Object.values(digitController).join("").length);
    }, []);

    const handleKeyPress = (
        event: any,
        previousInputRef: React.RefObject<Input>,
        key: string
    ) => {
        if (event.nativeEvent.key === "Backspace" && previousInputRef.current) {
            setDigitController({ ...digitController, [key]: "" });
            previousInputRef.current.focus();
        }
    };

    const canProceed = (): boolean =>
        Object.values(digitController).join("").length === 6;

    const handleFocus = (inputRef: React.RefObject<Input>, value: string) => {
        if (inputRef.current) {
            setTimeout(() => {
                inputRef.current?.setNativeProps({
                    selection: {
                        start: value.length,
                        end: value.length,
                    },
                });
            }, 0);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <NotLoggedBackground hasBackButton dontDisplayLogo={true} />
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.titleText}>6-cio cyfrowy kod</Text>
                        <Text style={styles.infoText}>
                            Kod wyslany do +48 {phoneNumber} jesli nie posiadasz
                            konta
                        </Text>
                        <View style={styles.digitContainer}>
                            <Input
                                ref={firstDigitRef}
                                maxLength={1}
                                keyboardType="numeric"
                                onChangeText={(text) =>
                                    handleInputChange(
                                        text,
                                        "input1",
                                        secondDigitRef
                                    )
                                }
                                onFocus={() =>
                                    handleFocus(
                                        firstDigitRef,
                                        digitController.input1
                                    )
                                }
                                style={styles.digitInput}></Input>
                            <Input
                                maxLength={1}
                                ref={secondDigitRef}
                                onChangeText={(text) =>
                                    handleInputChange(
                                        text,
                                        "input2",
                                        thirdDigitRef
                                    )
                                }
                                onKeyPress={(event) =>
                                    handleKeyPress(
                                        event,
                                        firstDigitRef,
                                        "input2"
                                    )
                                }
                                onFocus={() =>
                                    handleFocus(
                                        secondDigitRef,
                                        digitController.input2
                                    )
                                }
                                keyboardType="numeric"
                                style={styles.digitInput}></Input>
                            <Input
                                ref={thirdDigitRef}
                                maxLength={1}
                                onChangeText={(text) =>
                                    handleInputChange(
                                        text,
                                        "input3",
                                        fourthDigitRef
                                    )
                                }
                                onKeyPress={(event) =>
                                    handleKeyPress(
                                        event,
                                        secondDigitRef,
                                        "input3"
                                    )
                                }
                                keyboardType="numeric"
                                onFocus={() =>
                                    handleFocus(
                                        thirdDigitRef,
                                        digitController.input3
                                    )
                                }
                                style={styles.digitInput}></Input>
                            <Text style={styles.digitsDivider}>-</Text>
                            <Input
                                ref={fourthDigitRef}
                                maxLength={1}
                                onChangeText={(text) =>
                                    handleInputChange(
                                        text,
                                        "input4",
                                        fifthDigitRef
                                    )
                                }
                                onKeyPress={(event) =>
                                    handleKeyPress(
                                        event,
                                        thirdDigitRef,
                                        "input4"
                                    )
                                }
                                onFocus={() =>
                                    handleFocus(
                                        fourthDigitRef,
                                        digitController.input4
                                    )
                                }
                                keyboardType="numeric"
                                style={styles.digitInput}></Input>
                            <Input
                                ref={fifthDigitRef}
                                onChangeText={(text) =>
                                    handleInputChange(
                                        text,
                                        "input5",
                                        sixthDigitRef
                                    )
                                }
                                onKeyPress={(event) =>
                                    handleKeyPress(
                                        event,
                                        fourthDigitRef,
                                        "input5"
                                    )
                                }
                                onFocus={() =>
                                    handleFocus(
                                        fifthDigitRef,
                                        digitController.input5
                                    )
                                }
                                keyboardType="numeric"
                                maxLength={1}
                                style={styles.digitInput}></Input>
                            <Input
                                ref={sixthDigitRef}
                                maxLength={1}
                                onChangeText={(text) =>
                                    handleInputChange(
                                        text,
                                        "input6",
                                        sixthDigitRef
                                    )
                                }
                                onKeyPress={(event) =>
                                    handleKeyPress(
                                        event,
                                        fifthDigitRef,
                                        "input6"
                                    )
                                }
                                onFocus={() =>
                                    handleFocus(
                                        sixthDigitRef,
                                        digitController.input6
                                    )
                                }
                                keyboardType="numeric"
                                style={styles.digitInput}></Input>
                        </View>
                    </View>
                    <Button
                        style={styles.nextStepButton}
                        variant="primary"
                        text="Zarejestruj się"
                        onPress={() =>
                            router.push("/signUp/steps/registrationCountry")
                        }
                        disabled={!canProceed()}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
