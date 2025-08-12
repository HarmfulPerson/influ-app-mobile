import React, { useMemo } from "react";
import { Text, View } from "tamagui";
import Colors from "../../../../constants/Colors";
import { Image } from "expo-image";
import { returnUserImage } from "../../../../utils/user";
import { returnChatTime } from "../../../../utils/utils";
import { Message } from "../../../types/chat";
import { styles } from "../styles/eachMessage";

const EachMessage = ({ item, extraInfo, loggedUser }: { item: Message; extraInfo: Record<string, string>; loggedUser: string }) => {
  const message = useMemo(() => item, [item]);

  const messageBackgroundStyle = {
    backgroundColor: loggedUser === message.userUid ? Colors.grayscale.border.default : "#373137",
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
    color: loggedUser === message.userUid ? Colors.grayscale.text.negative : Colors.grayscale.text.body,
  };

  return (
    <View key={message.uid} style={containerStyle}>
      <View style={styles.container}>
        {loggedUser !== message.userUid && <Image source={returnUserImage(extraInfo[message.userUid])} style={styles.messageAvatarUrl} />}
        <View style={containerStyle}>
          <View style={messageBackgroundStyle}>
            <Text style={textColorStyle}>{message.message}</Text>
          </View>
          <Text color={Colors.grayscale.text.caption} style={styles.text}>
            {returnChatTime(message.createdAt || new Date())}
            {message.isSeen ? " Wyświetlono" : " Dostarczono"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(EachMessage);
