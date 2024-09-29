import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
  submitButton: {
    width: "100%",
    height: 56,
    borderWidth: 0,
    marginTop: 12,
    alignSelf: "flex-end",
    marginBottom: 24,
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
  pickPlatformContainer: { width: "100%" },
  title: {
    fontSize: 24,
    color: Colors.grayscale.text.title,
    fontWeight: "700",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.grayscale.text.subtitle,
  },
  pickInfluencerContainer: { width: "100%", marginTop: 40 },
  navigationButton: { height: "100%", width: "48%" },
  navitionButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  searchButton: {
    borderRadius: 12,
    backgroundColor: Colors.grayscale.surface.darker,
    minHeight: 60,
    marginTop: 6,
  },
  searchIconContainer: {
    width: 16,
    height: 16,
    backgroundColor: Colors.grayscale.surface.subtle,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderBottomContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  sliderBottomTitle: {
    fontSize: 24,
    fontWeight: "700",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  sliderBottomInfluencerTitle: {
    fontSize: 24,
    fontWeight: "700",
    justifyContent: "flex-start",
  },
  sliderBottomSocialTile: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    height: 119,
    width: "46%",
    alignItems: "center",
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayscale.surface.default,
    justifyContent: "center",
    marginBottom: 8,
  },
  tileText: {
    fontSize: 12,
    marginTop: 4,
    textTransform: "capitalize",
  },
});
