import { View, Text, ScrollView, Button as TamaguiButton } from "tamagui";
import Background from "../common/Background";
import Button from "../../../components/Button/Button";
import { navigateBack } from "../../../../utils/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Platform } from "./PlatformAndInfluencerPick";
import ActivityDetails from "../common/ActivityDetails";
import { styles } from "../styles/activities";
import { KeyboardAvoidingView, Platform as SystemPlatform } from "react-native";
import useAuthPostData from "../../../hooks/usePostAuthData";
import { URL } from "../../../../constants/urls";
import { addDays, setHours, setMinutes, setSeconds } from "date-fns";
import CustomModal from "../../../components/ModalPopup/ModalPopup";
import { SocialCreateBody } from "../../../types/social";

export type Errors = {
  price?: string;
  livePeriod?: string;
  minimalAverageViewers?: string;
  expositionType?: string;
  isCocreated?: string;
  type?: string;
  platform?: string;
};

const CustomButton = forwardRef((props: any, ref) => {
  const handleClick = () => {
    if (props.onPress) {
      props.onPress();
    }
  };

  useImperativeHandle(ref, () => ({
    click: handleClick,
  }));

  return (
    <TamaguiButton
      style={{
        height: 0,
        width: 0,
        minWidth: 0,
        minHeight: 0,
      }}
      onPress={handleClick}
    />
  );
});

const Activities = () => {
  const { pickedCampaign, executorUid, platforms, title, description } = useLocalSearchParams();
  const { postData: createSocial } = useAuthPostData();
  const dummyButton = useRef<any>(null);
  const [platformsToComplete, setPlatformsToComplete] = useState<SocialCreateBody[]>(
    JSON.parse(platforms as string).flatMap((eachPlatform: Platform, index: number) => {
      return Array.from({ length: eachPlatform.numberOfPublications || 1 }, (_, i) => ({
        id: `${index}-${i}`,
        platform: eachPlatform.name,
        title,
        description,
        isCocreated: false,
        executorUid,
        publishDate: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 0), 0), 0),
        payment: {
          price: 0,
        },
        campaignUid: pickedCampaign,
      }));
    })
  );
  const activityRefs = useRef<React.RefObject<{ handleValidate: () => Promise<Errors> }>[]>([]);

  const handleAdd = async () => {
    const allErrors = await Promise.all(
      activityRefs.current.map(async (ref) => {
        if (ref && ref.current) {
          const errors = await ref.current.handleValidate();
          return errors;
        }
        return {};
      })
    );
    const hasErrors = allErrors.some((error: Record<string, string>) => Object.keys(error).length > 0);

    if (!hasErrors) {
      const result = await createSocial(`${URL.social}`, { socials: platformsToComplete });
      if (result?.status === 201) {
        dummyButton.current?.click();
      }
    }
  };

  const mainArea = (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Aktywności</Text>
      <Text style={styles.subtitle}>Uzupełnij szczegóły dotyczących aktywności na wybranych platformach</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {platformsToComplete.map((eachSocial: SocialCreateBody, index) => {
          const ref = useRef<{ handleValidate: () => Promise<Errors> }>(null);
          activityRefs.current[index] = ref;
          return (
            <View key={eachSocial.id}>
              <Text style={styles.platformTitle}>{eachSocial.platform}</Text>
              <ActivityDetails ref={ref} platform={eachSocial} setPlatformsToComplete={setPlatformsToComplete} />
            </View>
          );
        })}
      </ScrollView>
      <CustomModal triggerButton={<CustomButton ref={dummyButton} />} header="Współpraca dodana!" subHeader="Od teraz mozesz dodawac dokumenty oraz zmienic jej status!" buttonText="Wróć do strony głównej" buttonClick={() => router.navigate("/")} />
    </View>
  );
  const botttomArea = (
    <View style={styles.buttonsContainer}>
      <Button variant="secondary" onPress={navigateBack} style={styles.navigationButton} text="Wstecz" />
      <Button variant="primary" onPress={handleAdd} style={styles.navigationButton} text="Dodaj" />
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={SystemPlatform.OS === "ios" ? "padding" : undefined}>
      <Background mainArea={mainArea} bottomArea={botttomArea} progress={20} />
    </KeyboardAvoidingView>
  );
};
export default Activities;
