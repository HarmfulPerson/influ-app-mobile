import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "tamagui";
import CustomFlatList from "../../components/FlatList/customFlatList";
import Input from "../../components/Input/Input";
import { Search } from "lucide-react-native";
import Colors from "../../../constants/Colors";
import { styles } from "./styles/messages";
import EachChat from "../../components/EachChatComponent/EachChat";
import { useEffect, useState } from "react";
import AddButtonList from "../../components/AddButtonList/AddButtonList";
import { useAuthGetData } from "../../hooks/useGetData";
import { parseObjectToUrlParams } from "../../../utils/utils";
import useFilter from "../../hooks/useFilter";
import { URL } from "../../../constants/urls";
import { useSession } from "../../hooks/session/authenticationProvider";

export default function Chat() {
    const [chats, setChats] = useState<any>([]);
    const [count, setCount] = useState<number | null>(null);
    const { session } = useSession();
    const { fetchData: getChats } = useAuthGetData();
    const { page, rowsPerPage } = useFilter();
    useEffect(() => {
        handleFetchChats();
    }, []);

    async function handleFetchChats(): Promise<void> {
        const response = await getChats<{
            data: { count: number; rows: Array<any> };
        }>(
            `${URL.chatroom}?${parseObjectToUrlParams({
                page: page.toString(),
                rowsPerPage: rowsPerPage.toString(),
            })}`
        );

        setChats(response.data.data.rows);
        setCount(response.data.data.count);
    }

    const Header = (
        <View>
            <Text style={styles.title}>Chat</Text>
        </View>
    );

    const StickyElement = (
        <View style={styles.searchContainer}>
            <Input
                placeholder="Wyszukaj użytkownika..."
                styleInput={{
                    minHeight: 56,
                }}
                hasIconBackground={false}
                iconRight={
                    <Search
                        width={16}
                        strokeWidth={3}
                        height={16}
                        color={Colors.grayscale.border.disabled}
                    />
                }
            />
        </View>
    );
    return (
        <SafeAreaView edges={["top", "bottom"]} style={styles.safeAreaView}>
            <View style={styles.container}>
                <CustomFlatList<any>
                    data={chats}
                    shouldUseSpinner={false}
                    changesList={JSON.stringify(chats)}
                    renderItem={({ item }) => (
                        <EachChat
                            item={item}
                            loggedUser={session?.data?.userData?.uid}
                        />
                    )}
                    HeaderComponent={Header}
                    StickyElementComponent={StickyElement}
                />
            </View>
            <AddButtonList onButtonClick={() => console.log(1)} />
        </SafeAreaView>
    );
}
