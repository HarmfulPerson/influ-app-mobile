import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 140,
        marginLeft: 16,
        marginRight: 16,
    },
    welcomeTitle: {
        fontSize: 32,
        width: "100%",
        textAlign: "left",
        fontWeight: "900",
        color: Colors.grayscale.text.title,
    },
    subtitleText: {
        fontSize: 16,
        width: "85%",
        textAlign: "left",
        color: Colors.grayscale.text.subtitle,
    },
    countryPrefixContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    phoneNumberContainer: { display: "flex", flexDirection: "row" },
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
        marginTop: 36,
        width: "26%",
        marginRight: 10,
        color: Colors.grayscale.text.disabled,
    },
    phoneNumberInput: {
        borderRadius: 12,
        backgroundColor: Colors.grayscale.surface.darker,
        minHeight: 60,
        marginTop: 36,
        flex: 1,
    },
    passwordInput: {
        borderRadius: 12,
        backgroundColor: Colors.grayscale.surface.darker,
        minHeight: 60,
        marginTop: 18,
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
    dontHaveAccount: {
        textAlign: "center",
        marginTop: 8,
        fontSize: 16,
    },
    dontHaveAccountRegister: {
        fontWeight: "900",
    },
    registerWithGoogle: {
        backgroundColor: "transparent",
        height: 72,
        marginTop: 12,
        marginBottom: 12,
    },
    registerWithGoogleText: {
        color: Colors.grayscale.text.body,
        fontSize: 20,
    },
    buttonsContainer: {
        paddingTop: 20,
    },
    lostPhoneInfo: {
        paddingTop: 24,
        fontSize: 16,
        color: Colors.secondary.surface.lighter,
        paddingBottom: 8,
    },
    continueButton: {
        height: 72,
        marginTop: 12,
        marginBottom: 12,
        width: "100%",
    },
    backButton: {
        position: "absolute",
        width: 50,
        height: 50,
        top: 56,
        left: 16,
        zIndex: 1,
        backgroundColor: Colors.grayscale.surface.darker,
    },
});
