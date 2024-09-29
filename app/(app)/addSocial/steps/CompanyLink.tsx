import {
  RadioGroup,
  Text,
  View,
  YStack,
  Button as TamaguiButton,
  Input,
} from "tamagui";
import Colors from "../../../../constants/Colors";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import RadioButton from "../../addCollaboration/common/RadioButton";
import { Search } from "lucide-react-native";
import { styles } from "../styles/companyLink";
import ModalMechanism from "../../../components/ModalMechanism/ModalMechanism";
import Background from "../common/Background";
import DropdownBottom from "../common/dropdownBottom";
import CompanyLinkCampaignDropdown from "../common/CompnyLinkCampaignDropdown";
import { navigateBack } from "../../../../utils/utils";
import { router } from "expo-router";

const CompanyLink = () => {
  const [isAddedToCampaign, setIsAddedToCampaign] = useState("true");
  const [isOpenCampaignModal, setIsOpenCampaignModal] = useState(false);
  const openModalCampaing = () => setIsOpenCampaignModal(true);
  const closeModalCampaign = () => setIsOpenCampaignModal(false);
  const [pickedCampaign, setPickedCampaign] = useState<string | null>(null);

  const canProceed = () => {
    if (isAddedToCampaign === "true" && pickedCampaign) {
      return true;
    } else if (isAddedToCampaign === "false" && !pickedCampaign) {
      return true;
    } else {
      return false;
    }
  };

  const handleNavigateNext = () => {
    router.push({
      pathname: "addSocial/steps/PlatformAndInfluencerPick",
      params: {
        pickedCampaign,
      },
    });
  };

  const mainArea = (
    <View flex={1}>
      <Text style={styles.title}>
        Czy chcesz powiązać te współpracę z istniejącą kampanią?
      </Text>
      <Text style={styles.subtitle}>
        Jezeli tak, wyszukaj odpowiednia kampanie, a nastepnie kliknij przycisk
        dodaj
      </Text>
      <RadioGroup
        value={isAddedToCampaign}
        onValueChange={setIsAddedToCampaign}
      >
        <YStack gap={12}>
          <RadioButton
            setValue={setIsAddedToCampaign}
            radioValue="true"
            incomingValue={isAddedToCampaign}
            firstRowText="Tak"
            secondRowText="Chcę dodać współpracę do mojej kampanii"
          />
          <RadioButton
            setValue={(value: string) => {
              setPickedCampaign(null);
              setIsAddedToCampaign(value);
            }}
            radioValue="false"
            incomingValue={isAddedToCampaign}
            firstRowText="Nie"
            secondRowText="Wybieram pojedyńczą współpracę"
          />
        </YStack>
      </RadioGroup>
      {isAddedToCampaign === "true" && (
        <>
          <View style={styles.campaingContainer}>
            <Text style={styles.campaignTitle}>Kampania</Text>
          </View>
          <ModalMechanism
            open={isOpenCampaignModal}
            setOpen={setIsOpenCampaignModal}
            triggerButton={
              <TamaguiButton
                style={styles.searchButton}
                borderWidth={1}
                onPress={openModalCampaing}
                borderColor={Colors.grayscale.surface.default}
              >
                <Input
                  borderWidth={0}
                  placeholder="Wybierz kampanie"
                  style={{ flex: 1 }}
                  onPressIn={openModalCampaing}
                  editable={false}
                  value={pickedCampaign ? pickedCampaign : undefined}
                  backgroundColor={Colors.grayscale.surface.darker}
                  borderColor={Colors.grayscale.surface.default}
                ></Input>
                <View style={styles.searchIconContainer}>
                  <Search size={12} color={Colors.grayscale.text.body} />
                </View>
              </TamaguiButton>
            }
            children={
              <DropdownBottom
                closeModal={closeModalCampaign}
                children={
                  <CompanyLinkCampaignDropdown
                    setPickedCampaign={setPickedCampaign}
                    pickedCampaign={pickedCampaign}
                  />
                }
              />
            }
          />
        </>
      )}
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
        disabled={!canProceed()}
        onPress={handleNavigateNext}
        style={styles.navigationButton}
        text="Dalej"
      />
    </View>
  );
  return (
    <Background mainArea={mainArea} bottomArea={botttomArea} progress={20} />
  );
};

export default CompanyLink;
