import { View, Text } from "tamagui";
import Colors from "../../../constants/Colors";
import EachAdvertisement from "../EachAdvertisement/EachAdvertisement";
import EachCooperation from "../EachCooperation/EachCooperation";
import { BlurView } from "@react-native-community/blur";
import SocialIcon from "../SocialIconParser";

const EachCampaign = (props: any) => {
  const test = [1, 2, 3, 4, 5];
  return (
    <View
      style={{
        backgroundColor: Colors.grayscale.surface.darker,
        borderWidth: 1,
        borderColor: Colors.grayscale.surface.default,
        borderRadius: 32,
        padding: 16,
        width: "98%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: Colors.grayscale.text.title,
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Kampania Ziomo
        </Text>
        <Text
          style={{
            color: Colors.grayscale.text.title,
            fontSize: 12,
          }}
        >
          4 współprace
        </Text>
      </View>
      <BlurView
        blurType="light"
        style={{
          height: 60,
          minWidth: "100%",
        }}
        overlayColor="transparent"
        blurAmount={10}
      >
        <View
          style={{
            flex: 1,
            borderColor: "red",
            borderWidth: 1,
            filter: "blur(10)",
          }}
        ></View>
      </BlurView>
      <BlurView
        blurType="light"
        style={{
          height: 60,
          minWidth: "100%",
          marginTop: -30,
        }}
        overlayColor="transparent"
        blurAmount={10}
      >
        <View
          style={{
            flex: 1,
            borderColor: "red",
            borderWidth: 1,
            filter: "blur(10)",
          }}
        ></View>
      </BlurView>
    </View>
  );
};

export default EachCampaign;
