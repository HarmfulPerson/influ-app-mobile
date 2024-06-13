import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    titleText: {
        fontSize: 32,
        fontFamily: "PoppinsSemiBold",
        color: Colors.grayscale.text.title,
    },
    container: {
        flex: 1,
        marginTop: 140,
        marginLeft: 16,
        marginRight: 16,
        display: "flex",
        justifyContent: "space-between",
    },
    infoText: {
        fontSize: 16,
        marginTop: 8,
        color: Colors.grayscale.text.subtitle,
    },
    digitInput: {
        width: 42,
        marginLeft: 4,
        marginRight: 4,
        height: 56,
        backgroundColor: Colors.grayscale.surface.darker,
        borderColor: Colors.grayscale.surface.default,
        color: Colors.grayscale.text.caption,
    },
    digitContainer: {
        marginTop: 24,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    digitsDivider: {
        marginRight: 4,
        marginLeft: 4,
        color: Colors.grayscale.text.caption,
    },
    nextStepButton: {
        height: 56,
        marginBottom: 64,
        width: "100%",
        alignSelf: "flex-end",
    },
});
