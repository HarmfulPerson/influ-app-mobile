import { RadioGroup, Text, View, YStack } from "tamagui";
import Background from "../common/background";
import { styles } from "../styles/startDate";
import Button from "../../../components/Button/Button";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import DateTimePicker from "../../../components/DatePicker/DatePicker";
import InfluencerIcon from "../../../../assets/images/influencer-icon.svg";
import AdvertiserIcon from "../../../../assets/images/advertiser-icon.svg";
import RadioButton from "../common/RadioButton";
import { navigateBack } from "../../../../utils/utils";

export default function StartDate() {
  const { advertisementCategories, title, description } =
    useLocalSearchParams();
  const [date, setDate] = useState(new Date());
  const [isPublishedByAdvertiser, setIsPublidhedByAdvertiser] =
    useState("true");

  const handleNavigateToNextPage = () => {
    const params = {
      advertisementCategories,
      title,
      description,
      date,
      isPublishedByAdvertiser,
    };
    router.push({ pathname: "addCollaboration/steps/socials", params });
  };

  const mainArea = (
    <View flex={1}>
      <Text style={styles.header}>Kiedy chcesz zacząć?</Text>
      <Text style={styles.subtitle}>Wybierz datę pierwszej publikacji</Text>
      <DateTimePicker
        type="date"
        date={date}
        minimumDate={date}
        confirmText="Potwierdzam"
        cancelText="Anuluj"
        onChange={setDate}
      />
      <Text style={{ marginTop: 24, fontSize: 24, fontWeight: "700" }}>
        Kto zajmie się publikacją materiałów
      </Text>
      <Text style={styles.subtitle}>
        Określ, kto będzie odpowiedzialny za publikację materiałów reklamowych.
      </Text>
      <RadioGroup
        value={isPublishedByAdvertiser}
        onValueChange={setIsPublidhedByAdvertiser}
      >
        <YStack gap={12}>
          <RadioButton
            setValue={setIsPublidhedByAdvertiser}
            radioValue="false"
            incomingValue={isPublishedByAdvertiser}
            firstRowText="Twórca"
            secondRowText="Tworca opublikuje materialy na swoich social media"
            Icon={InfluencerIcon}
          />
          <RadioButton
            setValue={setIsPublidhedByAdvertiser}
            radioValue="true"
            incomingValue={isPublishedByAdvertiser}
            firstRowText="Reklamodawca"
            secondRowText="Chce sam opublikować materiały"
            Icon={AdvertiserIcon}
          />
        </YStack>
      </RadioGroup>
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
        onPress={handleNavigateToNextPage}
        style={styles.navigationButton}
        text="Dalej"
      />
    </View>
  );

  return (
    <Background mainArea={mainArea} bottomArea={botttomArea} progress={40} />
  );
}
