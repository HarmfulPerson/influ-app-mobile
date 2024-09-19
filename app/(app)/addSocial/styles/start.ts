import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        height: 40,
        width: "100%",
        zIndex: 1,
    },
    gradientBottom: {
        position: "absolute",
        bottom: 0,
        right: 0,
        height: 40,
        width: "100%",
        zIndex: 1,
    },
    backButton: {
        position: "absolute",
        width: 44,
        height: 44,
        top: 64,
        left: 32,
        zIndex: 1,
        backgroundColor: "#151419",
    },
    contentWrapper: {
        marginTop: 96,
        width: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
    },
    subtitle: {
        marginTop: 16,
        color: Colors.grayscale.text.title,
        fontSize: 20,
    },
    titlesContainer: {
        paddingTop: 32,
        paddingRight: 32,
        paddingLeft: 32,
    },
    header: { fontWeight: "700", fontSize: 32 },
    buttonContainer: {
        paddingBottom: 32,
        paddingRight: 32,
        paddingLeft: 32,
    },
    navigatToNextPageButton: {
        width: "100%",
        height: 72,
        borderWidth: 0,
        marginTop: 5,
    },
    startButton: {
        width: "100%",
        height: 56,
        borderWidth: 0,
        marginTop: 5,
    },
});
