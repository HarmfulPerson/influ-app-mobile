import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
  iconRight: {
    width: 16,
    height: 16,
    backgroundColor: Colors.grayscale.surface.subtle,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    justifyContent: "flex-start",
    color: "white",
  },
  subtitle: {
    fontSize: 12,
    color: Colors.grayscale.text.subtitle,
    marginBottom: 12,
  },
  searchInput: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputInfo: {
    fontSize: 12,
    color: Colors.grayscale.text.subtitle,
    marginTop: 12,
    width: "100%",
  },
  userListContainer: { width: "100%", marginTop: 24 },
});
