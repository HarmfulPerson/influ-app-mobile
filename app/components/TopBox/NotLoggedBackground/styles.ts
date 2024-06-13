import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        width: 50,
        height: 50,
        top: 56,
        left: 16,
        zIndex: 1,
        backgroundColor: Colors.grayscale.surface.darker,
    },
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
        bottom: 0,
        zIndex: -1,
        backgroundColor: Colors.grayscale.surface.darker,
    },
    smallLogo: {
        position: "absolute",
        width: 50,
        height: 50,
        top: 56,
        right: 16,
        zIndex: 1,
    },
});
