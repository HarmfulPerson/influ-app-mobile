import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.grayscale.text.title,
    },
    container: {
        marginTop: 16,
        height: 60,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    navigationButton: { height: "100%", width: "48%" },
    navigationButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
    },
    subHeaderContainer: {
        width: "20%",
        height: "100%",
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
    descriptionText: { fontSize: 12, color: "#CBC7C7" },
    descriptionContainer: {
        flex: 1,
        marginTop: 12,
    },
    companyNameText: { fontSize: 10, color: "white", opacity: 0.75 },
    titleText: { fontSize: 20 },
    companyAndTitleContainer: {
        width: "80%",
        height: "100%",
    },
});
