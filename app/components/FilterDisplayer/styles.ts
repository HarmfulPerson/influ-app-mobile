import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    eachRow: {
        maxHeight: 26,
        display: "flex",
        flexDirection: "row",
    },
    eachPill: {
        borderRadius: 10,
        borderWidth: 1,
        height: 22,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 4,
        marginRight: 4,
        backgroundColor: "transparent",
        fontSize: 10,
        borderColor: Colors.grayscale.border.default,
    },
    container: {
        height: 52,
        marginBottom: 0,
        flexDirection: "column",
    },
});
