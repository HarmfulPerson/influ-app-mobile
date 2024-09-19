import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

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
    sexButton: {
        width: "48%",
        height: 108,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    sexButtonSeparator: { width: "4%" },
    sexLabel: { fontSize: 10 },
    sliderContainer: { marginTop: 40 },
    sliderLabelContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    ageLabel: {
        fontWeight: "700",
        fontSize: 16,
        color: Colors.grayscale.text.caption,
    },
    ageRangeLabel: {
        fontSize: 12,
        color: Colors.primary.text.label,
    },
    reachContainer: {
        marginTop: 24,
    },
    minMaxAgeLabelContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 16,
    },
    minMaxLabel: {
        fontSize: 10,
        color: Colors.grayscale.text.caption,
    },
    reachTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.grayscale.text.subtitle,
    },
    reachButtonsContainer: {
        marginTop: 16,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    buttonMicro: { width: "29%", marginBottom: 8 },
    buttonSmall: {
        width: "29%",
    },
    separator: { width: "2%" },
    buttonMedium: { width: "38%" },
    buttonBig: { width: "49%" },
    buttonLarge: { width: "49%" },
});
