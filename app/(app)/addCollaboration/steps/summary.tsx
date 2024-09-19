import {
    Circle,
    ScrollView,
    Text,
    View,
    Button as TamaguiButton,
} from "tamagui";
import Background from "../common/background";
import { styles } from "../styles/summary";
import Button from "../../../components/Button/Button";
import { router, useLocalSearchParams } from "expo-router";
import { ImageBackground, TouchableOpacity } from "react-native";
import FilterDisplayer from "../../../components/FilterDisplayer/FilterDisplayer";
import { parseBooleanStringToBoolean } from "../../../../utils/utils";
import useAuthPostData from "../../../hooks/usePostAuthData";
import { URL } from "../../../../constants/urls";
import { SocialRange } from "../../../types/social";
import CustomModal from "../../../components/ModalPopup/ModalPopup";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useSession } from "../../../hooks/session/authenticationProvider";
import { Category } from "../../../types/category";

export default function Summary() {
    const {
        advertisementCategories,
        title,
        description,
        date,
        isPublishedByAdvertiser,
        neededSocials,
        sexes,
        ageMin,
        ageMax,
        socialRanges,
    } = useLocalSearchParams();
    const { postData: createAdvertisement } = useAuthPostData();
    const { session } = useSession();
    const dummyButton = useRef<any>(null);
    const filters = {
        sexes: (sexes as string)?.split(","),
        ageMin: +(ageMin as string),
        ageMax: +(ageMax as string),
        advertisementSocialRanges: JSON.parse(socialRanges as string),
        categories: JSON.parse(advertisementCategories as string),
        isPublishedByAdvertiser: parseBooleanStringToBoolean(
            isPublishedByAdvertiser as string
        ),
        neededSocials: (neededSocials as string)?.split(","),
        startDate: new Date(date as string),
        title: title,
        description: description,
    };

    const CustomButton = forwardRef((props: any, ref) => {
        const handleClick = () => {
            if (props.onPress) {
                props.onPress();
            }
        };

        useImperativeHandle(ref, () => ({
            click: handleClick,
        }));

        return (
            <TamaguiButton
                style={{
                    height: 0,
                    width: 0,
                    minWidth: 0,
                    minHeight: 0,
                }}
                onPress={handleClick}
            />
        );
    });

    const handleAddAdvertisement = async () => {
        console.log({
            ...filters,
            socialRanges: filters.advertisementSocialRanges.map(
                (socialRange: SocialRange) => ({
                    ...socialRange,
                    socialRangeUid: socialRange.uid,
                })
            ),
        });
        const response = await createAdvertisement(URL.advertisement, {
            ...filters,
            advertisementSocialRanges: filters.advertisementSocialRanges.map(
                (socialRange: SocialRange) => ({
                    socialRangeUid: socialRange.uid,
                })
            ),
            advertisementCategories: filters.categories.map(
                (category: Category) => ({
                    influencerCategoryUid: category.uid,
                })
            ),
        });
        if (response?.status === 200) dummyButton.current?.click();
    };

    const mainArea = (
        <>
            <Text style={styles.title}>Sprawdz swoje ogloszenie</Text>
            <View style={styles.container}>
                <View style={styles.subHeaderContainer}>
                    <Circle width={48} height={48} style={styles.avatarCircle}>
                        <ImageBackground
                            style={styles.avatarDisplayer}
                            source={require("../../../../assets/images/menu-user-gopher.png")}
                        />
                    </Circle>
                </View>
                <View style={styles.companyAndTitleContainer}>
                    <Text style={styles.companyNameText}>
                        {session.data.userData.nameOfCompany}
                    </Text>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
            </View>
            <FilterDisplayer filters={filters} />
            <View style={styles.descriptionContainer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Text style={styles.descriptionText}>{description}</Text>
                </ScrollView>
            </View>
            <CustomModal
                triggerButton={<CustomButton ref={dummyButton} />}
                header="Ogłoszenie dodane!"
                subHeader="Od teraz mozesz przyjmowac zgloszenia!"
                buttonText="Wróć do strony głównej"
                buttonClick={() => router.navigate("/")}
            />
        </>
    );

    const botttomArea = (
        <View style={styles.navigationButtonsContainer}>
            <Button
                variant="secondary"
                onPress={() => router.back()}
                style={styles.navigationButton}
                text="Wstecz"
            />
            <Button
                variant="primary"
                style={styles.navigationButton}
                onPress={() => handleAddAdvertisement()}
                text="Dodaj"
            />
        </View>
    );

    return (
        <Background
            mainArea={mainArea}
            bottomArea={botttomArea}
            progress={100}
        />
    );
}
