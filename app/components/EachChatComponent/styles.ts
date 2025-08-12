import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    marginTop: 16,
    maxWidth: "100%",
    flexDirection: "row",
  },
  imageContainer: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  image: { borderRadius: 24 },
  usernameAndLastMessageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  usernames: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
    color: Colors.grayscale.text.body,
    lineHeight: 19.2,
  },
  lastMessage: {
    fontSize: 12,
    color: Colors.grayscale.text.caption,
    lineHeight: 14.4,
  },
  lastMessageTime: {
    color: Colors.grayscale.surface.disabled,
    fontSize: 12,
    lineHeight: 14.4,
  },
});
