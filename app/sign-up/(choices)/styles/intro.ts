import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";
export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    topBox: {
        display: "flex",
        width: "100%",
        backgroundColor: Colors.light.background,
        height: "20%",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    bottomBox: {
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    choice: {
        justifyContent: "center",
        alignItems: "center",
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
});
