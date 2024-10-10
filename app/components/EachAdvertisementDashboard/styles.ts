import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#373137",
        height: 150,
        width: 265,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginHorizontal: 4,
        borderRadius: 16,
    },
    titleContainer: {
        height: 60,
        width: "100%",
        marginBottom: 4,
        flexDirection: "row",
    },
    nameOfCompany: {
        color: Colors.grayscale.text.caption,
        fontSize: 10,
    },
    title: {
        fontSize: 16,
        fontFamily: "PoppinsSemiBold",
        color: Colors.grayscale.text.title,
    },
    companyLogo: {
        width: 60,
        height: 60,
        backgroundColor: "green",
        borderRadius: 12,
    },
    companyInfoContainer: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginLeft: 10,
    },
    platformsContainer: {
        flexDirection: "row",
    },
    platformsTitle: {
        fontSize: 10,
        color: Colors.grayscale.text.caption,
    },
    platformTextContainer: {
        marginLeft: 16,
    },
    socialText: {
        fontSize: 12,
        fontFamily: "PoppinsSemiBold",
        textTransform: "capitalize",
        color: Colors.grayscale.text.title,
    },
    platformContainer: { height: 30, marginTop: 4 },
    calendarContainer: {
        flexDirection: "row",
        height: 27,
        justifyContent: "center",
        marginLeft: 16,
    },
    publicationText: {
        fontSize: 10,
        color: Colors.grayscale.text.caption,
    },
    publicationValue: {
        fontSize: 12,
        fontFamily: "PoppinsSemiBold",
        textTransform: "capitalize",
        color: Colors.grayscale.text.title,
    },
    platformAndPublicationContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    calendar: {
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
    },
    publicationContainer: { marginLeft: 8 },
});
