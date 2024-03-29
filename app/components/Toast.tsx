import { Toast, useToastState } from "@tamagui/toast";
import React from "react";
import { StyleSheet } from "react-native";
import { YStack } from "tamagui";

const successStyles = StyleSheet.create({
    background: {
        backgroundColor: "green",
    },
    fontColor: {
        color: "white",
    },
});

const errorStyles = StyleSheet.create({
    background: {
        backgroundColor: "red",
    },
    fontColor: {
        color: "white",
    },
});

const CurrentToast = () => {
    const currentToast = useToastState();
    const styles = {
        error: errorStyles,
        success: successStyles,
    };
    if (!currentToast || currentToast.isHandledNatively) return null;
    return (
        <Toast
            key={currentToast.id}
            duration={currentToast.duration}
            enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
            exitStyle={{ opacity: 0, scale: 1, y: -20 }}
            y={0}
            opacity={1}
            scale={1}
            animation="100ms"
            type="foreground"
            style={styles[currentToast.type as keyof typeof styles].background}
            viewportName={currentToast.viewportName}>
            <YStack>
                <Toast.Title
                    style={
                        styles[currentToast.type as keyof typeof styles]
                            .fontColor
                    }>
                    {currentToast.title}
                </Toast.Title>
                {!!currentToast.message && (
                    <Toast.Description
                        style={
                            styles[currentToast.type as keyof typeof styles]
                                .fontColor
                        }>
                        {currentToast.message}
                    </Toast.Description>
                )}
            </YStack>
        </Toast>
    );
};

export default CurrentToast;
