import {
    Button as TamaguiButton,
    Text,
    View,
    Input as TamaguiInput,
    ColorTokens,
} from "tamagui";
import Colors from "../../../constants/Colors";
import { styles } from "./styles";
import { KeyboardTypeOptions } from "react-native";

type InputProps = {
    onChangeText: (text: string) => void;
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
    onIconRightCick?: () => void;
    value: string;
    label: string;
    iconRight: any;
    error: boolean;
    disabled: boolean;
    infoMessage: string;
    secureTextEntry: boolean;
    iconLeft: any;
    hasIconBackground: boolean;
    styleInput: any;
};

const Input = (props: Partial<InputProps>) => {
    const {
        onChangeText,
        placeholder,
        keyboardType,
        onIconRightCick,
        value,
        label,
        iconRight,
        error,
        disabled = false,
        infoMessage = "",
        secureTextEntry = false,
        iconLeft,
        hasIconBackground = true,
        styleInput,
    } = props;
    const returnStyles = () => {
        let style = {
            label: styles.inputLabel,
            borderColor: Colors.grayscale.surface.default,
            backgroundColor: Colors.grayscale.surface.darker,
            color: Colors.grayscale.border.disabled,
            infoMessageColor: "#CBC7C7",
        };
        if (error) {
            style = {
                label: styles.errorLabel,
                borderColor: Colors.error.surface.default,
                backgroundColor: Colors.grayscale.surface.darker,
                color: Colors.grayscale.border.disabled,
                infoMessageColor: Colors.error.border.default,
            };
        }
        if (disabled) {
            style = {
                label: styles.disabledLabel,
                borderColor: Colors.grayscale.surface.disabled,
                backgroundColor: Colors.grayscale.surface.disabled,
                color: Colors.grayscale.text.disabled,
                infoMessageColor: Colors.grayscale.text.disabled,
            };
        }

        return style;
    };
    const typeOfInputStyles = returnStyles();

    return (
        <>
            {label && <Text style={typeOfInputStyles.label}>{label}</Text>}
            <TamaguiButton
                borderWidth={1}
                borderColor={typeOfInputStyles.borderColor}
                backgroundColor={typeOfInputStyles.backgroundColor}
                focusStyle={{
                    borderColor: Colors.primary.border.default,
                }}
                pressStyle={{ backgroundColor: "transparent" }}
                style={{ ...styles.inputContainer, ...styleInput }}>
                <View style={styles.input}>
                    {!!iconLeft && !disabled && (
                        <View style={styles.leftIcon}>{iconLeft}</View>
                    )}
                    <TamaguiInput
                        borderWidth={0}
                        secureTextEntry={secureTextEntry}
                        style={{ flex: 1, height: 40 }}
                        keyboardType={keyboardType}
                        placeholder={placeholder}
                        focusStyle={{ color: "white" }}
                        placeholderTextColor={
                            typeOfInputStyles.color as ColorTokens
                        }
                        backgroundColor={typeOfInputStyles.backgroundColor}
                        value={value}
                        disabled={disabled}
                        color={typeOfInputStyles.color}
                        onChangeText={onChangeText}
                        borderColor={typeOfInputStyles.backgroundColor}
                    />
                    {!!iconRight && !disabled && (
                        <View
                            onPress={onIconRightCick}
                            style={{
                                height: 36,
                                width: 36,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <View
                                style={hasIconBackground && styles.clearInput}>
                                {iconRight}
                            </View>
                        </View>
                    )}
                </View>
            </TamaguiButton>
            <Text
                color={typeOfInputStyles.infoMessageColor}
                style={{
                    fontSize: 10,
                    marginTop: 2,
                    textAlign: error ? "right" : "left",
                }}>
                {infoMessage}
            </Text>
        </>
    );
};

export default Input;
