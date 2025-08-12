import { useState } from "react";
import { TextArea, View } from "tamagui";
import Colors from "../../../../constants/Colors";
import { SendHorizonal } from "lucide-react-native";
import { styles } from "../styles/chatTextArea";

export default function ChatTextArea(props: any) {
  const { value, onChangeText, sendMessage } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [marginBottom, setMarginBottom] = useState(4);
  const containerStyles = { ...styles.container, borderColor: isFocused ? Colors.primary.border.default : Colors.grayscale.surface.disabled };

  return (
    <View style={containerStyles}>
      <View style={styles.textAreaContainer}>
        <TextArea
          value={value}
          multiline
          borderWidth={0}
          margin={0}
          padding={0}
          onChangeText={onChangeText}
          placeholder="Wpisz wiadomość..."
          numberOfLines={1}
          onContentSizeChange={(e) => {
            if (e.nativeEvent.contentSize.height / 20 > 2) setMarginBottom(4);
            else setMarginBottom(5);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.textArea}
        />

        <View style={styles.sendButton} onPress={sendMessage}>
          <SendHorizonal height={16} width={16} style={{ marginBottom: marginBottom }} color={isFocused ? Colors.grayscale.text.body : Colors.grayscale.surface.disabled} />
        </View>
      </View>
    </View>
  );
}
