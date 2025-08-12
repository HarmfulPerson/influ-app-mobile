import { Text, View } from "tamagui";
import { Search, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { AxiosResponse } from "axios";
import { URL } from "../../../../constants/urls";
import useFilter from "../../../hooks/useFilter";
import Input from "../../Input/Input";
import Colors from "../../../../constants/Colors";
import FlatListUserItem from "../../FlatListUserItem/FlatListUserItem";
import { User } from "../../../types/user";
import { RequestData } from "../../../types/common";
import { parseObjectToUrlParams } from "../../../../utils/utils";
import { useAuthGetData } from "../../../hooks/useGetData";
import useAuthPostData from "../../../hooks/usePostAuthData";
import { useSession } from "../../../hooks/session/authenticationProvider";
import { ChatroomUserJunction } from "../../../types/chat";
import { styles } from "../styles/inviteUserPicker";
import { useWS } from "../../../hooks/useWS";
import { CHAT_EVENTS } from "../../../../constants/Chat";
import { router } from "expo-router";

type Props = {
  closeModal: () => void;
};

const InviteUserPicker = (props: Props) => {
  const { closeModal } = props;
  const { page, updatePage, rowsPerPage } = useFilter();
  const { fetchData } = useAuthGetData();
  const { emit } = useWS();
  const { postData: createChatroom } = useAuthPostData();
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [influencersToPick, setInfluencersToPick] = useState<Array<User>>([]);
  const handleChangeInput = (text: string): void => {
    setSearchText(text);
  };
  const [count, setCount] = useState(0);
  const handleFetchData = () => {
    fetchData<{
      data: { count: number; rows: Array<User> };
    }>(
      `${URL.user}?${parseObjectToUrlParams({
        ...stringifyFilterData(),
        page: page.toString(),
        rowsPerPage: rowsPerPage.toString(),
      })}`
    )
      .then(
        (
          response: RequestData<{
            count: number;
            rows: Array<User>;
          }>
        ) => {
          setInfluencersToPick(response.data.data.rows);
          setCount(response.data.data.count);
        }
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsLoading(true);
    setInfluencersToPick([]);
    const timer = setTimeout(() => {
      if (searchText.length !== 0) {
        handleFetchData();
      } else if (searchText.length === 0) {
        setInfluencersToPick([]);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const handleReachEnd = async () => {
    if (count < rowsPerPage * page) return;
    updatePage(page + 1);
    const response: AxiosResponse = await fetchData<RequestData<{ count: number; rows: Array<User> }>>(
      `${URL.user}?${parseObjectToUrlParams({
        ...stringifyFilterData(),
        page: (page + 1).toString(),
        rowsPerPage: rowsPerPage.toString(),
      })}`
    );
    if (response.status === 200) {
      updatePage(page + 1);
      setInfluencersToPick([...influencersToPick, ...response?.data.data.rows]);
    }
  };

  const stringifyFilterData = () => ({
    ...(searchText !== undefined && {
      username: searchText,
    }),
  });

  const handleAddChat = async (userUid: string) => {
    const result = await createChatroom(
      `${URL.chatroom}`,
      {
        uids: [userUid],
      },
      false
    );
    if (result?.status === 200) {
      const chatroomUser = result.data.data.chatroomUsers.find((user: ChatroomUserJunction) => user.userUid === session?.data?.userData?.uid);
      emit(CHAT_EVENTS.addUsersToChatroom, { userUids: result.data.data.chatroomUsers.map((chatroomUser: ChatroomUserJunction) => chatroomUser.userUid), chatroomUid: result.data.data.uid });
      emit(CHAT_EVENTS.getEachChatroom, { chatroomUserUid: chatroomUser.uid, pushToNewChat: true });
      closeModal();
    }
  };

  const iconRight = (
    <View style={styles.iconRight}>
      <X width={12} height={12} color={Colors.grayscale.surface.darker} />
    </View>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" />;
  };

  return (
    <>
      <Text style={styles.title}>Wybierz użytkownika</Text>
      <Text style={styles.subtitle}>Wyszukaj użytkownika, z którym chcesz porozmawiać</Text>
      <View style={styles.searchInput}>
        <Input placeholder="Szukaj..." value={searchText} iconRight={iconRight} onChangeText={handleChangeInput} onIconRightCick={() => setSearchText("")} iconLeft={<Search width={16} height={16} color={Colors.grayscale.border.disabled} />} />
        {!!!searchText.length && !isLoading && <Text style={styles.inputInfo}>Wpisz w wyszukiwarkę poszukiwanego użytkownika.</Text>}
        {!!influencersToPick && (
          <View style={styles.userListContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={influencersToPick}
              renderItem={(item: { item: User }) => <FlatListUserItem onEachItemClick={(user) => handleAddChat(user.uid)} shouldOpenModal item={item} buttonDisabled={false} />}
              ListEmptyComponent={<></>}
              keyExtractor={(item: User) => item.uid}
              onEndReached={() => handleReachEnd()}
              ListFooterComponent={renderFooter}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default InviteUserPicker;
