import { Button as TamaguiButton, Text } from "tamagui";
import Colors from "../../../constants/Colors";
import { StyleSheet } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
type ButtonProps = {
    style?: any;
    disabled?: boolean;
    text: string;
    variant: "primary" | "secondary";
    iconAlign?: "left" | "right";
    icon?: any;
    size?: "small" | "medium" | "large";
    onPress?: () => any;
    rounded?: "normal" | "full";
    ref?: any;
};

const styles = StyleSheet.create({
    wrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
    },
    noMarginPadding: { margin: 0, padding: 0 },
});

const disabledStyles = StyleSheet.create({
    disabledBackground: {
        backgroundColor: Colors.grayscale.surface.disabled,
    },
    disabledColor: {
        color: Colors.grayscale.text.disabled,
    },
});

const primaryStyles = StyleSheet.create({
    backgroundAndBorder: {
        backgroundColor: Colors.primary.surface.lighter,
        borderColor: "none",
    },
    textColor: {
        color: Colors.grayscale.text.negative,
    },
    leftGradient: { color: Colors.primary.surface.lighter },
    rightGradient: { color: Colors.primary.text.label },
    pressedLeftGradient: { color: Colors.primary.surface.darker },
    pressedRightGradient: { color: Colors.primary.surface.darker },
    pressedBorderColor: { borderColor: "none" },
});

const secondaryStyles = StyleSheet.create({
    backgroundAndBorder: {
        backgroundColor: "transparent",
        borderColor: Colors.grayscale.surface.subtle,
    },
    textColor: {
        color: Colors.grayscale.text.body,
    },
    leftGradient: { color: "transparent" },
    rightGradient: { color: "transparent" },
    pressedLeftGradient: { color: "transparent" },
    pressedRightGradient: { color: "transparent" },
    pressedBorderColor: { borderColor: Colors.primary.surface.default },
});

const colorType = {
    primary: primaryStyles,
    secondary: secondaryStyles,
};

const smallSizes = StyleSheet.create({
    buttonWidth: {
        width: 67,
        height: 44,
    },
    fontSize: {
        fontSize: 16,
    },
});

const mediumSizes = StyleSheet.create({
    buttonWidth: {
        width: 101,
        height: 56,
    },
    fontSize: {
        fontSize: 20,
    },
});

const largeSizes = StyleSheet.create({
    buttonWidth: {
        width: 101,
        height: 72,
    },
    fontSize: {
        fontSize: 20,
    },
});

const sizesToPick = {
    ["small"]: smallSizes,
    ["medium"]: mediumSizes,
    ["large"]: largeSizes,
};

const roundType = {
    ["normal"]: 8,
    ["full"]: 20,
};

const Button = (props: ButtonProps) => {
    const {
        style,
        text,
        disabled,
        variant = "primary",
        iconAlign = null,
        rounded = "normal",
        size,
        icon,
        ref,
        onPress,
        ...restProps
    } = props;
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };
    const pickedSize = size ? sizesToPick[size] : sizesToPick["small"];

    const handlePressOut = () => {
        setIsPressed(false);
    };
    const pickedStyle = disabled
        ? disabledStyles.disabledBackground
        : colorType[variant].backgroundAndBorder;

    const fontSize = pickedSize.fontSize.fontSize;

    const gradientColors = isPressed
        ? [
              colorType[variant].pressedLeftGradient.color,
              colorType[variant].pressedRightGradient.color,
          ]
        : [
              colorType[variant].leftGradient.color,
              colorType[variant].rightGradient.color,
          ];
    const pickedRoundType = roundType[rounded];

    return (
        <TamaguiButton
            {...restProps}
            onPress={onPress}
            pressStyle={{
                borderColor: colorType[variant].pressedBorderColor.borderColor,
            }}
            style={[
                pickedStyle,
                pickedSize.buttonWidth,
                styles.noMarginPadding,
                style,
            ]}
            ref={ref}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            {!disabled ? (
                <LinearGradient
                    style={styles.wrapper}
                    colors={gradientColors}
                    start={{ y: 0.0, x: 1.0 }}
                    end={{ y: 1.0, x: 0.0 }}>
                    {iconAlign && iconAlign === "left" && <>{icon}</>}
                    <Text
                        fontSize={fontSize}
                        style={colorType[variant].textColor}>
                        {text}
                    </Text>
                    {iconAlign && iconAlign === "right" && <>{icon}</>}
                </LinearGradient>
            ) : (
                <Text
                    fontSize={fontSize}
                    style={
                        disabled
                            ? disabledStyles.disabledColor
                            : colorType[variant].textColor
                    }>
                    {text}
                </Text>
            )}
        </TamaguiButton>
    );
};

export default Button;
