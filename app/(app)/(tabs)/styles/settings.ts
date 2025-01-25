import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";
export const styles = StyleSheet.create({
    eachItemContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 12,
        borderBottomWidth: 0.7,
        borderBottomColor: Colors.grayscale.surface.default,
    },
    eachItemText: {
        fontSize: 16,
        paddingLeft: 8,
        color: Colors.grayscale.text.title,
    },
    container: { flex: 1, position: "relative" },
    buttonsContainer: { marginTop: 24, padding: 24 },
    title: {
        lineHeight: 28.8,
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    usernameAndEditContainer: {
        flexDirection: "row",
        marginTop: 24,
        marginBottom: 24,
    },
    photoContainer: {
        height: 64,
        width: 64,
        borderRadius: 32,
        backgroundColor: "blue",
    },
    username: {
        fontSize: 20,
        lineHeight: 24,
        fontFamily: "PoppinsSemiBold",
        color: Colors.grayscale.text.title,
    },
    usernameContainer: {
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 16,
    },
    nameOfCompany: {
        fontSize: 12,
        lineHeight: 14.4,
        color: Colors.grayscale.text.disabled,
    },
    editIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    preferenceText: {
        marginTop: 24,
        fontFamily: "PoppinsSemiBold",
        lineHeight: 14.4,
        fontSize: 12,
        color: Colors.grayscale.text.disabled,
    },
    logoContainer: {
        bottom: 100,
        position: "absolute",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    suseuText: {
        lineHeight: 14.4,
        marginTop: 8,
        marginBottom: 4,
        fontSize: 12,
        color: Colors.grayscale.surface.disabled,
    },
    versionText: {
        lineHeight: 12,
        fontSize: 10,
        color: Colors.grayscale.surface.disabled,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    imageAvatar: {
        borderRadius: 30,
    },
});
