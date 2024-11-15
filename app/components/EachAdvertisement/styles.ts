import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#373137",
        minHeight: 219,
        width: "90%",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginVertical: 4,
    },
    titleContainer: {
        height: 110,
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
        width: 110,
        height: 110,
        backgroundColor: "green",
        borderRadius: 12,
    },
    companyInfoContainer: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginLeft: 10,
        flex: 1,
    },
    description: {
        fontSize: 10,
        lineHeight: 12,
        color: Colors.grayscale.text.subtitle,
        flexShrink: 1, // Shrinks the text to fit within the view
        flexGrow: 1, // Allows text to grow within the view
        flexWrap: "wrap",
        marginTop: 12,
        textAlign: "left", // Center text horizontally
    },
    platformsContainer: {
        flexDirection: "row",
    },
    publicationTextContainer: { marginLeft: 8, maxHeight: 22 },
    publicationContainer: {
        flexDirection: "row",
        height: 22,
        marginLeft: 16,
    },
    calendar: {
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
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
    platformContainer: { height: 30 },
    calendarContainer: {
        flexDirection: "row",
        height: 27,
    },
    publicationText: {
        fontSize: 10,
        color: Colors.grayscale.text.caption,
        lineHeight: 10,
    },
    publicationValue: {
        fontSize: 12,
        fontFamily: "PoppinsSemiBold",
        textTransform: "capitalize",
        color: Colors.grayscale.text.title,
        lineHeight: 14,
    },
    platformAndPublicationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 16,
    },
});
