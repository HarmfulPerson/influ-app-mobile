import { Text, View } from "tamagui";
import Colors from "../../../../constants/Colors";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Image } from "expo-image";
import { returnUserImage } from "../../../../utils/user";
import { returnChatTime } from "../../../../utils/utils";

export default function EachMessage({
    item,
    extraInfo,
    loggedUser,
}: {
    item: any;
    extraInfo: any;
    loggedUser: any;
}) {
    const message = item;
    const messageBackgroundStyle = {
        backgroundColor:
            loggedUser === message.userUid
                ? Colors.grayscale.border.default
                : "#373137",
        borderRadius: 24,
        padding: 16,
        gap: 16,
        borderBottomRightRadius: loggedUser === message.userUid ? 8 : 24,
        borderBottomLeftRadius: loggedUser !== message.userUid ? 8 : 24,
    };
    const containerStyle = {
        alignItems: loggedUser === message.userUid ? "flex-end" : "flex-start",
        width: "100%",
    };
    const textColorStyle = {
        color:
            loggedUser === message.userUid
                ? Colors.grayscale.text.negative
                : Colors.grayscale.text.body,
    };

    return (
        <View key={message.uid} style={containerStyle}>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                {loggedUser !== message.userUid && (
                    <Image
                        source={returnUserImage(extraInfo[message.userUid])}
                        style={{
                            width: 24,
                            height: 24,
                            marginRight: 8,
                            borderRadius: 12,
                            marginLeft: 32,
                        }}></Image>
                )}
                <View style={containerStyle}>
                    <View style={messageBackgroundStyle}>
                        <Text style={textColorStyle}>{message.message}</Text>
                    </View>
                    <Text
                        color={Colors.grayscale.text.caption}
                        style={{
                            fontSize: 10,
                            lineHeight: 12,
                            marginTop: 4,
                        }}>
                        {returnChatTime(message.createdAt || new Date())}
                        {message.isSeen ? " Wyświetlono" : " Dostarczono"}
                    </Text>
                </View>
            </View>
        </View>
    );
}
