import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
    infoMiddleRow: {
        height: 97,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.grayscale.surface.subtle,
        flexDirection: "row",
    },
    infoContainer: {
        width: "100%",
        minHeight: 207,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: Colors.grayscale.surface.subtle,
        backgroundColor: "#373137",
        flexDirection: "column",
        marginBottom: 24,
    },
    dateRow: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    dateRowInfo: {
        flexDirection: "column",
        paddingLeft: 12,
    },
    socialString: {
        textTransform: "capitalize",
        paddingLeft: 4,
    },
    eachSocialContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    socialContainer: {
        alignItems: "center",
        flexDirection: "row",
        flexGrow: 1,
    },
    filterValues: {
        fontFamily: "PoppinsSemiBold",
        lineHeight: 14,
    },
    filterContainer: {
        width: "33%",
        padding: 12,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
});
