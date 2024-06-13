import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
export const styles = StyleSheet.create({
    topBox: {
        display: "flex",
        width: "100%",
        backgroundColor: Colors.primary.surface.default,
        height: 200,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    backButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        fontSize: 96,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    textContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
