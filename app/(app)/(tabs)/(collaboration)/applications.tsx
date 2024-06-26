import { Stack } from "expo-router";
import { ScrollView, Text, View, XStack } from "tamagui";
import ScreenSlicer from "../../../components/ScreenSlicer";
import { useAuthGetData } from "../../../hooks/useGetData";
import { CollaborationUserReceivedWithCollaboration } from "../../../types/collaboration/market";
import { useEffect, useState } from "react";
import { SOCIAL_STATUSES } from "../../../../constants/Collaboration";
import { StyleSheet } from "react-native";
import OwnApplicationCard from "../../../components/OwnApplicationCard";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 40,
    },
    eachStatus: {
        width: "33%",
        alignItems: "center",
    },
    statusPicked: {
        borderBottomWidth: 1,
    },
    accepted: {
        borderColor: "green",
    },
    rejected: {
        borderColor: "red",
    },
    remaining: {
        borderColor: "blue",
    },
    viewContainer: { width: "100%" },
});

const Own = () => {
    const { fetchData } = useAuthGetData<{
        rows: CollaborationUserReceivedWithCollaboration[];
        count: number;
    }>(`/collaboration/ownApplications`, {
        method: "GET",
    });
    const [displayedOwnApplications, setDisplayedOwnApplications] = useState<
        keyof typeof SOCIAL_STATUSES
    >(SOCIAL_STATUSES.remaining);
    const [ownApplications, setOwnApplications] = useState<{
        [SOCIAL_STATUSES.accepted]: CollaborationUserReceivedWithCollaboration[];
        [SOCIAL_STATUSES.rejected]: CollaborationUserReceivedWithCollaboration[];
        [SOCIAL_STATUSES.remaining]: CollaborationUserReceivedWithCollaboration[];
    }>({
        [SOCIAL_STATUSES.accepted]: [],
        [SOCIAL_STATUSES.rejected]: [],
        [SOCIAL_STATUSES.remaining]: [],
    });
    const parseApplications = (
        apiApplications: CollaborationUserReceivedWithCollaboration[]
    ) => {
        const newApplications = { ...ownApplications };
        apiApplications.forEach(
            (application: CollaborationUserReceivedWithCollaboration) => {
                newApplications[
                    application.status as keyof typeof ownApplications
                ].push(application);
            }
        );
        setOwnApplications(newApplications);
    };
    useEffect(() => {
        fetchData().then((res: any) => {
            parseApplications(res.data.rows);
        });
    }, []);
    return (
        <View style={styles.viewContainer}>
            <XStack height={40} style={styles.container}>
                <View
                    onPress={() =>
                        setDisplayedOwnApplications(SOCIAL_STATUSES.remaining)
                    }
                    style={
                        displayedOwnApplications !== SOCIAL_STATUSES.remaining
                            ? styles.eachStatus
                            : [
                                  styles.eachStatus,
                                  styles.statusPicked,
                                  styles.remaining,
                              ]
                    }>
                    <Text>Oczekujące</Text>
                    <Text>{ownApplications.remaining.length}</Text>
                </View>
                <View
                    onPress={() =>
                        setDisplayedOwnApplications(SOCIAL_STATUSES.accepted)
                    }
                    style={
                        displayedOwnApplications !== SOCIAL_STATUSES.accepted
                            ? styles.eachStatus
                            : [
                                  styles.eachStatus,
                                  styles.statusPicked,
                                  styles.accepted,
                              ]
                    }>
                    <Text>Zaakceptowane</Text>
                    <Text>{ownApplications.accepted.length}</Text>
                </View>
                <View
                    onPress={() =>
                        setDisplayedOwnApplications(SOCIAL_STATUSES.rejected)
                    }
                    style={
                        displayedOwnApplications !== SOCIAL_STATUSES.rejected
                            ? styles.eachStatus
                            : [
                                  styles.eachStatus,
                                  styles.statusPicked,
                                  styles.rejected,
                              ]
                    }>
                    <Text>Odrzucone</Text>
                    <Text>{ownApplications.rejected.length}</Text>
                </View>
            </XStack>
            <ScrollView>
                {ownApplications[displayedOwnApplications].map(
                    (
                        application: CollaborationUserReceivedWithCollaboration
                    ) => (
                        <OwnApplicationCard application={application} />
                    )
                )}
            </ScrollView>
        </View>
    );
};

const Incoming = () => {
    return <Text>Incoming application</Text>;
};

export default function Applications() {
    return (
        <View flex={1} paddingTop="$10" alignItems="center">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <ScreenSlicer
                leftHeader="Własne"
                rightHeader="Aplikujący"
                leftContent={<Own />}
                rightContent={<Incoming />}
            />
        </View>
    );
}
