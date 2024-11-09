import { useState } from "react";
import { ScrollView, Sheet, Text, View } from "tamagui";
import { ImageBackground, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { categoriesMapper } from "../../../constants/Categories";
import { styles } from "../InfluencerPicker/styles";
import { User } from "../../types/user";
import Button from "../Button/Button";
import ModalMechanism from "../ModalMechanism/ModalMechanism";
import { Categories } from "../../types/category";
import SocialIcon from "../SocialIconParser";
import { SOCIAL_TYPES } from "../../../constants/Main";
import Colors from "../../../constants/Colors";

type FlatListUserItemProps = {
    item: { item: User };
    onButtonClick: (user: User) => void | Promise<void>;
    buttonDisabled: boolean;
};
const FlatListUserItem = (props: FlatListUserItemProps) => {
    const { item, onButtonClick, buttonDisabled } = props;
    const [isOpenInfluencerInnerModal, setIsOpenInfluencerInnerModal] =
        useState<boolean>(false);

    const closeModalInfluencerInner = () =>
        setIsOpenInfluencerInnerModal(false);

    const handleSetInviteUser = async (user: User) => {
        closeModalInfluencerInner();
        await onButtonClick(user);
    };

    return (
        <ModalMechanism
            open={isOpenInfluencerInnerModal}
            zIndex={100_101}
            setOpen={setIsOpenInfluencerInnerModal}
            triggerButton={
                <View style={styles.userRow}>
                    <ImageBackground
                        source={require("../../../assets/images/menu-user-gopher.png")}
                        style={styles.userAvatar}></ImageBackground>
                    <View style={styles.influencerNamesContainer}>
                        <Text color="white" style={styles.influencerUsername}>
                            {item.item.username}
                        </Text>
                        <Text color="white" style={styles.influencerName}>
                            {item.item.nameOfCompany}
                        </Text>
                    </View>
                </View>
            }
            children={
                <View style={styles.influencerInfoContainer}>
                    <Pressable style={styles.influencerInfoPhotoContainer}>
                        <View>
                            <ImageBackground
                                source={require("../../../assets/images/influencer-profile.jpeg")}
                                style={styles.influencerPhoto}
                                imageStyle={{ top: 0 }}>
                                <LinearGradient
                                    colors={[
                                        "transparent",
                                        Colors.grayscale.surface.darker,
                                    ]}
                                    style={styles.influencerPhotoGradient}
                                />
                            </ImageBackground>
                        </View>
                    </Pressable>

                    <View style={styles.influencerSocialsContainer}>
                        <View style={styles.influencerSocialsBlurView}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                <Pressable>
                                    <View
                                        style={styles.influencerSocialsWrapper}>
                                        {Object.keys(SOCIAL_TYPES).map(
                                            (social: string) => (
                                                <View
                                                    style={
                                                        styles.eachSocialPill
                                                    }>
                                                    <View
                                                        style={
                                                            styles.socialIconWrapper
                                                        }>
                                                        <SocialIcon
                                                            width={20}
                                                            height={20}
                                                            social={social}
                                                            coloured
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.socialNameWrapper
                                                        }>
                                                        <Text
                                                            style={
                                                                styles.socialNameText
                                                            }>
                                                            {social}
                                                        </Text>
                                                        <Text
                                                            style={
                                                                styles.socialNumberText
                                                            }>
                                                            {(
                                                                Math.random() *
                                                                    10 +
                                                                1
                                                            ).toFixed(0)}{" "}
                                                            Tys.
                                                        </Text>
                                                    </View>
                                                </View>
                                            )
                                        )}
                                    </View>
                                </Pressable>
                            </ScrollView>
                        </View>
                        <View
                            paddingHorizontal={24}
                            style={styles.influencerInfo}>
                            <Pressable>
                                <Text style={styles.influencerInfoUsername}>
                                    {item.item.username}
                                </Text>
                            </Pressable>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={styles.scrollView}
                                contentContainerStyle={
                                    styles.influencerCategoriesScrollView
                                }>
                                <Pressable>
                                    <View
                                        style={
                                            styles.influencerCategoriesWrapper
                                        }>
                                        {item.item.influencerCategories.map(
                                            (category: {
                                                name: Categories;
                                            }) => (
                                                <View
                                                    key={category.name}
                                                    style={
                                                        styles.eachInfluencerCategory
                                                    }>
                                                    <Text
                                                        style={
                                                            styles.categoryName
                                                        }>
                                                        {
                                                            categoriesMapper[
                                                                category.name
                                                            ].name
                                                        }
                                                    </Text>
                                                </View>
                                            )
                                        )}
                                    </View>
                                </Pressable>
                            </ScrollView>

                            <Sheet.ScrollView
                                bounces={false}
                                style={{ flex: 1 }}
                                onStartShouldSetResponder={() => true}>
                                <Pressable>
                                    <Text
                                        fontSize={16}
                                        color={Colors.grayscale.text.body}>
                                        {item.item.description}
                                    </Text>
                                </Pressable>
                            </Sheet.ScrollView>
                            <Button
                                text={
                                    buttonDisabled
                                        ? "Zaproszono"
                                        : "Zaproś do współpracy"
                                }
                                variant="primary"
                                disabled={buttonDisabled}
                                onPress={() => handleSetInviteUser(item.item)}
                                style={styles.inviteInfluencerButton}></Button>
                        </View>
                    </View>
                </View>
            }
        />
    );
};

export default FlatListUserItem;
