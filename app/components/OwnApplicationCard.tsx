import { StyleSheet } from "react-native";
import { Button, Card, H2, H5, Input, Text, View, XStack } from "tamagui";
import {
    CollaborationUserReceived,
    CollaborationUserReceivedWithCollaboration,
} from "../types/collaboration/market";
import { SOCIAL_STATUSES } from "../../constants/Collaboration";
import useDeleteAuth from "../hooks/useDeleteAuth";

const styles = StyleSheet.create({
    helperText: {
        alignSelf: "flex-start",
        fontSize: 10,
        paddingLeft: 6,
        paddingBottom: 4,
    },
});

export default function OwnApplicationCard(props: {
    application: CollaborationUserReceivedWithCollaboration;
}) {
    const { deleteData } = useDeleteAuth<{ deleted: boolean }>();

    const { application } = props;
    return (
        <Card elevate size="$4" bordered>
            <Card.Header padded>
                <H2>{application.collaboration.campaignName}</H2>
                <Text>
                    Data rozpoczęczia: {application.collaboration.startDate}
                </Text>
            </Card.Header>
            <Card.Footer padded>
                <XStack flex={1} />
                {application.status === SOCIAL_STATUSES.remaining && (
                    <Button
                        onPress={() =>
                            deleteData(
                                `/collaboration/application/${application.uid}`
                            )
                        }
                        borderRadius="$10">
                        Usuń
                    </Button>
                )}
            </Card.Footer>
        </Card>
    );
}
