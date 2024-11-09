import { View, Text } from "tamagui";
import Colors from "../../../constants/Colors";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Button from "../../components/Button/Button";
import Information from "./common/information";
import {
    Advertisement,
    AdvertisementUserReceivedOrSent,
} from "../../types/advertisement";
import { useAuthGetData } from "../../hooks/useGetData";
import { useLocalSearchParams } from "expo-router";
import { URL } from "../../../constants/urls";
import { RequestData } from "../../types/common";
import CreatorList from "./common/creatorList";
import Background from "./common/background";
import ModalMechanism from "../../components/ModalMechanism/ModalMechanism";
import DropdownBottom from "../addSocial/common/dropdownBottom";
import { User } from "../../types/user";
import InfluencerPicker from "../../components/InfluencerPicker/InfluencerPicker";
import { useSession } from "../../hooks/session/authenticationProvider";
import useAuthPostData from "../../hooks/usePostAuthData";

enum CHOSEN_MENU {
    information = "information",
    creatorsList = "creatorsList",
}

export type PlatformAndInfluencer = {
    platforms: string[];
    influencer: User | null;
};

type Props = {
    advertisement: Advertisement;
};
export default function AdvertisementDisplay(props: Props) {
    const { advertisementUid } = useLocalSearchParams();
    const { fetchData: getAdvertisement, isLoading } = useAuthGetData();
    const { postData: inviteUser } = useAuthPostData();

    const { session } = useSession();
    const [advertisement, setAdvertisement] = useState<Advertisement | null>(
        null
    );
    const [isOpenInfluencerModal, setIsOpenInfluencerModal] =
        useState<boolean>(false);
    const closeModalInfluencer = () => setIsOpenInfluencerModal(false);
    const [alreadyInvitedInfluencer, setAlreadyInvitedInfluencers] = useState<
        User[]
    >([]);
    useEffect(() => {
        handleFetchData();
    }, [advertisementUid]);

    const handleFetchData = () => {
        getAdvertisement<{ data: Advertisement }>(
            `${URL.advertisement}/${advertisementUid}`
        )
            .then((response: RequestData<Advertisement>) => {
                console.log(response.data.data.advertisementUserReceived);
                console.log(response.data.data.advertisementsUserSent);

                setAlreadyInvitedInfluencers([
                    ...response.data.data.advertisementUserReceived.map(
                        (value: AdvertisementUserReceivedOrSent) => value.user
                    ),
                    ...response.data.data.advertisementsUserSent.map(
                        (value: AdvertisementUserReceivedOrSent) => value.user
                    ),
                ]);
                setAdvertisement(response.data.data);
            })
            .catch((err) => console.log(err));
    };
    const [chosenMenu, setChosenMenu] = useState<CHOSEN_MENU>(
        CHOSEN_MENU.information
    );

    const returnMenuStyles = (pickedMenu: CHOSEN_MENU) =>
        pickedMenu === chosenMenu
            ? {
                  container: styles.pickedMenuContainer,
                  title: styles.pickedMenuTitle,
              }
            : { container: styles.menuContainer, title: styles.menuTitle };
    const handleButtonClick = async (user: User) => {
        const response = await inviteUser(
            `${URL.advertisement}/send/${advertisementUid}`,
            {
                users: [user],
            }
        );
        if (response?.status === 200)
            setAlreadyInvitedInfluencers([...alreadyInvitedInfluencer, user]);
    };

    const mainArea = (
        <View style={styles.container}>
            {isLoading && <ActivityIndicator size="large" />}
            {advertisement && (
                <>
                    <View style={styles.logoAndTitleContainer}>
                        <View style={styles.companyLogo}></View>
                        <View style={{ justifyContent: "center" }}>
                            <Text style={styles.company}>
                                {advertisement.createdByUser.nameOfCompany}
                            </Text>
                            <Text style={styles.advertisementTitle}>
                                {advertisement.title}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.menusContianer}>
                        <Button
                            text="Informacje"
                            variant="secondary"
                            onPress={() =>
                                setChosenMenu(CHOSEN_MENU.information)
                            }
                            textStyle={
                                returnMenuStyles(CHOSEN_MENU.information).title
                            }
                            style={
                                returnMenuStyles(CHOSEN_MENU.information)
                                    .container
                            }></Button>
                        <Button
                            text="Lista twórców"
                            variant="secondary"
                            onPress={() =>
                                setChosenMenu(CHOSEN_MENU.creatorsList)
                            }
                            textStyle={
                                returnMenuStyles(CHOSEN_MENU.creatorsList).title
                            }
                            style={
                                returnMenuStyles(CHOSEN_MENU.creatorsList)
                                    .container
                            }></Button>
                    </View>
                    <View style={styles.menuChoiceContainer}>
                        {chosenMenu === CHOSEN_MENU.information && (
                            <Information advertisement={advertisement} />
                        )}
                        {chosenMenu === CHOSEN_MENU.creatorsList && (
                            <CreatorList
                                influencers={alreadyInvitedInfluencer}
                            />
                        )}
                    </View>
                </>
            )}
        </View>
    );

    const bottomArea = (
        <>
            {chosenMenu === CHOSEN_MENU.information &&
                advertisement?.userUid !== session.data.userData.uid && (
                    <ModalMechanism
                        open={isOpenInfluencerModal}
                        setOpen={setIsOpenInfluencerModal}
                        triggerButton={
                            <Button
                                text="Zaproś influencerów!"
                                variant="primary"
                                style={styles.addInfluencerButton}></Button>
                        }
                        children={
                            <DropdownBottom
                                closeModal={closeModalInfluencer}
                                children={
                                    <InfluencerPicker
                                        displayEmptyListComponent={true}
                                        handleButtonClick={handleButtonClick}
                                        invitedInfluencers={alreadyInvitedInfluencer.map(
                                            (user: User) => user.uid
                                        )}
                                    />
                                }
                            />
                        }
                    />
                )}
            {chosenMenu === CHOSEN_MENU.creatorsList && (
                <Button
                    text="Wygeneruj raport"
                    variant="primary"
                    style={styles.addInfluencerButton}></Button>
            )}
        </>
    );

    return <Background mainArea={mainArea} bottomArea={bottomArea} />;
}

