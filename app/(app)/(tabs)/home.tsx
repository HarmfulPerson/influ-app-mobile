import { View, Circle, Text } from "tamagui";
import Colors from "../../../constants/Colors";
import React, { useState } from "react";
import { Bell, LineChart, Megaphone, Users } from "lucide-react-native";
import Button from "../../components/Button/Button";
import { useAuthGetData } from "../../hooks/useGetData";
import { URL } from "../../../constants/urls";
import {
    FlatList,
    ActivityIndicator,
    ImageBackground,
    TouchableWithoutFeedback,
} from "react-native";
import useFilter from "../../hooks/useFilter";
import { parseObjectToUrlParams } from "../../../utils/utils";
import { Advertisement } from "../../types/advertisement";
import { RequestData } from "../../types/common";
import { Category } from "../../types/category";
import { SocialRange } from "../../types/social";
import { styles } from "./styles/home";
import { useSession } from "../../hooks/session/authenticationProvider";
import EachAdvertisementDashboard from "../../components/EachAdvertisementDashboard/EachAdvertisementDashboard";
import { router } from "expo-router";
import { returnUserImage } from "../../../utils/user";

const Index = () => {
    const { session } = useSession();

    const { page, updatePage, rowsPerPage } = useFilter();
    const { fetchData, isLoading } = useAuthGetData();
    const [displayData, setDisplayData] = useState<Array<Advertisement>>([]);
    const [displayOwnData, setDisplayOwnData] = useState<Array<Advertisement>>(
        []
    );
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
        handleFetchAllData();
        handleFetchOwnData();
    };

    const handleFetchAllData = () => {
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
            }
        );
    };

    const handleFetchOwnData = () => {
        fetchData<{ data: { count: number; rows: Array<Advertisement> } }>(
            `${URL.advertisement}/?${parseObjectToUrlParams({
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
                setDisplayOwnData(response.data.data.rows);
            }
        );
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

    const renderFooter = () => {
        if (!isLoading) return null;
        return <ActivityIndicator size="large" />;
    };

    const navigateToAdvertisement = () =>
        router.push({
            pathname: "/Advertisement",
        });

    return (
        <View
            style={styles.container}
            backgroundColor={Colors.grayscale.surface.darker}>
            <View style={styles.userBarContainer}>
                <ImageBackground
                    source={{
                        uri: returnUserImage(session.data.userData.avatarUrl),
                    }}
                    style={styles.avatar}
                    imageStyle={styles.imageAvatar}>
                    <Circle
                        width={60}
                        height={60}
                        borderWidth={2}
                        borderColor={Colors.primary.text.label}
                    />
                </ImageBackground>
                <View style={styles.welcomeMessageContainer}>
                    <Text style={styles.welcomeMessage}>Witaj w Suseu,</Text>
                    <Text style={styles.welcomeMessageUser}>
                        {session.data.userData.username}!
                    </Text>
                </View>
                <Button
                    text=""
                    variant="secondary"
                    iconAlign="left"
                    icon={
                        <Bell
                            width={16}
                            height={16}
                            color={Colors.grayscale.text.body}
                        />
                    }
                    style={styles.notificationsButton}
                />
            </View>
            <View style={styles.navigationContainer}>
                <View style={styles.navigationTile}>
                    <Text style={styles.navigationText}>Współprace</Text>
                    <Users
                        width={64}
                        height={64}
                        color={Colors.grayscale.surface.disabled}
                        style={styles.navigationIcon}
                    />
                </View>
                <View
                    onPress={() => navigateToAdvertisement()}
                    style={styles.navigationTile}>
                    <Text style={styles.navigationText}>Ogłoszenia</Text>
                    <Megaphone
                        width={64}
                        height={64}
                        color={Colors.grayscale.surface.disabled}
                        style={styles.navigationIcon}
                    />
                </View>
                <View style={styles.navigationTile}>
                    <Text style={styles.navigationText}>Raporty</Text>
                    <LineChart
                        width={64}
                        height={64}
                        color={Colors.grayscale.surface.disabled}
                        style={styles.navigationIcon}
                    />
                </View>
            </View>
            <View style={styles.advertisementTitleContainer}>
                <Text style={styles.advertisementTitle}>
                    Najnowsze ogłoszenia
                </Text>
                <TouchableWithoutFeedback
                    onPress={() => navigateToAdvertisement()}>
                    <Text style={styles.advertisementSeeAll}>
                        Zobacz wszystkie
                    </Text>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.flatListContainer}>
                {displayData && (
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={displayData}
                        horizontal
                        renderItem={EachAdvertisementDashboard}
                        keyExtractor={(item: Advertisement) => item.uid}
                        ListFooterComponent={renderFooter}
                    />
                )}
            </View>
            <View style={styles.advertisementTitleContainer}>
                <Text style={styles.advertisementTitle}>Moje ogłoszenia</Text>
                <Text style={styles.advertisementSeeAll}>Zobacz wszystkie</Text>
            </View>
            <View style={styles.flatListContainer}>
                {displayOwnData && (
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={displayOwnData}
                        horizontal
                        renderItem={EachAdvertisementDashboard}
                        keyExtractor={(item: Advertisement) => item.uid}
                        ListFooterComponent={renderFooter}
                    />
                )}
            </View>
        </View>
    );
};

export default Index;
