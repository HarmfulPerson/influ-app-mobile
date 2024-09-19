import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 24,
    },
    buttonContainer: {
        flexBasis: "48%",
        marginVertical: 4,
    },
    leftButton: {
        marginRight: 4,
    },
    rightButton: {
        marginLeft: 4,
    },
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
});