export const styles = StyleSheet.create({
    addInfluencerButton: {
        width: "100%",
        height: 56,
        borderWidth: 0,
        marginTop: 5,
    },
    buttonContainer: {
        height: 88,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    logoAndTitleContainer: { flexDirection: "row", paddingBottom: 24 },
    companyLogo: {
        height: 73,
        width: 73,
        backgroundColor: "green",
        borderRadius: 12,
        marginRight: 10,
    },
    company: {
        fontSize: 12,
        color: Colors.grayscale.text.body,
        lineHeight: 12.4,
    },
    advertisementTitle: {
        fontSize: 24,
        color: Colors.grayscale.text.title,
        fontWeight: "700",
        lineHeight: 28.8,
        paddingRight: 80,
    },
    menuChoiceContainer: {
        marginTop: 24,
        flex: 1,
    },
    menusContianer: {
        marginTop: 12,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: "row",
    },
    pickedMenuContainer: {
        width: "50%",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        marginRight: 0,
        fontFamily: "PoppinsSemiBold",
        color: "white",
        borderRadius: 0,
        marginLeft: 0,
        borderRightWidth: 0,
        borderColor: Colors.primary.surface.lighter,
    },
    pickedMenuTitle: {
        fontFamily: "PoppinsSemiBold",
        color: "white",
    },
    menuContainer: {
        width: "50%",
        borderColor: Colors.grayscale.surface.subtle,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRadius: 0,
        marginRight: 0,
        marginLeft: 0,
        borderRightWidth: 0,
    },
    menuTitle: {
        fontSize: 16,
        color: Colors.grayscale.text.disabled,
    },
    container: {
        paddingTop: 48,
        flex: 1,
        backgroundColor: Colors.grayscale.surface.darker,
    },
});
