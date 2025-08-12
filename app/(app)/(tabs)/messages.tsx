import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "tamagui";
import CustomFlatList from "../../components/FlatList/customFlatList";
import Input from "../../components/Input/Input";
import { Search } from "lucide-react-native";
import Colors from "../../../constants/Colors";
import { styles } from "./styles/messages";
import EachChat from "../../components/EachChatComponent/EachChat";
import { useContext, useEffect } from "react";
import AddButtonList from "../../components/AddButtonList/AddButtonList";
import { useSession } from "../../hooks/session/authenticationProvider";
import { useWS } from "../../hooks/useWS";
import { useChat } from "../../hooks/useChat";
import { ListenersContext } from "../_layout";
import { ChatroomUserJunction, Message } from "../../types/chat";
import { CHAT_EVENTS } from "../../../constants/Chat";
import NewChatModal from "../../components/NewChatModal/NewChatModal";
import { router } from "expo-router";

export default function Chat() {
  const { session } = useSession();
  const { chats } = useChat();
  const { emit } = useWS();

  const { setChats, addMessage, updateSeen, setOnlineUsers, handleAddNewOnlineUser, handleUserDisconnect, addChatToList } = useChat();
  const { on, off, isSocketReady } = useWS();
  const isListenersAdded = useContext(ListenersContext);

  useEffect(() => {
    if (!isSocketReady || !isListenersAdded || isListenersAdded.current) return;
    emit(CHAT_EVENTS.getChats, {});

    on(CHAT_EVENTS.getChats, (data: { count: number; rows: ChatroomUserJunction[] }) => {
      setChats(data.rows);
    });
    on(CHAT_EVENTS.updateSeen, (data: { chatroomUid: string }) => {
      updateSeen(data.chatroomUid);
    });
    on(CHAT_EVENTS.chatMessage, (data: Message) => {
      //w add message zrobić że jeśli nie ma gdzie dodać to wysłać emit newChat
      addMessage(data);
    });
    on(CHAT_EVENTS.users, (data: string[]) => {
      setOnlineUsers(data);
    });
    on(CHAT_EVENTS.users, (data: string[]) => {
      setOnlineUsers(data);
    });
    on(CHAT_EVENTS.newChat, (data: ChatroomUserJunction) => {
      addChatToList(data);
    });
    on(CHAT_EVENTS.getEachChatroom, (data: { data: ChatroomUserJunction; pushToNewChat: boolean }) => {
      addChatToList(data.data);
      if (data.pushToNewChat) {
        router.push({ pathname: "/chat", params: { itemUid: data.data.uid } });
      }
    });
    on(CHAT_EVENTS.userJoin, (data: { userUid: string }) => handleAddNewOnlineUser(data.userUid));
    on(CHAT_EVENTS.userDisconnect, (data: { userUid: string }) => handleUserDisconnect(data.userUid));

    isListenersAdded.current = true;

    return () => {
      off(CHAT_EVENTS.getChats);
      off(CHAT_EVENTS.updateSeen);
      off(CHAT_EVENTS.chatMessage);
      off(CHAT_EVENTS.users);
      off(CHAT_EVENTS.userJoin);
      off(CHAT_EVENTS.userDisconnect);

      isListenersAdded.current = false;
    };
  }, [isSocketReady]);

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
        iconRight={<Search width={16} strokeWidth={3} height={16} color={Colors.grayscale.border.disabled} />}
      />
    </View>
  );

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeAreaView}>
      <View style={styles.container}>
        <CustomFlatList<ChatroomUserJunction> data={chats} shouldUseSpinner={false} changesList={JSON.stringify(chats)} renderItem={({ item }) => <EachChat key={item.uid} item={item} loggedUser={session?.data?.userData?.uid} />} HeaderComponent={Header} StickyElementComponent={StickyElement} />
      </View>
      <NewChatModal />
    </SafeAreaView>
  );
}
