import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
    header: {
        fontWeight: "700",
        fontSize: 32,
        marginBottom: 16,
        color: Colors.grayscale.text.title,
    },
    navigateNextButton: { width: "100%", height: "100%", marginTop: 16 },
});
