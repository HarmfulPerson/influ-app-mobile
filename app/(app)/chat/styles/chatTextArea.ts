import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,

    borderRadius: 8,
    paddingLeft: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: Colors.grayscale.surface.darker,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  textArea: {
    width: "90%",
    maxHeight: 120,
    fontSize: 16,
    padding: 0,
    margin: 0,
    color: "white",
    backgroundColor: Colors.grayscale.surface.darker,
    borderRadius: 8,
    justifyContent: "center",
  },
  textAreaContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  sendButton: {
    justifyContent: "flex-end",
    alignSelf: "stretch",
    marginLeft: 8,
    width: "10%",
  },
});
