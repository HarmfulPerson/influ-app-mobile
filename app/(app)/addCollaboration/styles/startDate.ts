import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
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
    radioContainer: {
        width: "100%",
        height: 62,
        borderRadius: 12,
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
    },
    radioCircleContainer: {
        width: "15%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    circle: { width: 24, height: 24 },
    textContainer: {
        width: "85%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 6,
        paddingBottom: 6,
    },
    firstRowText: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
    },
    firstRowTitle: { fontSize: 16, fontWeight: "700", textAlign: "left" },
    secondRowSubtitle: { fontSize: 10, textAlign: "left", width: "100%" },
    navigationButton: { height: "100%", width: "48%" },
    navigationButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
    },
});
