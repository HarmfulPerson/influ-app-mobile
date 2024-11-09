import CustomFlatList from "../../components/FlatList/customFlatList";
import { View, Button as TamaguiButton, Text } from "tamagui";
import Colors from "../../../constants/Colors";
import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import {
    Briefcase,
    ChevronLeft,
    FilterIcon,
    Search,
    Tag,
} from "lucide-react-native";
import { useAuthGetData } from "../../hooks/useGetData";
import { URL } from "../../../constants/urls";
import { Platform } from "react-native";
import useFilter from "../../hooks/useFilter";
import { navigateBack, parseObjectToUrlParams } from "../../../utils/utils";
import { Advertisement } from "../../types/advertisement";
import { RequestData } from "../../types/common";
import EachAdvertisement from "../../components/EachAdvertisement/EachAdvertisement";
import { Category } from "../../types/category";
import { SocialRange } from "../../types/social";
import { styles } from "./styles/advertisement";
import Button from "../../components/Button/Button";
import FilterModal from "../../components/FilterModal/FilterModal";
import { LinearGradient } from "expo-linear-gradient";
import AddButtonList from "../../components/AddButtonList/AddButtonList";
import {
    useSafeAreaInsets,
    SafeAreaView,
} from "react-native-safe-area-context";
import SkeletonLoader from "../../components/Skeletons/Advertisement";
import { router } from "expo-router";

const MENU_TYPES = {
    all: "all",
    own: "own",
};

export default function App() {
    const [menuItem, setMenuItem] = useState(MENU_TYPES.all);
    const { page, updatePage, rowsPerPage } = useFilter();
    const insets = useSafeAreaInsets();
    const { fetchData, isLoading } = useAuthGetData();
    const [count, setCount] = useState<number | null>(null);
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
    const [changesList, setChangesList] = useState(MENU_TYPES.all);

    useEffect(() => {
        const handler = setTimeout(() => {
            setChangesList(
                menuItem === MENU_TYPES.all ? MENU_TYPES.all : MENU_TYPES.own
            );
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [menuItem]);

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
        if (!count) return;
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
                filter.socialRanges.map(
                    (socialRange: SocialRange) => socialRange.uid
                )
            ),
        }),
        ...(pickedCategories.length > 0 && {
            advertisementCategories: JSON.stringify(
                pickedCategories.map((category: Category) => category.uid)
            ),
        }),
    });

    const handleChangeMenuItem = (menuItem: string) => {
        setMenuItem(menuItem);
    };

    const HeaderComponent = (
        <View
            style={{
                ...styles.topBarContainer,
                paddingBottom: 16,
            }}>
            <View style={styles.titleContainer}>
                <TamaguiButton
                    borderColor={Colors.grayscale.surface.subtle}
                    style={styles.backButton}>
                    <ChevronLeft color={Colors.grayscale.text.body} />
                </TamaguiButton>
                <Text onPress={navigateBack} style={styles.title}>
                    OGŁOSZENIA
                </Text>
            </View>
            <View style={styles.switchButtonsContainer}>
                <TamaguiButton
                    onPress={() => handleChangeMenuItem(MENU_TYPES.all)}
                    backgroundColor={
                        menuItem === MENU_TYPES.all
                            ? Colors.grayscale.surface.darker
                            : Colors.grayscale.surface.default
                    }
                    style={styles.switchDisplayedContentButton}>
                    <Tag
                        width={16}
                        height={16}
                        color={
                            menuItem === MENU_TYPES.all
                                ? Colors.primary.surface.lighter
                                : Colors.grayscale.text.disabled
                        }
                    />
                    <Text
                        color={Colors.grayscale.text.caption}
                        style={
                            menuItem === MENU_TYPES.all
                                ? styles.pickedText
                                : styles.unpickedText
                        }
                        fontSize={12}>
                        Giełda ogłoszeń
                    </Text>
                </TamaguiButton>
                <TamaguiButton
                    onPress={() => handleChangeMenuItem(MENU_TYPES.own)}
                    backgroundColor={
                        menuItem === MENU_TYPES.own
                            ? Colors.grayscale.surface.darker
                            : Colors.grayscale.surface.default
                    }
                    style={styles.switchDisplayedContentButton}>
                    <Briefcase
                        width={16}
                        height={16}
                        color={
                            menuItem === MENU_TYPES.own
                                ? Colors.primary.surface.lighter
                                : Colors.grayscale.text.disabled
                        }
                    />
                    <Text
                        color={Colors.grayscale.text.caption}
                        style={
                            menuItem === MENU_TYPES.own
                                ? styles.pickedText
                                : styles.unpickedText
                        }
                        fontSize={12}>
                        Moje ogłoszenia
                    </Text>
                </TamaguiButton>
            </View>
            <View style={styles.darkShutter}></View>
        </View>
    );

    const StickyElement = (
        <View style={styles.stickyHeaderContainer}>
            <View style={styles.searchContainer}>
                <View style={{ width: "80%" }}>
                    <Input
                        placeholder="Szukaj..."
                        styleInput={styles.searchInput}
                        iconLeft={
                            <Search
                                width={16}
                                strokeWidth={3}
                                height={16}
                                color={Colors.grayscale.border.disabled}
                            />
                        }
                    />
                </View>
                <View style={styles.searchIconContainer}>
                    <View style={styles.searchIcon}>
                        <FilterModal
                            filter={filter}
                            setFilter={setFilter}
                            pickedCategories={pickedCategories}
                            setPickedCategories={setPickedCategories}
                            triggerButton={
                                <Button
                                    variant="secondary"
                                    text=""
                                    style={styles.filterButton}
                                    icon={
                                        <FilterIcon
                                            width={16}
                                            height={16}
                                            color={Colors.grayscale.text.body}
                                        />
                                    }
                                    iconAlign="left"
                                />
                            }
                        />
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView edges={["top"]} style={styles.container}>
            <LinearGradient
                style={styles.gradientStyle}
                colors={["#9B3DFF", "#FE34F4", "#9B3DFF"]}
                locations={[0, 0.5, 1]}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.8, y: 1 }}>
                {typeof count === "number" ? (
                    <CustomFlatList<Advertisement>
                        onEndReached={handleReachEnd}
                        data={menuItem === MENU_TYPES.all ? displayData : []}
                        shouldUseSpinner={changesList !== menuItem}
                        changesList={changesList}
                        style={{
                            paddingBottom:
                                Platform.OS === "android"
                                    ? 80 + insets.bottom
                                    : 12 + insets.bottom,
                        }}
                        renderItem={EachAdvertisement}
                        HeaderComponent={HeaderComponent}
                        StickyElementComponent={StickyElement}
                    />
                ) : (
                    <SkeletonLoader />
                )}
                <AddButtonList
                    onButtonClick={() => router.push("/addSocial")}
                />
            </LinearGradient>
        </SafeAreaView>
    );
}
