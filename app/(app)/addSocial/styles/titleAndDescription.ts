import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
  navigationButton: { height: "100%", width: "48%" },
  navigationButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.grayscale.text.title,
    marginTop: 16,
  },
  isAddedToCampaignInfoContainer: {
    width: "100%",
    height: 62,
    borderRadius: 12,
    borderColor: Colors.secondary.surface.lighter,
    borderWidth: 1,
    padding: 16,
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
  },
  isAddedToCampaignTextContainer: { paddingLeft: 16, height: 36 },
  isAddedToCampaignHelperText: {
    fontSize: 10,
    color: Colors.grayscale.text.caption,
    lineHeight: 12,
  },
  isAddedToCampaignName: { fontSize: 16, fontWeight: "600", lineHeight: 18 },
  subtitle: {
    fontSize: 12,
    color: Colors.grayscale.text.subtitle,
    marginBottom: 16,
  },
});
