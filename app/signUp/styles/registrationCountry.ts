import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    countryPrefixContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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
    infoText: {
        fontSize: 16,
        marginTop: 8,
        color: Colors.grayscale.text.subtitle,
    },
    nextStepButton: {
        height: 56,
        marginTop: 20,
        marginBottom: 64,
        width: "100%",
        alignSelf: "flex-end",
    },
    countryLabel: {
        marginTop: 24,
        marginBottom: 4,
        fontSize: 16,
        fontFamily: "PoppinsSemiBold",
        color: Colors.grayscale.text.subtitle,
    },
    selectWrapper: { width: "100%" },
    bottomText: {
        textAlign: "center",
        fontSize: 16,
        color: Colors.grayscale.text.subtitle,
    },
    highlightedText: { color: Colors.primary.text.label },
});
