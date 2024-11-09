import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";
export const styles = StyleSheet.create({
    flatListContainer: {},
    container: { flex: 1, paddingHorizontal: 16 },
    userBarContainer: {
        height: 60,
        width: "100%",
        marginTop: 64,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 16,
    },
    welcomeMessageContainer: {
        textAlign: "left",
        flex: 1,
        paddingHorizontal: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    welcomeMessage: { fontSize: 20, color: Colors.grayscale.text.title },
    welcomeMessageUser: {
        fontSize: 20,
        fontFamily: "PoppinsSemiBold",
        color: Colors.grayscale.text.title,
    },
    notificationsButton: { height: 44, width: 44 },
    navigationContainer: {
        marginTop: 18,
        flexDirection: "row",
    },
    imageAvatar: {
        borderRadius: 30,
    },
    navigationTile: {
        height: 114,
        flex: 1,
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 6,
        marginHorizontal: 4,
        backgroundColor: Colors.grayscale.surface.default,
    },
    navigationText: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: "PoppinsSemiBold",
        color: Colors.grayscale.text.body,
    },
    navigationIcon: { position: "absolute", bottom: 8, right: 4 },
    advertisementTitleContainer: {
        marginTop: 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    advertisementTitle: {
        fontSize: 16,
        textAlign: "left",
        fontFamily: "PoppinsSemiBold",
        color: Colors.grayscale.text.subtitle,
    },
    advertisementSeeAll: {
        fontSize: 10,
        color: Colors.primary.surface.lighter,
        textDecorationLine: "underline",
    },
});
