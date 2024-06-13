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
    nextStepButton: {
        height: 56,
        marginTop: 20,
        marginBottom: 64,
        width: "100%",
        alignSelf: "flex-end",
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
    plusSignContainer: {
        width: 72,
        height: 72,
        position: "absolute",
        bottom: -12,
        right: -4,
        borderRadius: 6,
        borderColor: Colors.primary.border.default,
        borderWidth: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.grayscale.surface.darker,
    },
    addPhotoContainer: {
        width: 194,
        height: 194,
        borderRadius: 194,
        backgroundColor: Colors.grayscale.surface.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.primary.border.default,
        borderWidth: 4,
    },
    centralAreaContainer: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    pickedImage: {
        width: "100%",
        height: "100%",
        borderRadius: 97,
    },
});
