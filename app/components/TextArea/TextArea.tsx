import {
    Button as TamaguiButton,
    Text,
    View,
    Input as TamaguiInput,
    ColorTokens,
    TextArea,
} from "tamagui";
import Colors from "../../../constants/Colors";
import { KeyboardTypeOptions } from "react-native";
import { styles } from "./styles";

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
    style: any;
    editable: boolean;
};

const CustomTextArea = (props: Partial<InputProps>) => {
    const {
        onChangeText,
        placeholder,
        value,
        label,
        error,
        disabled = false,
        infoMessage = "",
        style,
        editable = true,
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
            <TextArea
                borderWidth={1}
                borderColor={typeOfInputStyles.borderColor}
                disabled={disabled}
                editable={editable}
                placeholder={placeholder}
                backgroundColor={typeOfInputStyles.backgroundColor}
                value={value}
                color={typeOfInputStyles.color}
                placeholderTextColor={typeOfInputStyles.color as ColorTokens}
                onChangeText={onChangeText}
                focusStyle={{
                    borderColor: Colors.primary.border.default,
                    color: "white",
                }}
                pressStyle={{ backgroundColor: "transparent" }}
                style={[styles.inputContainer, style]}></TextArea>
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

export default CustomTextArea;
