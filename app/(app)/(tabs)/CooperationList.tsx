import CustomFlatList from "../../components/FlatList/customFlatList";
import { View, Button as TamaguiButton, Text } from "tamagui";
import Colors from "../../../constants/Colors";
import React, { useCallback, useRef, useState } from "react";
import Input from "../../components/Input/Input";
import { ChevronLeft, FilterIcon, Search } from "lucide-react-native";
import { useAuthGetData } from "../../hooks/useGetData";
import { URL } from "../../../constants/urls";
import { Platform, TextInput } from "react-native";
import useFilter from "../../hooks/useFilter";
import { debounce, navigateBack, parseObjectToUrlParams } from "../../../utils/utils";
import { RequestData } from "../../types/common";
import { Category } from "../../types/category";
import { Social, SocialRange } from "../../types/social";
import { styles } from "./styles/advertisement";
import Button from "../../components/Button/Button";
import FilterModal from "../../components/FilterModal/FilterModal";
import { LinearGradient } from "expo-linear-gradient";
import AddButtonList from "../../components/AddButtonList/AddButtonList";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Campaign } from "../../types/campaign";
import EachCampaignOrCooperation from "../../components/EachCampaignOrCooperation/EachCampaignOrCooperation";
import { AxiosResponse } from "axios";
import SkeletonCooperationList from "../../components/Skeletons/Cooperation";

export default function CooperationList() {
  const { page: campaignsPage, updatePage: updateCampaignPage, rowsPerPage: rowsPerPageCampaigns } = useFilter();
  const { page: socialsPage, updatePage: updateSocialsPage, rowsPerPage: rowsPerPageSocials } = useFilter();
  const insets = useSafeAreaInsets();
  const { fetchData, isLoading } = useAuthGetData();
  const [campaignsCount, setCampaignsCount] = useState<number | null>(null);
  const [socialsCount, setSocialsCount] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState<Array<Campaign | Social>>([]);
  const [pickedCategories, setPickedCategories] = useState<Category[]>([]);
  const inputSearch = useRef<TextInput>(null);
  const [filter, setFilter] = useState<{
    sexes: Array<string>;
    ageRange: Array<number>;
    socialRanges: Array<SocialRange>;
    categories: Category[];
    search: string;
  }>({
    sexes: [],
    ageRange: [24, 60],
    socialRanges: [],
    categories: pickedCategories,
    search: "",
  });

  React.useEffect(() => {
    handleUpdateFilter();
  }, [filter]);

  const handleUpdateFilter = async () => {
    updateSocialsPage(1);
    updateCampaignPage(1);
    await handleFetchData();
    if (inputSearch.current) {
      inputSearch.current.setNativeProps({ text: filter.search });
    }
  };

  const handleFetchData = async () => {
    const socials = await handleFetchCampaignOrSocial<Social>(URL.social, socialsPage, rowsPerPageSocials);
    setDisplayData(socials.data.data.rows);
    setSocialsCount(socials.data.data.count);
    setIsSearching(false);
  };

  const handleReachEnd = async () => {
    // await handleReachEndCampaigns();
    await handleReachEndSocials();
  };

  const handleReachEndCampaigns = async (): Promise<boolean> => {
    if (!campaignsCount) return false;
    if (campaignsCount < rowsPerPageCampaigns * campaignsPage) return false;

    const response: any = await handleFetchCampaignOrSocial<Campaign>(`${URL.campaigns}/own`, campaignsPage + 1, rowsPerPageCampaigns);
    if (response.status === 200) {
      updateCampaignPage(campaignsPage + 1);
      setDisplayData([...displayData, ...response?.data.data.rows]);
      return true;
    }

    return false;
  };

  const handleReachEndSocials = async (): Promise<boolean> => {
    if (!socialsCount) return false;
    if (socialsCount < rowsPerPageSocials * socialsPage) return false;

    const response: any = await handleFetchCampaignOrSocial<Social>(URL.social, socialsPage + 1, rowsPerPageSocials);
    if (response.status === 200) {
      updateSocialsPage(socialsPage + 1);
      setDisplayData([...displayData, ...response?.data.data.rows]);
      return true;
    }

    return false;
  };

  const stringifyFilterData = () => ({
    ...(filter.search.length && {
      search: `${filter.search}`,
    }),
  });

  const handleDebounceSearch = useCallback(
    debounce((value: string) => {
      setFilter({ ...filter, search: value });
    }),
    []
  );

  const handleSearchInputChange = (text: string) => {
    setIsSearching(true);
    setDisplayData([]);
    handleDebounceSearch(text);
  };

  async function handleFetchCampaignOrSocial<T>(url: string, pageToFetch: number, rowsPerPage: number): Promise<AxiosResponse> {
    return fetchData<RequestData<{ count: number; rows: Array<T> }>>(
      `${url}/own?${parseObjectToUrlParams({
        ...stringifyFilterData(),
        page: pageToFetch.toString(),
        rowsPerPage: rowsPerPage.toString(),
      })}`
    );
  }

  const HeaderComponent = (
    <View style={styles.topBarContainer}>
      <View style={styles.titleContainer}>
        <TamaguiButton borderColor={Colors.grayscale.surface.subtle} style={styles.backButton}>
          <ChevronLeft color={Colors.grayscale.text.body} />
        </TamaguiButton>
        <Text onPress={navigateBack} style={styles.title}>
          WSPÓŁPRACE
        </Text>
      </View>
      <View style={styles.darkShutter}></View>
    </View>
  );

  const StickyElement = (
    <View style={styles.stickyHeaderContainer}>
      <View style={styles.searchContainer}>
        <View style={{ width: "80%" }}>
          <Input placeholder="Szukaj..." styleInput={styles.searchInput} ref={inputSearch} onChangeText={handleSearchInputChange} iconLeft={<Search width={16} strokeWidth={3} height={16} color={Colors.grayscale.border.disabled} />} />
        </View>
        <View style={styles.searchIconContainer}>
          <View style={styles.searchIcon}>
            <FilterModal
              filter={filter}
              setFilter={setFilter}
              pickedCategories={pickedCategories}
              setPickedCategories={setPickedCategories}
              triggerButton={<Button variant="secondary" text="" style={styles.filterButton} icon={<FilterIcon width={16} height={16} color={Colors.grayscale.text.body} />} iconAlign="left" />}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <LinearGradient style={styles.gradientStyle} colors={["#9B3DFF", "#FE34F4", "#9B3DFF"]} locations={[0, 0.5, 1]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }}>
        {typeof socialsCount === "number" ? (
          <CustomFlatList<Campaign | Social>
            onEndReached={handleReachEnd}
            data={displayData}
            shouldUseSpinner={isSearching}
            changesList={JSON.stringify(displayData)}
            style={{
              paddingBottom: Platform.OS === "android" ? 80 + insets.bottom : 12 + insets.bottom,
            }}
            renderItem={EachCampaignOrCooperation}
            HeaderComponent={HeaderComponent}
            StickyElementComponent={StickyElement}
          />
        ) : (
          <SkeletonCooperationList />
        )}
        <AddButtonList onButtonClick={() => router.push("/addSocial")} />
      </LinearGradient>
    </SafeAreaView>
  );
}
