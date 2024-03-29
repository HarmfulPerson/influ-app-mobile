import { StyleSheet } from "react-native";
import {
    Button,
    Card,
    Dialog,
    H2,
    Paragraph,
    Text,
    Unspaced,
    View,
    XStack,
    YStack,
} from "tamagui";
import { X } from "lucide-react-native";
import SocialIcon from "../SocialIconParser";
import { SOCIAL_TYPES } from "../../../constants/Main";
import {
    Collaboration,
    CollaborationUserReceived,
    CollaborationUserSent,
} from "../../types/collaboration/market";
import { memo, useState } from "react";
import useAuthPostData from "../../hooks/usePostAuthData";
const styles = StyleSheet.create({
    card: {
        width: "90%",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto",
    },
    appliementStats: { width: "50%", flexDirection: "column" },
    platforms: {
        width: "50%",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    headerContainer: { flexDirection: "row", width: "100%" },
    eachSocial: {
        alignItems: "center",
        width: "25%",
    },
    eachPickedSocial: {
        alignItems: "center",
        width: "25%",
        backgroundColor: "gray",
    },
    socialPickerContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 10,
    },
    dialog: {
        alignItems: "center",
    },
    dialogExitStyles: { opacity: 0 },
    dialogEnterStyles: { opacity: 0 },
    acceptButton: {
        width: 150,
        borderRadius: 10,
        backgroundColor: "green",
    },
    rejectButton: {
        width: 150,
        borderRadius: 10,
        backgroundColor: "red",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    eachIconContainer: {
        width: "25%",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    iconsContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
    },
});
function CustomCard(props: {
    collaboration: Collaboration;
    loggedUser: string;
}) {
    const { collaboration, loggedUser } = props;
    const [offeredSocials, setOfferedSocials] = useState<Array<string>>([]);
    const { postData: applyForCollaboration } = useAuthPostData();

    const handleOfferedSocials = (social: string): void => {
        offeredSocials.includes(social)
            ? setOfferedSocials(
                  offeredSocials.filter(
                      (eachSocial: string) => eachSocial !== social
                  )
              )
            : setOfferedSocials([...offeredSocials, social]);
    };

    const handleButtonClick = async (collaborationUid: string) => {
        await handleApply(collaborationUid);
        setOfferedSocials([]);
    };

    const handleApply = async (collaborationUid: string) => {
        await applyForCollaboration(
            `/collaboration/apply/${collaborationUid}`,
            {
                offeredSocials,
            }
        );
    };

    const shouldDisableApplyButton = () =>
        collaboration.userUid === loggedUser ||
        collaboration.collaborationsUserSent.some(
            (collabUserSent: CollaborationUserSent) =>
                collabUserSent.userUid === loggedUser
        ) ||
        collaboration.collaborationsUserReceived.some(
            (collabUserReceived: CollaborationUserReceived) =>
                collabUserReceived.userUid === loggedUser
        );

    return (
        <Card key={collaboration.uid} elevate style={styles.card} bordered>
            <Dialog modal>
                <Card.Header padded>
                    <View style={styles.headerContainer}>
                        <H2>{collaboration.campaignName}</H2>
                    </View>
                    <View style={styles.headerContainer}>
                        <View style={styles.platforms}>
                            <Paragraph theme="alt2">platformy: </Paragraph>
                            <View style={styles.iconsContainer}>
                                {collaboration.neededSocials.map(
                                    (social: string) =>
                                        Object.values(SOCIAL_TYPES).includes(
                                            social
                                        ) ? (
                                            <View
                                                key={social}
                                                style={
                                                    styles.eachIconContainer
                                                }>
                                                <SocialIcon
                                                    social={social}
                                                    width={18}
                                                    height={18}
                                                />
                                            </View>
                                        ) : (
                                            <Text>"none"</Text>
                                        )
                                )}
                            </View>
                        </View>
                        <View style={styles.appliementStats}>
                            <Paragraph theme="alt2">
                                Wysłano zaproszenia:
                                {collaboration.collaborationsUserSent.length}
                            </Paragraph>
                            <Paragraph theme="alt2">
                                Aplikowało:
                                {
                                    collaboration.collaborationsUserReceived
                                        .length
                                }
                            </Paragraph>
                        </View>
                    </View>

                    <Paragraph theme="alt2">
                        {collaboration.shortDescription}
                    </Paragraph>
                </Card.Header>
                <Card.Footer padded>
                    <YStack flex={1}>
                        {collaboration.collaborationsUserSent.some(
                            (collabUserSent: CollaborationUserSent) =>
                                collabUserSent.userUid === loggedUser
                        ) ? (
                            <View style={styles.buttonsContainer}>
                                <Button style={styles.acceptButton}>
                                    Akceptuj
                                </Button>
                                <Button style={styles.rejectButton}>
                                    Odrzuć
                                </Button>
                            </View>
                        ) : (
                            <Dialog.Trigger asChild>
                                <Button
                                    disabled={shouldDisableApplyButton()}
                                    borderRadius="$10">
                                    Aplikuj
                                </Button>
                            </Dialog.Trigger>
                        )}

                        {collaboration.userUid === loggedUser && (
                            <Paragraph theme="alt2">
                                Ogłoszenie własne
                            </Paragraph>
                        )}
                        {collaboration.collaborationsUserReceived.some(
                            (collabUserReceiver: CollaborationUserReceived) =>
                                collabUserReceiver.userUid === loggedUser
                        ) && <Paragraph theme="alt2">Już aplikowano</Paragraph>}
                    </YStack>
                </Card.Footer>
                <Dialog.Portal>
                    <Dialog.Overlay
                        key="overlay"
                        animation="slow"
                        opacity={0.5}
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                    <Dialog.Content
                        bordered
                        elevate
                        key="content"
                        animateOnly={["transform", "opacity"]}
                        animation={[
                            "quick",
                            {
                                opacity: {
                                    overshootClamping: true,
                                },
                            },
                        ]}
                        enterStyle={styles.dialogEnterStyles}
                        exitStyle={styles.dialogExitStyles}
                        gap="$4">
                        <Dialog.Title>Wybierz platformy</Dialog.Title>
                        <Dialog.Description>
                            zaznacz platformy na których możesz reklamować
                        </Dialog.Description>
                        <Dialog.Content style={styles.dialog}>
                            <View style={styles.socialPickerContainer}>
                                {Object.values(SOCIAL_TYPES).map(
                                    (eachSocial: string) => (
                                        <View
                                            key={eachSocial}
                                            onPress={() =>
                                                handleOfferedSocials(eachSocial)
                                            }
                                            style={
                                                offeredSocials.includes(
                                                    eachSocial
                                                )
                                                    ? styles.eachPickedSocial
                                                    : styles.eachSocial
                                            }>
                                            <SocialIcon
                                                social={eachSocial}
                                                width={36}
                                                height={36}
                                            />
                                        </View>
                                    )
                                )}
                            </View>
                        </Dialog.Content>

                        <XStack alignSelf="flex-end" gap="$4">
                            <Dialog.Close displayWhenAdapted asChild>
                                <Button
                                    onPress={() =>
                                        handleButtonClick(collaboration.uid)
                                    }
                                    theme="active"
                                    aria-label="Close">
                                    Aplikuj
                                </Button>
                            </Dialog.Close>
                        </XStack>

                        <Unspaced>
                            <Dialog.Close asChild>
                                <Button
                                    position="absolute"
                                    top="$3"
                                    right="$3"
                                    onPress={() => setOfferedSocials([])}
                                    size="$2"
                                    circular
                                    icon={X}
                                />
                            </Dialog.Close>
                        </Unspaced>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </Card>
    );
}

export default memo(CustomCard);
