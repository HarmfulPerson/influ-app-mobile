import { View, Button as TamaguiButton, ScrollView } from "tamagui";
import Colors from "../../../constants/Colors";
import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { FilterIcon, PlusIcon, Search } from "lucide-react-native";
import Button from "../../components/Button/Button";
import FilterModal from "../../components/FilterModal/FilterModal";
import { router, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthGetData } from "../../hooks/useGetData";
import { URL } from "../../../constants/urls";
import { FlatList, ActivityIndicator } from "react-native";
import useFilter from "../../hooks/useFilter";
import { parseObjectToUrlParams } from "../../../utils/utils";
import { Advertisement } from "../../types/advertisement";
import { RequestData } from "../../types/common";
import EachAdvertisement from "../../components/EachAdvertisement/EachAdvertisement";
import { Category } from "../../types/category";
import { SocialRange } from "../../types/social";
import FilterDisplayer from "../../components/FilterDisplayer/FilterDisplayer";
import { styles } from "./styles";

const MENU_TYPES = {
  advertisements: "advertisements",
  collaborations: "collaborations",
};

const Index = () => {
  const [menuItem, setMenuItem] = useState(MENU_TYPES.advertisements);
  const [count, setCount] = useState(0);

  const { page, updatePage, rowsPerPage } = useFilter();
  const { fetchData, isLoading } = useAuthGetData();
  const [displayData, setDisplayData] = useState<Array<Advertisement>>([]);
  const [pickedCategories, setPickedCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState<{
    sexes: Array<string>;
    ageRange: Array<number>;
    socialRanges: Array<SocialRange>;
    categories: Category[];
  }>({
    sexes: [],
    ageRange: [24, 60],
    socialRanges: [],
    categories: pickedCategories,
  });

  React.useEffect(() => {
    updatePage(1);
    handleFetchData();
  }, [filter]);

  const handleFetchData = () => {
    fetchData<{ data: { count: number; rows: Array<Advertisement> } }>(
      `${URL.advertisement}/all?${parseObjectToUrlParams({
        ...stringifyFilterData(),
        page: page.toString(),
        rowsPerPage: rowsPerPage.toString(),
      })}`
    ).then(
      (
        response: RequestData<{
          count: number;
          rows: Array<Advertisement>;
        }>
      ) => {
        setDisplayData(response.data.data.rows);
        setCount(response.data.data.count);
      }
    );
  };

  const handleReachEnd = async () => {
    if (count < rowsPerPage * page) return;
    updatePage(page + 1);
    const response: any = await fetchData<
      RequestData<{ count: number; rows: Array<Advertisement> }>
    >(
      `${URL.advertisement}/all?${parseObjectToUrlParams({
        ...stringifyFilterData(),
        page: (page + 1).toString(),
        rowsPerPage: rowsPerPage.toString(),
      })}`
    );
    if (response.status === 200) {
      updatePage(page + 1);
      setDisplayData([...displayData, ...response?.data.data.rows]);
    }
  };

  const stringifyFilterData = () => ({
    ...(filter.ageRange[0] !== undefined && {
      ageMin: `${filter.ageRange[0]}`,
    }),
    ...(filter.ageRange[1] !== undefined && {
      ageMax: `${filter.ageRange[1]}`,
    }),
    sexes: JSON.stringify(filter.sexes),
    ...(filter.socialRanges.length > 0 && {
      socialRanges: JSON.stringify(
        filter.socialRanges.map((socialRange: SocialRange) => socialRange.uid)
      ),
    }),
    ...(pickedCategories.length > 0 && {
      advertisementCategories: JSON.stringify(
        pickedCategories.map((category: Category) => category.uid)
      ),
    }),
  });

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" />;
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[Colors.primary.surface.lighter, Colors.primary.text.label]}
      start={{ y: 0.0, x: 1.0 }}
      end={{ y: 1.0, x: 0.0 }}
    >
      <View flex={1} alignItems="center">
        <View style={styles.topBarContainer}>
          <View style={styles.switchButtonsContainer}>
            <TamaguiButton
              onPress={() => setMenuItem(MENU_TYPES.advertisements)}
              backgroundColor={
                menuItem === MENU_TYPES.advertisements
                  ? Colors.grayscale.surface.subtle
                  : Colors.grayscale.surface.darker
              }
              style={styles.switchDisplayedContentButton}
            >
              Ogłoszenia
            </TamaguiButton>
            <TamaguiButton
              onPress={() => setMenuItem(MENU_TYPES.collaborations)}
              backgroundColor={
                menuItem === MENU_TYPES.collaborations
                  ? Colors.grayscale.surface.subtle
                  : Colors.grayscale.surface.darker
              }
              style={styles.switchDisplayedContentButton}
            >
              Współprace
            </TamaguiButton>
          </View>
          <View style={styles.searchInput}>
            <View style={styles.searchInputContainer}>
              <Input
                placeholder="Szukaj..."
                iconLeft={
                  <Search
                    width={16}
                    height={16}
                    color={Colors.grayscale.border.disabled}
                  />
                }
              />
            </View>
            <View style={styles.adddAdvertisementButtonCotnainer}>
              <Button
                variant="primary"
                text=""
                onPress={() =>
                  router.push({
                    pathname:
                      menuItem === MENU_TYPES.advertisements
                        ? "(app)/addCollaboration"
                        : "(app)/addSocial",
                  })
                }
                icon={
                  <PlusIcon
                    color={Colors.grayscale.text.negative}
                    width={20}
                    height={20}
                  />
                }
                iconAlign="left"
                style={styles.addAdvertisementButton}
              />
            </View>
          </View>
          {menuItem === MENU_TYPES.advertisements && (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScrollContainer}
            >
              <FilterModal
                filter={filter}
                setFilter={setFilter}
                pickedCategories={pickedCategories}
                setPickedCategories={setPickedCategories}
                triggerButton={
                  <Button
                    variant="secondary"
                    text=""
                    icon={
                      <FilterIcon
                        color={Colors.grayscale.text.body}
                        fill={Colors.grayscale.text.body}
                        width={16}
                        height={16}
                      />
                    }
                    iconAlign="left"
                    style={styles.iconFilter}
                  />
                }
              />
              <FilterDisplayer
                filters={{
                  ageMin: filter.ageRange[0],
                  ageMax: filter.ageRange[1],
                  advertisementSocialRanges: filter.socialRanges,
                  sexes: filter.sexes,
                  categories: pickedCategories,
                }}
              />
            </ScrollView>
          )}
        </View>
        {menuItem === MENU_TYPES.advertisements && (
          <View flex={1} style={styles.flatListContainer}>
            {displayData && (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={displayData}
                renderItem={EachAdvertisement}
                keyExtractor={(item: Advertisement) => item.uid}
                onEndReached={() => handleReachEnd()}
                ListFooterComponent={renderFooter}
              />
            )}
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default Index;
