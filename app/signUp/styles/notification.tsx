import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
        bottom: 0,
        zIndex: -1,
        backgroundColor: Colors.grayscale.surface.darker,
    },
    titleText: {
        fontSize: 24,
        fontWeight: "900",
        textAlign: "center",
        color: Colors.grayscale.text.title,
    },
    infoText: {
        fontSize: 16,
        marginTop: 8,
        textAlign: "center",
        color: Colors.grayscale.text.subtitle,
    },
    smallLogo: {
        position: "absolute",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        top: 56,
        zIndex: 1,
    },
    contentWrapper: {
        marginTop: 140,
        flex: 1,
        justifyContent: "space-between",
        marginLeft: 16,
        marginRight: 16,
    },
    navigateNextButton: {
        height: 56,
        marginTop: 48,
        marginBottom: 12,
        width: "100%",
    },
    skipButton: {
        height: 56,
        width: "100%",
    },
    buttonsContainer: { marginBottom: 64 },
    centralAreaContainer: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    logoBackground: {
        width: 210,
        height: 210,
        borderRadius: 105,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
