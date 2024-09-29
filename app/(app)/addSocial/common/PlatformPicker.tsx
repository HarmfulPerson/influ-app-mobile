import { ScrollView, Text, View } from "tamagui";
import { SOCIAL_TYPES } from "../../../../constants/Main";
import SocialIcon from "../../../components/SocialIconParser";
import Colors from "../../../../constants/Colors";
import { Dispatch, SetStateAction, useState } from "react";
import { PlatformAndInfluencer } from "../steps/PlatformAndInfluencerPick";
import { styles } from "../styles/platformAndInfluencerPick";
import Button from "../../../components/Button/Button";

type PlatformPickerProps = {
  setPlatformAndInfluencer: Dispatch<SetStateAction<PlatformAndInfluencer>>;
  platformAndInfluencer: PlatformAndInfluencer;
  closeModalPlatform: () => void;
};

const PlatformPicker = (props: PlatformPickerProps) => {
  const {
    platformAndInfluencer,
    setPlatformAndInfluencer,
    closeModalPlatform,
  } = props;
  const [pickedPlatforms, setPickedPlatforms] = useState<Array<string>>(
    platformAndInfluencer.platforms
  );
  const handleClickPlatform = (platform: string) => {
    let newPlatforms = [...pickedPlatforms];
    if (newPlatforms.includes(platform)) {
      newPlatforms = newPlatforms.filter(
        (eachPlatform: string) => eachPlatform !== platform
      );
    } else {
      newPlatforms.push(platform);
    }
    setPickedPlatforms(newPlatforms);
  };

  const handleSetPlatforms = () => {
    setPlatformAndInfluencer({
      ...platformAndInfluencer,
      platforms: pickedPlatforms,
    });
    closeModalPlatform();
  };

  return (
    <View flex={1}>
      <View style={styles.sliderBottomTitle}>
        <Text style={styles.sliderBottomTitle} textAlign="left">
          Wybierz platformę
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.sliderBottomContainer}>
        {Object.values(SOCIAL_TYPES).map((social) => (
          <View
            onPress={() => handleClickPlatform(social)}
            key={social}
            backgroundColor={
              pickedPlatforms.includes(social)
                ? Colors.primary.surface.lighter
                : Colors.grayscale.surface.darker
            }
            style={styles.sliderBottomSocialTile}
          >
            <SocialIcon
              social={social}
              width={40}
              height={40}
              fill={
                pickedPlatforms.includes(social)
                  ? Colors.grayscale.text.negative
                  : Colors.grayscale.border.default
              }
            />
            <Text
              style={[styles.tileText]}
              color={
                pickedPlatforms.includes(social)
                  ? Colors.grayscale.text.negative
                  : Colors.grayscale.border.default
              }
            >
              {social}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Button
        text="Zatwierdź"
        onPress={handleSetPlatforms}
        variant="primary"
        style={styles.submitButton}
      ></Button>
    </View>
  );
};

export default PlatformPicker;
