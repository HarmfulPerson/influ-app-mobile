import { Text, View, Button as TamaguiButton } from "tamagui";
import Background from "../common/background";
import { styles } from "../styles/socials";
import Button from "../../../components/Button/Button";
import { router, useLocalSearchParams } from "expo-router";
import Colors from "../../../../constants/Colors";
import { SOCIAL_TYPES } from "../../../../constants/Main";
import { useState } from "react";
import { navigateBack } from "../../../../utils/utils";
export default function Socials() {
  const {
    advertisementCategories,
    title,
    description,
    date,
    isPublishedByAdvertiser,
  } = useLocalSearchParams();
  const [pickedPlatforms, setPickedPlatforms] = useState<Array<string>>([]);

  const handleClickPlatform = (clickedPlatform: string) => {
    if (pickedPlatforms.includes(clickedPlatform))
      return setPickedPlatforms(
        pickedPlatforms.filter(
          (platform: string) => platform !== clickedPlatform
        )
      );

    setPickedPlatforms([...pickedPlatforms, clickedPlatform]);
  };

  const navigateNextPage = () => {
    router.push({
      pathname: "addCollaboration/steps/filters",
      params: {
        advertisementCategories,
        title,
        description,
        date,
        isPublishedByAdvertiser,
        neededSocials: pickedPlatforms,
      },
    });
  };
  const mainArea = (
    <View flex={1}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: Colors.grayscale.text.title,
        }}
      >
        Na jakich platformach chcesz, aby pojawila sie publikacja?
      </Text>
      <Text
        style={{
          fontSize: 12,
          marginTop: 8,
          color: Colors.grayscale.text.subtitle,
        }}
      >
        Wybierz social media klikajac na wybrana nazwe
      </Text>
      <View style={styles.container}>
        {Object.values(SOCIAL_TYPES).map((social, index) => (
          <View
            key={social}
            style={[
              styles.buttonContainer,
              index % 2 === 0 ? styles.leftButton : styles.rightButton,
            ]}
          >
            <Button
              style={styles.button}
              onPress={() => handleClickPlatform(social)}
              variant={
                pickedPlatforms.includes(social) ? "primary" : "secondary"
              }
              text={social.toUpperCase()}
            />
          </View>
        ))}
      </View>
    </View>
  );

  const botttomArea = (
    <View style={styles.navigationButtonsContainer}>
      <Button
        variant="secondary"
        onPress={navigateBack}
        style={styles.navigationButton}
        text="Wstecz"
      />
      <Button
        variant="primary"
        disabled={!pickedPlatforms.length}
        onPress={() => navigateNextPage()}
        style={styles.navigationButton}
        text="Dalej"
      />
    </View>
  );

  return (
    <Background mainArea={mainArea} bottomArea={botttomArea} progress={60} />
  );
}
