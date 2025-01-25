import { Text, View } from "tamagui";
import Colors from "../../../constants/Colors";
import { router } from "expo-router";
import { ImageBackground } from "react-native";
import { returnUserImage } from "../../../utils/user";
import { returnChatTime } from "../../../utils/utils";

const EachChat = ({ item, loggedUser }: { item: any; loggedUser: any }) => {
    const lastMessage = item.chatroom.messages[0];
    const isLastMessageYours = loggedUser === lastMessage.userUid;

    return (
        <View
            onPress={() =>
                router.push({
                    pathname: "/chat",
                    params: {
                        messages: JSON.stringify(item.chatroom),
                    },
                })
            }
            style={{
                minWidth: "100%",
                marginTop: 16,
                maxWidth: "100%",
                flexDirection: "row",
            }}>
            <ImageBackground
                source={{
                    uri: returnUserImage(
                        item.chatroom.chatroomUsers[0].user.avatarUrl
                    ),
                }}
                style={{
                    width: 48,
                    height: 48,
                    marginRight: 16,
                }}
                imageStyle={{ borderRadius: 24 }}></ImageBackground>
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: 1,
                }}>
                <Text
                    style={{
                        fontFamily: "PoppinsSemiBold",
                        fontSize: 16,
                        color: Colors.grayscale.text.body,
                        lineHeight: 19.2,
                    }}>
                    {item.chatroom.chatroomUsers
                        .map((user: any) => user.user.username)
                        .join(", ")}
                </Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    fontWeight={
                        !isLastMessageYours && !lastMessage.isSeen
                            ? "700"
                            : "400"
                    }
                    style={{
                        fontSize: 12,
                        color: Colors.grayscale.text.caption,
                        lineHeight: 14.4,
                    }}>
                    {isLastMessageYours ? "Ty: " : ""}
                    {lastMessage.message ?? "(Ten chat jest pusty)"}
                </Text>
            </View>
            <View>
                <Text
                    style={{
                        color: Colors.grayscale.surface.disabled,
                        fontSize: 12,
                        lineHeight: 14.4,
                    }}>
                    {returnChatTime(item.chatroom.messages[0]?.createdAt)}
                </Text>
            </View>
        </View>
    );
};
export default EachChat;
