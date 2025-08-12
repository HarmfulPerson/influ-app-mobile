import { Text, View } from "tamagui";
import { router } from "expo-router";
import { ImageBackground } from "react-native";
import { returnUserImage } from "../../../utils/user";
import { returnChatTime } from "../../../utils/utils";
import { styles } from "./styles";
import { ChatroomUserJunction } from "../../types/chat";

const EachChat = ({ item, loggedUser }: { item: ChatroomUserJunction; loggedUser: string }) => {
  const returnLastMessageFontWeight = item.chatroom.messages[0]?.userUid !== loggedUser && item.chatroom.messages.length && !item.chatroom.messages[0]?.isSeen ? "700" : "400";

  return (
    <View
      onPress={() => {
        router.push({ pathname: "/chat", params: { itemUid: item.uid } });
      }}
      style={styles.container}
    >
      <ImageBackground
        source={{
          uri: returnUserImage(item.chatroom.chatroomUsers[0].user.avatarUrl),
        }}
        style={styles.imageContainer}
        imageStyle={styles.image}
      ></ImageBackground>
      <View style={styles.usernameAndLastMessageContainer}>
        <Text style={styles.usernames}>{item.chatroom.chatroomUsers.map((user: any) => user.user.username).join(", ")}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" fontWeight={returnLastMessageFontWeight} style={styles.lastMessage}>
          {loggedUser === item.chatroom.messages[0]?.userUid ? "Ty: " : ""}
          {item.chatroom.messages[0]?.message ?? "(Ten chat jest pusty)"}
        </Text>
      </View>
      <View>
        <Text style={styles.lastMessageTime}>{item.chatroom.messages[0]?.createdAt && returnChatTime(item.chatroom.messages[0].createdAt)}</Text>
      </View>
    </View>
  );
};
export default EachChat;
