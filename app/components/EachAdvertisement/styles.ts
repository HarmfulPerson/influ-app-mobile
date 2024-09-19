import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.grayscale.surface.darker,
        display: "flex",
        flexDirection: "row",
    },
    wrapper: {
        backgroundColor: Colors.grayscale.surface.darker,
        marginBottom: 24,
        padding: 16,
        borderRadius: 24,
    },
    subHeaderContainer: {
        width: "20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarCircle: {
        backgroundColor: "transparent",
        overflow: "hidden",
    },
    avatarDisplayer: {
        width: "100%",
        height: "100%",
        borderRadius: 24,
    },
    companyNameText: { fontSize: 10, color: "white", opacity: 0.75 },
    titleText: { fontSize: 20 },
    companyAndTitleContainer: {
        width: "80%",
    },
    descriptionContainer: {
        marginBottom: 12,
        borderBottomWidth: 1,
        borderColor: Colors.grayscale.border.default,
    },
    descriptionText: {
        color: "#CBC7C7",
        marginBottom: 12,
        marginTop: 12,
    },
    footerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    timeText: {
        fontSize: 16,
        color: Colors.grayscale.text.body,
    },
    socialsContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-end",
    },
});
