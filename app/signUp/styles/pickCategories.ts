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
        fontSize: 12,
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
    pickedStyle: {
        color: Colors.grayscale.text.negative,
    },
    unpickedStyle: {
        color: Colors.grayscale.text.body,
        paddingLeft: 14,
        paddingRight: 14,
    },
    eachCategoryButton: {
        alignSelf: "center",
        padding: 12,
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderColor: Colors.grayscale.surface.subtle,
    },
    gradientStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        margin: 5,
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 48,
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
});
