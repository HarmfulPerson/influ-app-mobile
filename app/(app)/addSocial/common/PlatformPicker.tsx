import { ScrollView, Text, View } from "tamagui";
import { SOCIAL_TYPES } from "../../../../constants/Main";
import SocialIcon from "../../../components/SocialIconParser";
import Colors from "../../../../constants/Colors";
import { Dispatch, SetStateAction, useState } from "react";
import { Platform, PlatformAndInfluencer } from "../steps/PlatformAndInfluencerPick";
import { styles } from "../styles/platformAndInfluencerPick";
import Button from "../../../components/Button/Button";
import ModalNumberOfPublication from "./ModalNumberOfPublications";

type PlatformPickerProps = {
  setPlatformAndInfluencer: Dispatch<SetStateAction<PlatformAndInfluencer>>;
  platformAndInfluencer: PlatformAndInfluencer;
  closeModalPlatform: () => void;
};

const PlatformPicker = (props: PlatformPickerProps) => {
  const { platformAndInfluencer, setPlatformAndInfluencer, closeModalPlatform } = props;
  const [pickedPlatforms, setPickedPlatforms] = useState<Array<Platform>>(platformAndInfluencer.platforms);
  const [platformForModal, setPlatformForModal] = useState<Platform | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const handleClickPlatform = (platform: string) => {
  //   // Tworzymy kopię aktualnej tablicy platform
  //   let newPlatforms = [...pickedPlatforms];

  //   // Sprawdzamy, czy platforma już istnieje w tablicy
  //   const platformIndex = newPlatforms.findIndex((eachPlatform) => eachPlatform.name === platform);

  //   if (platformIndex !== -1) {
  //     // Jeśli platforma istnieje, usuwamy ją z tablicy
  //     newPlatforms = newPlatforms.filter((eachPlatform) => eachPlatform.name !== platform);
  //   } else {
  //     // Jeśli platforma nie istnieje, dodajemy ją do tablicy
  //     newPlatforms.push({ name: platform, numberOfPublications: 1 });
  //   }

  //   // Aktualizujemy stan
  //   setPickedPlatforms(newPlatforms);
  // };

  const handleSetPlatforms = () => {
    setPlatformAndInfluencer({
      ...platformAndInfluencer,
      platforms: pickedPlatforms,
    });
    closeModalPlatform();
  };
  const pickedPlatformsAsStrings = pickedPlatforms.map((eachPlatform: Platform) => eachPlatform.name);

  const handleClickPlatform = (social: string) => {
    const platformToPass = pickedPlatforms.find((platform: Platform) => platform.name === social) ?? { name: social, numberOfPublications: 1 };
    setPlatformForModal(platformToPass);
    setIsModalVisible(true);
  };

  const handleDeletePlatform = (platform: Platform) => {
    setPickedPlatforms(pickedPlatforms.filter((eachPlatform: Platform) => eachPlatform.name !== platform.name));
  };

  const handleAddPlatform = (platform: Platform) => {
    if (pickedPlatforms.some((eachPlatform: Platform) => eachPlatform.name === platform.name)) {
      setPickedPlatforms(
        pickedPlatforms.map((eachPlatform: Platform) => {
          if (eachPlatform.name === platform.name) {
            return { ...eachPlatform, numberOfPublications: platform.numberOfPublications };
          } else {
            return eachPlatform;
          }
        })
      );
    } else {
      setPickedPlatforms([...pickedPlatforms, platform]);
    }
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
          <View onPress={() => handleClickPlatform(social)} key={social} borderColor={pickedPlatformsAsStrings.includes(social) ? Colors.primary.border.lighter : Colors.grayscale.border.default} backgroundColor={Colors.grayscale.surface.darker} style={styles.sliderBottomSocialTile}>
            <SocialIcon social={social} width={40} height={40} fill={pickedPlatformsAsStrings.includes(social) ? Colors.primary.surface.subtle : Colors.grayscale.border.default} />
            <Text style={[styles.tileText]} color={pickedPlatformsAsStrings.includes(social) ? Colors.primary.surface.subtle : Colors.grayscale.border.default}>
              {social}
            </Text>
            {pickedPlatformsAsStrings.includes(social) && (
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: 45.5,
                  height: 13.5,
                  borderWidth: 1,
                  borderColor: Colors.primary.border.lighter,
                  backgroundColor: "transparent",
                  borderBottomWidth: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                }}
              >
                <Text style={{ fontSize: 10, lineHeight: 12, fontFamily: "PoppinsSemiBold", marginTop: 2 }}>{pickedPlatforms.find((platform: Platform) => platform.name === social)?.numberOfPublications}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <Button text="Zatwierdź" onPress={handleSetPlatforms} variant="primary" style={styles.submitButton}></Button>
      <ModalNumberOfPublication deletePlatform={handleDeletePlatform} setPlaform={setPlatformForModal} platform={platformForModal} isVisible={isModalVisible} setIsVisible={setIsModalVisible} addPlatform={handleAddPlatform} />
    </View>
  );
};

export default PlatformPicker;
