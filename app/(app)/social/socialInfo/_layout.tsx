import { Progress, Text, View } from "tamagui";
import Background from "../common/background";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthGetData } from "../../../hooks/useGetData";
import { URL } from "../../../../constants/urls";
import { RequestData } from "../../../types/common";
import { Social } from "../../../types/social";
import { ActivityIndicator } from "react-native";
import Colors from "../../../../constants/Colors";
import { Briefcase, File, FileText, Rows3 } from "lucide-react-native";
import { returnUserImage } from "../../../../utils/user";
import { Image } from "expo-image";
import SocialIcon from "../../../components/SocialIconParser";
import {
  SOCIAL_STATUS_MAPPER_ADVERTISER,
  SOCIAL_STATUS_NEXT_STEP,
  SOCIAL_STATUSES,
  SOCIAL_STATUSES_ACTION_FOR_ADVERTISER,
} from "../../../../constants/Social";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import { styles } from "../styles/main";
import useAuthPatchData from "../../../hooks/usePatchAuth";

const SocialInfoLayout = () => {
  const { socialUid } = useLocalSearchParams();
  const [social, setSocial] = useState<Social | null>(null);
  const { fetchData: getAdvertisement, isLoading } = useAuthGetData();
  const { patchData: changeSocialStatus } = useAuthPatchData();
  useEffect(() => {
    handleFetchData();
  }, [socialUid]);
  const socialProgress =
    ((Object.keys(SOCIAL_STATUS_NEXT_STEP).indexOf(social?.socialStatus.status as string) + 1) /
      Object.keys(SOCIAL_STATUS_NEXT_STEP).length) *
    100;
  const handleFetchData = () => {
    console.log(`${URL.social}/${socialUid}`);
    getAdvertisement<{ data: Social }>(`${URL.social}/${socialUid}`)
      .then((response: RequestData<Social>) => {
        setSocial(response.data.data);
      })
      .catch((err) => console.log(err));
  };
  if (!social || isLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.grayscale.surface.superDarker,
        }}
      >
        <ActivityIndicator />
      </View>
    );

  const handleConfirm = async () => {
    const result = await changeSocialStatus(
      `${URL.social}/${socialUid}/statuses/${
        SOCIAL_STATUS_MAPPER_ADVERTISER[social.socialStatus.status]
      }`,
      {}
    );
    if (result?.status === 200) {
      setSocial({
        ...social,
        socialStatus: { ...social.socialStatus, status: result.data.data.status },
      });
      return {
        result: true,
        message: "",
      };
    } else {
      return {
        result: false,
        message: "Wystąpił błąd, nie udało się zmienić statusu",
      };
    }
  };

  const mainArea = (
    <View style={styles.container}>
      <Text style={styles.title}>{social.title}</Text>
      <View style={styles.campaignContainer}>
        {social.campaign && (
          <>
            <Rows3 color={Colors.primary.border.lighter} height={12} width={12} />
            <Text style={styles.campaignNameText}>{social.campaign.name}</Text>
          </>
        )}
      </View>
      <View style={styles.socialInfoContainer}>
        <View style={styles.influencerContainer}>
          <Text style={styles.influencerTitle}>Influencer</Text>
          <View style={styles.influencerInfo}>
            <Image
              source={returnUserImage(social.executor.avatarUrl)}
              style={styles.influencerAvatar}
            />
            <Text style={styles.influencerUsername}>{social.executor.username}</Text>
          </View>
        </View>
        <View style={styles.platformContainer}>
          <Text style={styles.platformTitle}>Platforma</Text>
          <View style={styles.platformInfo}>
            <SocialIcon coloured width={24} height={24} social={social.platform} />
            <Text style={styles.socialName}>{social.platform}</Text>
          </View>
        </View>
      </View>
      <View onPress={() => router.push("/social/taskList")} style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Lista zadań</Text>
        <Text style={styles.progressNextTaskTitle}>Następne zadanie:</Text>
        <Text style={styles.nextStep}>
          {
            SOCIAL_STATUS_NEXT_STEP[
              social.socialStatus.status as keyof typeof SOCIAL_STATUS_NEXT_STEP
            ].title
          }
        </Text>
        <Progress
          backgroundColor={Colors.primary.border.lighter}
          style={styles.progressBar}
          value={socialProgress}
        >
          <Progress.Indicator
            backgroundColor={Colors.grayscale.surface.darker}
            animation="bouncy"
          />
        </Progress>
        <View style={styles.progressValueContainer}>
          <Text style={styles.progressValue}>{socialProgress}%</Text>
        </View>
      </View>
      <View style={styles.socialMaterialsContainer}>
        <View style={styles.materialsAndBriefContainer}>
          <Text style={styles.materialsAndBriefTitle}>Materiały i brief</Text>
          <Briefcase style={styles.materialsAndBriefIcon} width={102} height={102} color="black" />
        </View>
        <View style={styles.documentsContainer}>
          <Text style={styles.documentsTitle}>Dokumenty</Text>
          <Text style={styles.documentsSubtitle}>8 plików</Text>
          <FileText style={styles.materialsAndBriefIcon} width={102} height={102} color="black" />
        </View>
      </View>
      <View
        style={{
          ...styles.nextStepContainer,
          justifyContent: "flex-end",
          marginTop: 16,
        }}
      >
        <View>
          <Text style={styles.nextStepBottomTitle}>Następne zadanie</Text>
          <Text style={styles.nextStepBottomSubtitle}>
            Przesun w prawo, aby zakonczyc i przejsc do nastepnego zadania
          </Text>
        </View>

        {social.socialStatus.status !== SOCIAL_STATUSES.offerRejected && (
          <SliderComponent
            disabled={SOCIAL_STATUSES_ACTION_FOR_ADVERTISER.includes(social.socialStatus.status)}
            onConfirm={handleConfirm}
            status={social.socialStatus.status}
          />
        )}
      </View>
    </View>
  );
  return <Background mainArea={mainArea} />;
};

export default SocialInfoLayout;
