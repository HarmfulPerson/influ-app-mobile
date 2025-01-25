import { useState } from "react";
import { TextArea, View } from "tamagui";
import Colors from "../../../../constants/Colors";
import { SendHorizonal } from "lucide-react-native";

export default function ChatTextArea(props: any) {
    const { value, onChangeText, sendMessage } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [marginBottom, setMarginBottom] = useState(4);
    return (
        <View
            style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: isFocused
                    ? Colors.primary.border.default
                    : Colors.grayscale.surface.disabled,
                borderRadius: 8,
                paddingLeft: 16,
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: Colors.grayscale.surface.darker,
                justifyContent: "flex-end",
                alignItems: "flex-end",
            }}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                }}>
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
                        if (e.nativeEvent.contentSize.height / 20 > 2)
                            setMarginBottom(4);
                        else setMarginBottom(5);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                        width: "90%",
                        maxHeight: 120,
                        fontSize: 16,
                        padding: 0,
                        margin: 0,
                        color: "white",
                        backgroundColor: Colors.grayscale.surface.darker,
                        borderRadius: 8,
                        justifyContent: "center",
                    }}
                />

                <View
                    style={{
                        justifyContent: "flex-end",
                        alignSelf: "stretch",
                        marginLeft: 8,
                        width: "10%",
                    }}
                    onPress={sendMessage}>
                    <SendHorizonal
                        height={16}
                        width={16}
                        style={{ marginBottom: marginBottom }}
                        color={
                            isFocused
                                ? Colors.grayscale.text.body
                                : Colors.grayscale.surface.disabled
                        }
                    />
                </View>
            </View>
        </View>
    );
}
