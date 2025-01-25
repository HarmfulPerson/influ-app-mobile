import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.grayscale.surface.darker,
        borderWidth: 1,
        borderColor: Colors.grayscale.surface.default,
        borderRadius: 32,
        padding: 16,
        width: "90%",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "hidden",
        marginTop: 8,
    },
    endContainer: {
        height: 28,
        width: 106,
        borderRadius: 24,
        backgroundColor: Colors.grayscale.surface.default,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
    },
    endText: { color: Colors.grayscale.text.body, fontSize: 12 },
    campaignName: {
        color: Colors.grayscale.text.title,
        fontSize: 24,
        fontWeight: "700",
    },
    campaignCounter: {
        color: Colors.grayscale.text.title,
        fontSize: 12,
    },
    nameAndCounterContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        flexDirection: "row",
    },
    eachCooperationContainer: {
        alignSelf: "center",
        minWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    eachCooperation: {
        minWidth: "100%",
        marginHorizontal: "auto",
        margin: 0,
    },
});
