import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    safeAreaView: { flex: 1, padding: 24 },
    title: {
        marginTop: 24,
        lineHeight: 28.8,
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
    },
    searchContainer: {
        height: 80,
        minWidth: "100%",
    },
});
