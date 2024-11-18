import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayscale.surface.darker,
    width: "90%",
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.grayscale.surface.subtle,
  },
  rowWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  socialIconContainer: {
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  userContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  userImageContainer: {
    backgroundColor: "transparent",
    overflow: "hidden",
    height: 48,
    width: 48,
    borderRadius: 12,
  },
  userPhoto: {
    width: "100%",
    height: "100%",
  },
  userInfoContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 8,
  },
  username: {
    color: Colors.grayscale.text.subtitle,
    fontSize: 12,
    lineHeight: 14.4,
  },
  cooperationTitle: {
    color: Colors.grayscale.text.body,
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "PoppinsSemiBold",
  },
  ugcContainer: {
    height: 18,
    width: 44,
    borderRadius: 24,
    backgroundColor: Colors.primary.surface.default,
    justifyContent: "center",
    alignItems: "center",
  },
  ugcText: {
    color: Colors.grayscale.text.negative,
    fontSize: 10,
    lineHeight: 12,
  },
  finishedContainer: {
    height: 18,
    width: 84,
    borderRadius: 24,
    backgroundColor: Colors.grayscale.surface.default,
    justifyContent: "center",
    alignItems: "center",
  },
  finishedText: { color: Colors.grayscale.text.body, fontSize: 10 },
});
