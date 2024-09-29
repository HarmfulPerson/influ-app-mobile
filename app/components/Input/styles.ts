import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    borderRadius: 12,
    minHeight: 60,
  },
  inputLabel: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: Colors.grayscale.text.subtitle,
  },
  errorLabel: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: Colors.error.text.label,
  },
  disabledLabel: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: Colors.grayscale.text.disabled,
  },
  clearInput: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: Colors.grayscale.surface.subtle,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  leftIcon: {
    width: 16,
    height: 16,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
