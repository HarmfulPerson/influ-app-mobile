import { Text, View } from "tamagui";
import { styles } from "../../(app)/addSocial/styles/platformAndInfluencerPick";
import { styles as influencerPickerStyles } from "./styles";
import { Search, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { AxiosResponse } from "axios";
import FlatListUserItem from "../FlatListUserItem/FlatListUserItem";
import { User } from "../../types/user";
import { URL } from "../../../constants/urls";
import { RequestData } from "../../types/common";
import { parseObjectToUrlParams } from "../../../utils/utils";
import { useAuthGetData } from "../../hooks/useGetData";
import useFilter from "../../hooks/useFilter";
import Input from "../Input/Input";
import Colors from "../../../constants/Colors";
import ListEmptyComponent from "./ListEmptyComponent";

type InfluencerPickerProps = {
    handleButtonClick: (user: User) => void | Promise<void>;
    invitedInfluencers: Array<string>;
    displayEmptyListComponent: boolean;
};

const InfluencerPicker = (props: InfluencerPickerProps) => {
    const {
        handleButtonClick,
        invitedInfluencers,
        displayEmptyListComponent = false,
    } = props;
    const { page, updatePage, rowsPerPage } = useFilter();
    const { fetchData } = useAuthGetData();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [influencersToPick, setInfluencersToPick] = useState<Array<User>>([]);
    const handleChangeInput = (text: string): void => {
        setSearchText(text);
    };
    const [count, setCount] = useState(0);
    const handleFetchData = () => {
        fetchData<{
            data: { count: number; rows: Array<User> };
        }>(
            `${URL.user}/influencers?${parseObjectToUrlParams({
                ...stringifyFilterData(),
                page: page.toString(),
                rowsPerPage: rowsPerPage.toString(),
            })}`
        )
            .then(
                (
                    response: RequestData<{
                        count: number;
                        rows: Array<User>;
                    }>
                ) => {
                    setInfluencersToPick(response.data.data.rows);
                    setCount(response.data.data.count);
                }
            )
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        setIsLoading(true);
        setInfluencersToPick([]);
        const timer = setTimeout(() => {
            if (searchText.length !== 0) {
                handleFetchData();
            } else if (searchText.length === 0) {
                setInfluencersToPick([]);
            }
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchText]);

    const handleReachEnd = async () => {
        if (count < rowsPerPage * page) return;
        updatePage(page + 1);
        const response: AxiosResponse = await fetchData<
            RequestData<{ count: number; rows: Array<User> }>
        >(
            `${URL.user}/influencers?${parseObjectToUrlParams({
                ...stringifyFilterData(),
                page: (page + 1).toString(),
                rowsPerPage: rowsPerPage.toString(),
            })}`
        );
        if (response.status === 200) {
            updatePage(page + 1);
            setInfluencersToPick([
                ...influencersToPick,
                ...response?.data.data.rows,
            ]);
        }
    };

    const stringifyFilterData = () => ({
        ...(searchText !== undefined && {
            username: searchText,
        }),
    });

    const iconRight = (
        <View style={influencerPickerStyles.xButtonContainer}>
            <X width={12} height={12} color={Colors.grayscale.surface.darker} />
        </View>
    );

    const renderFooter = () => {
        if (!isLoading) return null;
        return <ActivityIndicator size="large" />;
    };

    return (
        <>
            <Text style={styles.sliderBottomInfluencerTitle}>
                Wybierz twórcę
            </Text>
            <Text style={influencerPickerStyles.subtitle}>
                Wyszukaj twórcę, którego chcesz zaprosić do współpracy
            </Text>
            <View style={styles.sliderBottomContainer}>
                <Input
                    placeholder="Szukaj..."
                    value={searchText}
                    iconRight={iconRight}
                    onChangeText={handleChangeInput}
                    onIconRightCick={() => setSearchText("")}
                    iconLeft={
                        <Search
                            width={16}
                            height={16}
                            color={Colors.grayscale.border.disabled}
                        />
                    }
                />
                {!!!searchText.length && !isLoading && (
                    <Text style={influencerPickerStyles.infoText}>
                        Wpisz w wyszukiwarkę poszukiwanego influencera.
                    </Text>
                )}
                {!!influencersToPick && (
                    <View style={influencerPickerStyles.flatListContainer}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={influencersToPick}
                            renderItem={(item: { item: User }) => (
                                <FlatListUserItem
                                    item={item}
                                    onButtonClick={handleButtonClick}
                                    buttonDisabled={invitedInfluencers.includes(
                                        item.item.uid
                                    )}
                                />
                            )}
                            ListEmptyComponent={
                                displayEmptyListComponent &&
                                searchText.length ? (
                                    <ListEmptyComponent />
                                ) : (
                                    <></>
                                )
                            }
                            keyExtractor={(item: User) => item.uid}
                            onEndReached={() => handleReachEnd()}
                            ListFooterComponent={renderFooter}
                        />
                    </View>
                )}
            </View>
        </>
    );
};

export default InfluencerPicker;
