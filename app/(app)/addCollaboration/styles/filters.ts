import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
    button: {
        width: "100%",
        textAlign: "center",
    },
    navigationButton: { height: "100%", width: "48%" },
    navigationButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
    },
    header: {
        fontWeight: "700",
        fontSize: 32,
        marginBottom: 16,
        color: Colors.grayscale.text.title,
    },
    subtitle: {
        fontSize: 12,
        color: Colors.grayscale.text.subtitle,
        marginBottom: 16,
    },
    twoButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
