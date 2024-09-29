import { Text, View, Button as TamaguiButton } from "tamagui";
import Button from "../../../components/Button/Button";
import { navigateBack } from "../../../../utils/utils";
import Background from "../common/Background";
import { styles } from "../styles/titleAndDescription";
import { router, useLocalSearchParams } from "expo-router";
import { Info } from "lucide-react-native";
import Colors from "../../../../constants/Colors";
import Input from "../../../components/Input/Input";
import CustomTextArea from "../../../components/TextArea/TextArea";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import * as yup from "yup";
import { validate } from "../../../../utils/yup";
import useAuthPostData from "../../../hooks/usePostAuthData";
import { URL } from "../../../../constants/urls";
import CustomModal from "../../../components/ModalPopup/ModalPopup";

type DescriptionData = {
  title: string;
  description: string;
};

const descriptionSchema = yup.object().shape({
  description: yup
    .string()
    .min(3, "Opis powinien mieć conajmniej 3 znaki")
    .required("Opis jest wymagany"),
  title: yup
    .string()
    .min(3, "Tytuł powinien mieć conajmniej 3 znaki")
    .required("Tytuł jest wymagany"),
});

const TitleAndDescription = () => {
  const { pickedCampaign, user, platforms } = useLocalSearchParams();
  const { postData: createSocial } = useAuthPostData();
  const dummyButton = useRef<any>(null);

  const [descriptionData, setDescriptionData] = useState<DescriptionData>({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<{
    description?: string;
    title?: string;
  }>({});

  const handleAddSocial = async () => {
    const errors = await validate(descriptionSchema, descriptionData);
    if (Object.values(errors).length) return setErrors(errors);

    try {
      const response = await createSocial(URL.social, {
        ...descriptionData,
        platform: JSON.parse(platforms as string)[0],
        invitedUserUid: user,
      });

      if (response?.status === 200) dummyButton.current?.click();
    } catch (err) {
      console.log(err);
    }
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

  const mainArea = (
    <View flex={1}>
      {!!pickedCampaign && (
        <View style={styles.isAddedToCampaignInfoContainer}>
          <Info
            width={24}
            height={24}
            color={Colors.secondary.surface.lighter}
          />
          <View style={styles.isAddedToCampaignTextContainer}>
            <Text style={styles.isAddedToCampaignHelperText}>
              Ta wspolpraca bedzie nalezec do kampanii:
            </Text>
            <Text style={styles.isAddedToCampaignName}>{pickedCampaign}</Text>
          </View>
        </View>
      )}
      <Text style={styles.title}>Podaj nazwę współpracy</Text>
      <Text style={styles.subtitle}>
        Wymyśl odpowiednią nazwę dla współpracy
      </Text>
      <Input
        label="Tytuł"
        value={descriptionData.title}
        error={!!errors.title}
        infoMessage={errors.title}
        onChangeText={(text) =>
          setDescriptionData({
            ...descriptionData,
            title: text,
          })
        }
        placeholder="Podaj nazwe wspólpracy"
      />
      <CustomTextArea
        label="Opis"
        placeholder="Wprowadź opis..."
        value={descriptionData.description}
        onChangeText={(text) =>
          setDescriptionData({
            ...descriptionData,
            description: text,
          })
        }
        error={!!errors.description}
        infoMessage={errors.description}
        style={{ flex: 1 }}
      />
      <CustomModal
        triggerButton={<CustomButton ref={dummyButton} />}
        header="Współpraca dodana!"
        subHeader="Od teraz mozesz dodawać dokumenty oraz zmienić jej status"
        buttonText="Wróć do strony głównej"
        buttonClick={() => router.navigate("/")}
      />
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
        onPress={handleAddSocial}
        variant="primary"
        style={styles.navigationButton}
        text="Dodaj"
      />
    </View>
  );

  return (
    <Background mainArea={mainArea} bottomArea={botttomArea} progress={40} />
  );
};

export default TitleAndDescription;
