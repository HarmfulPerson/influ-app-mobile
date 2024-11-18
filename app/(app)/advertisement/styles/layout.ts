import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
    addInfluencerButton: {
        width: "100%",
        height: 56,
        borderWidth: 0,
        marginTop: 5,
    },
    buttonContainer: {
        height: 88,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    logoAndTitleContainer: { flexDirection: "row", paddingBottom: 24 },
    companyLogo: {
        height: 73,
        width: 73,
        backgroundColor: "green",
        borderRadius: 12,
        marginRight: 10,
    },
    company: {
        fontSize: 12,
        color: Colors.grayscale.text.body,
        lineHeight: 12.4,
    },
    advertisementTitle: {
        fontSize: 24,
        color: Colors.grayscale.text.title,
        fontWeight: "700",
        lineHeight: 28.8,
        paddingRight: 80,
    },
    menuChoiceContainer: {
        marginTop: 24,
        flex: 1,
    },
    menusContianer: {
        marginTop: 12,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: "row",
    },
    pickedMenuContainer: {
        width: "50%",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        marginRight: 0,
        fontFamily: "PoppinsSemiBold",
        color: "white",
        borderRadius: 0,
        marginLeft: 0,
        borderRightWidth: 0,
        borderColor: Colors.primary.surface.lighter,
    },
    pickedMenuTitle: {
        fontFamily: "PoppinsSemiBold",
        color: "white",
    },
    menuContainer: {
        width: "50%",
        borderColor: Colors.grayscale.surface.subtle,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRadius: 0,
        marginRight: 0,
        marginLeft: 0,
        borderRightWidth: 0,
    },
    menuTitle: {
        fontSize: 16,
        color: Colors.grayscale.text.disabled,
    },
    container: {
        paddingTop: 48,
        flex: 1,
        backgroundColor: Colors.grayscale.surface.darker,
    },
});