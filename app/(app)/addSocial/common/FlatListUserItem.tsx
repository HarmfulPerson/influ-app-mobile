import { Dispatch, SetStateAction, useState } from "react";
import ModalMechanism from "../../../components/ModalMechanism/ModalMechanism";
import { ScrollView, Sheet, Text, View } from "tamagui";
import { ImageBackground, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../../../constants/Colors";
import { BlurView } from "@react-native-community/blur";
import { SOCIAL_TYPES } from "../../../../constants/Main";
import SocialIcon from "../../../components/SocialIconParser";
import { Categories } from "../../../types/category";
import Button from "../../../components/Button/Button";
import { categoriesMapper } from "../../../../constants/Categories";
import { User } from "../../../types/user";
import { styles } from "../styles/influencerPicker";
import { PlatformAndInfluencer } from "../steps/PlatformAndInfluencerPick";

type FlatListUserItemProps = {
  item: { item: User };
  setPlatformAndInfluencer: Dispatch<SetStateAction<PlatformAndInfluencer>>;
  platformAndInfluencer: PlatformAndInfluencer;
  closeModalInfluencer: () => void;
};
const FlatListUserItem = (props: FlatListUserItemProps) => {
  const {
    item,
    setPlatformAndInfluencer,
    platformAndInfluencer,
    closeModalInfluencer,
  } = props;
  const [isOpenInfluencerInnerModal, setIsOpenInfluencerInnerModal] =
    useState<boolean>(false);

  const closeModalInfluencerInner = () => setIsOpenInfluencerInnerModal(false);

  const handleSetInviteUser = (user: User) => {
    setPlatformAndInfluencer({ ...platformAndInfluencer, influencer: user });
    closeModalInfluencerInner();
    closeModalInfluencer();
  };

  return (
    <ModalMechanism
      open={isOpenInfluencerInnerModal}
      zIndex={100_101}
      setOpen={setIsOpenInfluencerInnerModal}
      triggerButton={
        <View style={styles.userRow}>
          <ImageBackground
            source={require("../../../../assets/images/menu-user-gopher.png")}
            style={styles.userAvatar}
          ></ImageBackground>
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
                source={require("../../../../assets/images/influencer-profile.jpeg")}
                style={styles.influencerPhoto}
                imageStyle={{ top: 0 }}
              >
                <LinearGradient
                  colors={["transparent", Colors.grayscale.surface.darker]}
                  style={styles.influencerPhotoGradient}
                />
              </ImageBackground>
            </View>
          </Pressable>

          <View style={styles.influencerSocialsContainer}>
            <BlurView
              blurType="dark"
              blurAmount={1}
              reducedTransparencyFallbackColor="white"
              style={styles.influencerSocialsBlurView}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <Pressable>
                  <View style={styles.influencerSocialsWrapper}>
                    {Object.keys(SOCIAL_TYPES).map((social: string) => (
                      <View style={styles.eachSocialPill}>
                        <View style={styles.socialIconWrapper}>
                          <SocialIcon
                            width={20}
                            height={20}
                            social={social}
                            coloured
                          />
                        </View>
                        <View style={styles.socialNameWrapper}>
                          <Text style={styles.socialNameText}>{social}</Text>
                          <Text style={styles.socialNumberText}>
                            {(Math.random() * 10 + 1).toFixed(0)} Tys.
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </Pressable>
              </ScrollView>
            </BlurView>
            <View paddingHorizontal={24} style={styles.influencerInfo}>
              <Pressable>
                <Text style={styles.influencerInfoUsername}>
                  {item.item.username}
                </Text>
              </Pressable>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ maxHeight: 40 }}
                contentContainerStyle={styles.influencerCategoriesScrollView}
              >
                <Pressable>
                  <View style={styles.influencerCategoriesWrapper}>
                    {item.item.influencerCategories.map(
                      (category: { name: Categories }) => (
                        <View
                          key={category.name}
                          style={styles.eachInfluencerCategory}
                        >
                          <Text style={styles.categoryName}>
                            {categoriesMapper[category.name].name}
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
                onStartShouldSetResponder={() => true}
              >
                <Pressable>
                  <Text fontSize={16}>{item.item.description}</Text>
                </Pressable>
              </Sheet.ScrollView>
              <Button
                text="Zaproś do współpracy"
                variant="primary"
                onPress={() => handleSetInviteUser(item.item)}
                style={styles.inviteInfluencerButton}
              ></Button>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default FlatListUserItem;
