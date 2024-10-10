import { View, Button as TamaguiButton, Text } from "tamagui";
import Colors from "../../../constants/Colors";
import React, { useState } from "react";
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
import { SectionList, SafeAreaView, FlatList, Animated } from "react-native";
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
import { router } from "expo-router";

const MENU_TYPES = {
    all: "all",
    own: "own",
};

const Advertisementa = () => {
    const [menuItem, setMenuItem] = useState(MENU_TYPES.all);
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
        console.log(count);
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

    const handleNavigateAddAdvertisement = () => {
        router.push("/addCollaboration");
    };

    const [scrollY] = useState(new Animated.Value(0)); // Track scroll position

    const hideTopBarThreshold = 110; // The point at which the top bar moves out of view

    // Interpolate the Y position of the top bar, so it slides off-screen
    const topBarTranslateY = scrollY.interpolate({
        inputRange: [0, hideTopBarThreshold],
        outputRange: [0, -hideTopBarThreshold], // Moves up as user scrolls
        extrapolate: "clamp",
    });

    // Interpolate the Y position of the searchContainer, so it sticks to the top
    const searchContainerTranslateY = scrollY.interpolate({
        inputRange: [0, hideTopBarThreshold],
        outputRange: [0, -hideTopBarThreshold], // Moves up into position as topBarContainer moves out
        extrapolate: "clamp",
    });

    const flatListPaddingTop = scrollY.interpolate({
        inputRange: [0, hideTopBarThreshold],
        outputRange: [0, 110], // Adjust padding dynamically
        extrapolate: "clamp",
    });
    return (
        <SafeAreaView style={{ ...styles.wrapper, flexGrow: 1 }}>
            <LinearGradient
                style={{ flex: 1 }}
                colors={[
                    Colors.primary.surface.darker,
                    Colors.primary.text.label,
                ]}
                start={{ y: 0.0, x: 1.0 }}
                end={{ y: 1.0, x: 0.0 }}>
                {/* The top bar, which will slide out of view when scrolling */}
                <Animated.View
                    style={{
                        ...styles.topBarContainer,
                        paddingBottom: 16,
                        transform: [{ translateY: topBarTranslateY }], // Slide out as we scroll
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
                            onPress={() => setMenuItem(MENU_TYPES.all)}
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
                            onPress={() => setMenuItem(MENU_TYPES.own)}
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
                </Animated.View>

                {/* Sticky search container that moves up and stays at the top */}
                <Animated.View
                    style={{
                        ...styles.searchContainer,
                        transform: [{ translateY: searchContainerTranslateY }], // Move it up as we scroll
                    }}>
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
                                                color={
                                                    Colors.grayscale.text.body
                                                }
                                            />
                                        }
                                        iconAlign="left"
                                    />
                                }
                            />
                        </View>
                    </View>
                </Animated.View>

                <Animated.View
                    style={{
                        transform: [{ translateY: searchContainerTranslateY }], // Move it up as we scroll
                    }}>
                    <Animated.FlatList
                        keyExtractor={(item: Advertisement) => item.uid}
                        renderItem={EachAdvertisement}
                        data={[...displayData, ...displayData]}
                        contentContainerStyle={{
                            transform: [
                                { translateY: searchContainerTranslateY },
                            ], // Move it up as we scroll
                        }}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: { y: scrollY },
                                    },
                                },
                            ],
                            { useNativeDriver: false } // Use native driver for better performance
                        )}
                    />
                </Animated.View>
            </LinearGradient>
            <AddButtonList onButtonClick={handleNavigateAddAdvertisement} />
        </SafeAreaView>
    );
};

export default Advertisementa;
