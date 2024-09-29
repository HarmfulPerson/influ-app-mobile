import { Dimensions } from "react-native";
import { View } from "tamagui";
import BackgroundSvg from "../../../../assets/images/register-background.svg";
import Colors from "../../../../constants/Colors";
import { ChevronLeft } from "lucide-react-native";
import { Button as TamaguiButton } from "tamagui";
import { router } from "expo-router";
import { styles } from "./styles";
import { navigateBack } from "../../../../utils/utils";
const { width, height } = Dimensions.get("window");
type Props = {
  dontDisplayLogo?: boolean;
  hasBackButton: boolean;
};
export default function NotLoggedBackground(props: Props) {
  const { dontDisplayLogo, hasBackButton } = props;
  return (
    <View style={styles.container}>
      {!dontDisplayLogo && (
        <BackgroundSvg width={width} height={height} fill="black" />
      )}
      {hasBackButton && (
        <TamaguiButton
          borderColor={Colors.grayscale.surface.subtle}
          onPress={navigateBack}
          style={styles.backButton}
        >
          <ChevronLeft color={Colors.grayscale.text.body} />
        </TamaguiButton>
      )}
      <View style={styles.smallLogo}>
        <BackgroundSvg
          width={40}
          height={40}
          fill={Colors.primary.surface.lighter}
        />
      </View>
    </View>
  );
}
