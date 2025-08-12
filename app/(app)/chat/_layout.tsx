import { useEffect, useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "tamagui";
import Colors from "../../../constants/Colors";
import { GripVertical, X } from "lucide-react-native";
import { useSession } from "../../hooks/session/authenticationProvider";
import EachMessage from "./common/EachMessage";
import { useWS } from "../../hooks/useWS";
import { router, useLocalSearchParams } from "expo-router";
import ChatTextArea from "./common/ChatTextArea";
import { ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import CustomFlatList from "../../components/FlatList/customFlatList";
import { useChat } from "../../hooks/useChat";
import { ChatroomUser, Message, ChatroomUserJunction } from "../../types/chat";
import { styles } from "./styles/chat";
import { CHAT_EVENTS } from "../../../constants/Chat";

const IS_LOADING_LIMIT = 5000;

export default function ChatLayout() {
  const { session } = useSession();
  const { emit, on, off } = useWS();
  const { chats, onlineUsers, updateSeen, addMoreMessages } = useChat();
  const { itemUid } = useLocalSearchParams();
  const chat = chats.find((chat: ChatroomUserJunction) => chat.uid === itemUid)?.chatroom;
  const messages: Message[] = chat?.messages;
  const userTalkingTo: string = chat?.chatroomUsers[0]?.userUid;
  const insets = useSafeAreaInsets();
  const [newMessage, setNewMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const parseUserUrls = () =>
    chat?.chatroomUsers.reduce(
      (acc: Record<string, string>, user: ChatroomUser) => ({
        ...acc,
        [user.userUid]: user.user.avatarUrl,
      }),
      {}
    );

  useEffect(() => {
    if (messages.length) {
      const messagesToUpdate: string[] = [];
      messages.forEach((message: Message) => {
        if (message.isSeen || message.userUid === session?.data?.userData?.uid) {
          return;
        } else {
          messagesToUpdate.push(message.uid);
          return;
        }
      });
      if (messagesToUpdate.length) {
        emit(CHAT_EVENTS.updateSeen, {
          messagesToUpdate,
          chatroomUid: chat.uid,
        });
        updateSeen(chat.uid);
      }
    }
    emit(CHAT_EVENTS.openChat, { chatroomUid: chat.uid });
    emit(CHAT_EVENTS.users, {});
  }, []);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout | null = null;

    const handleTyping = () => {
      setIsTyping(true);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    };

    on(`${CHAT_EVENTS.typing}:${chat.uid}`, handleTyping);
    on(`${CHAT_EVENTS.getMoreMessages}:${chat.uid}`, handleGetMoreMessages);

    return () => {
      off(`${CHAT_EVENTS.typing}:${chat.uid}`);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [on, off]);

  const handleGetMoreMessages = (messages: Message[]) => {
    addMoreMessages(messages, chat.uid);
    setIsLoading(false);
  };

  const handleSendMessage = () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return;

    const newMessageObject = {
      userUid: session?.data?.userData?.uid,
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
      chatroomUid: chat.uid,
    };
    emit(CHAT_EVENTS.chatMessage, newMessageObject);
    setNewMessage("");
  };

  const handleSetNewMessage = (data: string) => {
    emit(CHAT_EVENTS.typing, {
      chatroomUid: chat.uid,
    });
    setNewMessage(data);
  };

  const handleBack = () => {
    router.push("messages");
    emit(CHAT_EVENTS.closeChat, { chatroomUid: chat.uid });
  };

  const emptyComponent = <View></View>;

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  const handleLoadMore = () => {
    if (messages.length >= 50) {
      emit(CHAT_EVENTS.getMoreMessages, { fromDate: messages[messages.length - 1].createdAt, chatroomUid: chat.uid });

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, IS_LOADING_LIMIT);
    }
  };

  const sticky = (
    <View style={styles.stickyContainer}>
      <View onPress={handleBack} style={styles.backButton}>
        <X width={22} height={22} color={Colors.grayscale.border.darker} />
      </View>
      <View style={styles.usersAndBackgroundContainer}>
        <View style={styles.backgroundAvatar}></View>
        <View style={styles.usersInfoContainer}>
          <Text style={styles.chatUsers}>{chat.chatroomUsers?.map((user: ChatroomUser) => user.user.username).join(", ")}</Text>
          <View style={styles.userInfoContainer}>
            {onlineUsers.includes(userTalkingTo) && <View style={styles.onlineDot}></View>}
            <Text style={styles.userStatus}>{isTyping ? "Pisze..." : onlineUsers.includes(userTalkingTo) ? "Dostępny" : "Niedostępny"}</Text>
          </View>
        </View>
      </View>
      <View style={styles.menu}>
        <GripVertical width={16} height={16} color={Colors.grayscale.border.darker} />
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      {sticky}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.keyboardContainer}>
        <CustomFlatList<Message>
          inverted
          data={messages}
          shouldUseSpinner={false}
          ListFooterComponent={renderFooter}
          changesList={`${JSON.stringify(messages)}${isLoading}`}
          extraData={parseUserUrls()}
          renderItem={({ item }) => <EachMessage item={item} extraInfo={parseUserUrls()} loggedUser={session?.data?.userData?.uid} />}
          HeaderComponent={emptyComponent}
          StickyElementComponent={emptyComponent}
          style={{
            marginTop: Platform.OS === "ios" ? insets.top : insets.top + 40,
            marginBottom: -insets.bottom,
            flex: 1,
          }}
          onEndReached={handleLoadMore}
          flatListStyle={styles.messagesFlatList}
        />
        <ChatTextArea value={newMessage} onChangeText={handleSetNewMessage} sendMessage={handleSendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
