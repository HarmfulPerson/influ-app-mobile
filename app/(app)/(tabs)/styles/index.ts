import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";
export const styles = StyleSheet.create({
    containerTop: {
        height: "50%",
        width: "100%",
    },
    containerBottom: {
        height: "50%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    menuItem: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        height: "50%",
    },
    iconFilter: {
        width: 54,
        height: 54,
        marginRight: 8,
    },
    filterScrollContainer: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
    },
    addAdvertisementButton: { width: 44, height: 44 },
    adddAdvertisementButtonCotnainer: {
        width: "15%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    searchInput: {
        marginTop: 16,
        marginBottom: 16,
        height: 60,
        display: "flex",
        flexDirection: "row",
    },
    searchInputContainer: { width: "85%" },
    switchDisplayedContentButton: {
        width: "50%",
        height: 31,
        fontSize: 16,
        color: Colors.grayscale.text.body,
        borderRadius: 12,
        fontFamily: "PoppinsSemiBold",
    },
    switchButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 60,
        paddingTop: 4,
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 4,
    },
    topBarContainer: {
        backgroundColor: Colors.grayscale.surface.darker,
        minHeight: 160,
        width: "100%",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingTop: 8,
        paddingRight: 16,
        paddingLeft: 16,
        shadowOpacity: 0.15,
        paddingBottom: 24,
        marginBottom: 12,
    },
    flatListContainer: {
        width: "90%",
    },
});
