import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    countryPrefixContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    phoneNumberContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 16,
    },
    flag: { borderRadius: 16, width: 16 },
    phonePrefix: {
        color: Colors.grayscale.text.disabled,
        fontSize: 16,
        paddingLeft: 12,
    },
    prefixButton: {
        borderRadius: 12,
        backgroundColor: Colors.grayscale.surface.darker,
        minHeight: 60,
        width: "26%",
        marginRight: 10,
        color: Colors.grayscale.text.disabled,
    },
    phoneNumberInput: {
        borderRadius: 12,
        backgroundColor: Colors.grayscale.surface.darker,
        minHeight: 60,
        flex: 1,
    },
    clearInput: {
        width: 16,
        height: 16,
        borderRadius: 16,
        backgroundColor: Colors.grayscale.surface.subtle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    nextStepButton: {
        height: 56,
        marginBottom: 64,
        width: "100%",
        alignSelf: "flex-end",
    },
    infoText: {
        fontSize: 16,
        marginTop: 8,
        color: Colors.grayscale.text.subtitle,
    },
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
});
