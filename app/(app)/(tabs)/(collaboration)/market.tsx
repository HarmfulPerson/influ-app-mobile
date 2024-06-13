import { Stack } from "expo-router";
import { Spinner, View } from "tamagui";
import { getData, useAuthGetData } from "../../../hooks/useGetData";
import { useSession } from "../../../hooks/session/authenticationProvider";
import CustomCard from "../../../components/Card/CollaborationApplyCard";
import { useEffect, useRef, useState } from "react";
import { Collaboration } from "../../../types/collaboration/market";
import { FlatList } from "react-native";

export default function Market() {
    const rowsPerPage = 10;
    const page = useRef<number>(1);
    const { session } = useSession();
    let params = new URLSearchParams({
        rowsPerPage: `${rowsPerPage}`,
        page: `${page.current}`,
    });
    const {
        data: collaborations,
        error,
        fetchData,
    } = useAuthGetData<{ rows: Collaboration[]; count: number }>(
        `/collaboration/all?${params.toString()}`,
        {
            method: "GET",
        }
    );

    const [dataToDisplay, setDataToDisplay] = useState<Collaboration[]>([]);

    useEffect(() => {
        fetchData().then((res: any) => {
            setDataToDisplay(res.data.rows);
        });
    }, []);

    if (!collaborations) return <Spinner size="large" color="$green10" />;

    const ListEndLoader = () => {
        if (rowsPerPage * page.current < collaborations.data.count) {
            return <Spinner size="large" color="$green10" />;
        }
    };

    const handleReachEnd = async () => {
        page.current = page.current + 1;
        params = new URLSearchParams({
            rowsPerPage: `${rowsPerPage}`,
            page: `${page.current}`,
        });
        if (rowsPerPage * page.current > collaborations.data.count) return;
        // const response = await getData(
        //     `/collaboration/all?${params.toString()}`,
        //     session.data.tokens.token,
        //     {
        //         method: "GET",
        //     }
        // );
        // setDataToDisplay([...dataToDisplay, ...response.data.rows]);
    };

    return (
        <View>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <FlatList
                contentContainerStyle={{
                    paddingBottom: 50,
                    paddingTop: 50,
                }}
                data={dataToDisplay}
                initialNumToRender={rowsPerPage}
                keyExtractor={(item: Collaboration) => item.uid}
                renderItem={({ item }) => (
                    <CustomCard
                        loggedUser={session.data.userData.uid}
                        collaboration={item}
                    />
                )}
                onEndReached={() => handleReachEnd()}
                ListFooterComponent={ListEndLoader}
            />
        </View>
    );
}
