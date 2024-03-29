import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "100%",
    },
    keyBoardAvoiding: {
        flex: 1,
        minHeight: "80%",
    },
    form: {
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100%",
    },
    typeContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    socialPicker: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        width: "33%",
    },
    pickedSocial: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        width: "33%",
        backgroundColor: "red",
    },
});
