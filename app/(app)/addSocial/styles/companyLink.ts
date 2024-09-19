import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
    title: {
        fontWeight: "700",
        fontSize: 24,
        marginBottom: 8,
        color: Colors.grayscale.text.title,
    },
    subtitle: {
        fontSize: 12,
        marginBottom: 16,
        color: Colors.grayscale.text.subtitle,
    },
    campaignTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#CBC7C7",
    },
    campaingContainer: { marginTop: 16 },
    searchIconContainer: {
        width: 16,
        height: 16,
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    searchButton: {
        borderRadius: 12,
        backgroundColor: Colors.grayscale.surface.darker,
        minHeight: 60,
        marginTop: 6,
    },
    campaignRow: {
        width: "100%",
        borderBottomColor: Colors.grayscale.surface.subtle,
        borderBottomWidth: 1,
        paddingBottom: 16,
        paddingTop: 16,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    campaignRowText: {
        fontSize: 16,
        color: Colors.grayscale.text.body,
    },
    campaignRowsContainer: { maxHeight: 240 },
    campaignPickerTitle: {
        fontSize: 24,
        fontFamily: "PoppinsSemiBold",
        color: Colors.grayscale.text.title,
    },
    navigationButton: { height: "100%", width: "48%" },
});
