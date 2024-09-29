import { Text, View } from "tamagui";
import Background from "../common/background";
import { styles } from "../styles/filters";
import Button from "../../../components/Button/Button";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import FilterComponent from "../../../components/Filters/Filters";
import { navigateBack } from "../../../../utils/utils";

export default function Fiters() {
  const {
    advertisementCategories,
    title,
    description,
    date,
    isPublishedByAdvertiser,
    neededSocials,
  } = useLocalSearchParams();
  const [filter, setFilter] = useState({
    sexes: [],
    ageRange: [],
    socialRanges: [],
  });

  const handleSetFilter = (data: any) => {
    setFilter({
      sexes: data.sexes,
      ageRange: data.age,
      socialRanges: data.range,
    });
  };
  const canProceed = () =>
    filter.sexes.length && filter.ageRange.length && filter.socialRanges.length;

  const handleNavigateToNextPage = () => {
    router.push({
      pathname: "addCollaboration/steps/summary",
      params: {
        advertisementCategories,
        title,
        description,
        date,
        isPublishedByAdvertiser,
        neededSocials,
        sexes: filter.sexes,
        ageMin: filter.ageRange[0],
        ageMax: filter.ageRange[1],
        socialRanges: JSON.stringify(filter.socialRanges),
      },
    });
  };
  const mainArea = (
    <View flex={1}>
      <Text style={styles.header}>Kto jest Twoją grupą docelową?</Text>
      <Text style={styles.subtitle}>
        Określ demograficzne cechy grupy odbiorców, do których chcesz dotrzeć za
        pomocą swojej reklamy
      </Text>
      <FilterComponent onChange={(data) => handleSetFilter(data)} />
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
        onPress={() => handleNavigateToNextPage()}
        style={styles.navigationButton}
        text="Dalej"
      />
    </View>
  );

  return (
    <Background mainArea={mainArea} bottomArea={botttomArea} progress={80} />
  );
}
