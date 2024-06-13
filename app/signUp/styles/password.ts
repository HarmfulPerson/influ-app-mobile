import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 140,
        marginLeft: 16,
        marginRight: 16,
        display: "flex",
        justifyContent: "space-between",
    },
    titleText: {
        fontSize: 32,
        fontFamily: "PoppinsSemiBold",
        color: Colors.grayscale.text.title,
    },
    infoText: {
        fontSize: 16,
        marginTop: 8,
        color: Colors.grayscale.text.subtitle,
    },
    clearInput: {
        width: 16,
        height: 16,
        borderRadius: 16,
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputLabel: {
        marginTop: 24,
        marginBottom: 4,
        fontSize: 16,
        fontFamily: "PoppinsSemiBold",
        color: Colors.grayscale.text.subtitle,
    },
    inputContainer: {
        borderRadius: 12,
        backgroundColor: Colors.grayscale.surface.darker,
        minHeight: 60,
        flex: 1,
    },
    input: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    nextStepButton: {
        height: 56,
        marginTop: 20,
        marginBottom: 64,
        width: "100%",
        alignSelf: "flex-end",
    },
});
