import { View, Text, Button as TamaguiButton, Input } from "tamagui";
import Button from "../../../components/Button/Button";
import { navigateBack } from "../../../../utils/utils";
import Background from "../common/Background";
import { router, useLocalSearchParams } from "expo-router";
import Colors from "../../../../constants/Colors";
import { Info, X } from "lucide-react-native";
import { styles } from "../styles/platformAndInfluencerPick";
import ModalMechanism from "../../../components/ModalMechanism/ModalMechanism";
import DropdownBottom from "../common/dropdownBottom";
import { useState } from "react";
import PlatformPicker from "../common/PlatformPicker";
import { User } from "../../../types/user";
import InfluencerPicker from "../../../components/InfluencerPicker/InfluencerPicker";

export type PlatformAndInfluencer = {
    platforms: string[];
    influencer: User[];
};

const PlatformAndInfluencerPick = () => {
    const { pickedCampaign } = useLocalSearchParams();
    const [platformAndInfluencer, setPlatformAndInfluencer] =
        useState<PlatformAndInfluencer>({ platforms: [], influencer: [] });
    const [isOpenPlatformModal, setIsOpenPlatformModal] =
        useState<boolean>(false);
    const openModalPlatform = () => setIsOpenPlatformModal(true);
    const closeModalPlatform = () => setIsOpenPlatformModal(false);
    const [isOpenInfluencerModal, setIsOpenInfluencerModal] =
        useState<boolean>(false);
    const openModalInfluencer = () => setIsOpenInfluencerModal(true);
    const closeModalInfluencer = () => setIsOpenInfluencerModal(false);

    const canProceed = () =>
        platformAndInfluencer.platforms.length &&
        platformAndInfluencer.influencer.length;

    const handleNavigateNextPage = () => {
        router.push({
            pathname: "addSocial/steps/TitleAndDescription",
            params: {
                pickedCampaign,
                user: platformAndInfluencer.influencer[0]?.uid,
                platforms: JSON.stringify(platformAndInfluencer.platforms),
            },
        });
    };

    const handleClearInfluencer = () => {
        setPlatformAndInfluencer({
            ...platformAndInfluencer,
            influencer: [],
        });
    };

    const handleButtonClick = (user: User) => {
        setPlatformAndInfluencer({
            ...platformAndInfluencer,
            influencer: [user],
        });
        closeModalInfluencer();
    };

    const mainArea = (
        <View>
            {!!pickedCampaign && (
                <View style={styles.isAddedToCampaignInfoContainer}>
                    <Info
                        width={24}
                        height={24}
                        color={Colors.secondary.surface.lighter}
                    />
                    <View style={styles.isAddedToCampaignTextContainer}>
                        <Text style={styles.isAddedToCampaignHelperText}>
                            Ta wspolpraca bedzie nalezec do kampanii:
                        </Text>
                        <Text style={styles.isAddedToCampaignName}>
                            {pickedCampaign}
                        </Text>
                    </View>
                </View>
            )}
            <View style={styles.pickPlatformContainer}>
                <Text style={styles.title}>Wybierz platforme</Text>
                <Text style={styles.subtitle}>
                    Wybierz platforme dla współpracy
                </Text>
                <ModalMechanism
                    open={isOpenPlatformModal}
                    setOpen={setIsOpenPlatformModal}
                    triggerButton={
                        <TamaguiButton
                            style={styles.searchButton}
                            borderWidth={1}
                            onPress={openModalPlatform}
                            borderColor={Colors.grayscale.surface.default}>
                            <Input
                                borderWidth={0}
                                placeholder="Kliknij, aby wybrać platformę"
                                style={{ flex: 1 }}
                                value={platformAndInfluencer.platforms.join(
                                    ", "
                                )}
                                onPressIn={openModalPlatform}
                                editable={false}
                                backgroundColor={
                                    Colors.grayscale.surface.darker
                                }
                                borderColor={
                                    Colors.grayscale.surface.default
                                }></Input>
                        </TamaguiButton>
                    }
                    children={
                        <DropdownBottom
                            closeModal={closeModalPlatform}
                            children={
                                <PlatformPicker
                                    setPlatformAndInfluencer={
                                        setPlatformAndInfluencer
                                    }
                                    platformAndInfluencer={
                                        platformAndInfluencer
                                    }
                                    closeModalPlatform={closeModalPlatform}
                                />
                            }
                        />
                    }
                />
            </View>
            <View style={styles.pickInfluencerContainer}>
                <Text style={styles.title}>Wybierz twórcę</Text>
                <Text style={styles.subtitle}>
                    Wybierz twórcę z którym chcesz współpracować
                </Text>
                <ModalMechanism
                    open={isOpenInfluencerModal}
                    setOpen={setIsOpenInfluencerModal}
                    triggerButton={
                        <TamaguiButton
                            style={styles.searchButton}
                            borderWidth={1}
                            onPress={openModalInfluencer}
                            borderColor={Colors.grayscale.surface.default}>
                            <Input
                                borderWidth={0}
                                placeholder="Wyszukaj twórcę"
                                style={{ flex: 1, color: "white" }}
                                value={
                                    platformAndInfluencer.influencer[0]
                                        ?.username
                                }
                                onPressIn={openModalInfluencer}
                                editable={false}
                                backgroundColor={
                                    Colors.grayscale.surface.darker
                                }
                                borderColor={
                                    Colors.grayscale.surface.default
                                }></Input>
                            {!!platformAndInfluencer.influencer.length && (
                                <View
                                    onPress={handleClearInfluencer}
                                    style={styles.searchIconContainer}>
                                    <X
                                        width={12}
                                        height={12}
                                        color={Colors.grayscale.surface.darker}
                                    />
                                </View>
                            )}
                        </TamaguiButton>
                    }
                    children={
                        <DropdownBottom
                            closeModal={closeModalInfluencer}
                            children={
                                <InfluencerPicker
                                    displayEmptyListComponent={false}
                                    handleButtonClick={handleButtonClick}
                                    invitedInfluencers={
                                        platformAndInfluencer.influencer
                                            ? [
                                                  platformAndInfluencer
                                                      .influencer[0].uid,
                                              ]
                                            : []
                                    }
                                />
                            }
                        />
                    }
                />
            </View>
        </View>
    );
    const botttomArea = (
        <View style={styles.navitionButtonsContainer}>
            <Button
                variant="secondary"
                onPress={navigateBack}
                style={styles.navigationButton}
                text="Wstecz"
            />
            <Button
                variant="primary"
                disabled={!canProceed()}
                onPress={handleNavigateNextPage}
                style={styles.navigationButton}
                text="Dalej"
            />
        </View>
    );

    return (
        <Background
            mainArea={mainArea}
            bottomArea={botttomArea}
            progress={40}
        />
    );
};

export default PlatformAndInfluencerPick;
