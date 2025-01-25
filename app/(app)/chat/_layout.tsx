import { createContext, useEffect, useRef, useState } from "react";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ScrollView, Text, View } from "tamagui";
import Colors from "../../../constants/Colors";
import { GripVertical, SendHorizontal, X } from "lucide-react-native";
import Input from "../../components/Input/Input";
import { useSession } from "../../hooks/session/authenticationProvider";
import { navigateBack } from "../../../utils/utils";
import EachMessage from "./common/EachMessage";
import { useWS } from "../../hooks/useWS";
import { router, useLocalSearchParams } from "expo-router";
import ChatTextArea from "./common/ChatTextArea";
import { KeyboardAvoidingView, Platform } from "react-native";
import CustomFlatList from "../../components/FlatList/customFlatList";
import { User } from "../../types/user";

export default function ChatLayout() {
    const { session } = useSession();
    const { emit, on, off } = useWS();
    const test = useLocalSearchParams();
    const [messages, setMessages] = useState(
        JSON.parse(test.messages as any).messages
    );
    const insets = useSafeAreaInsets();
    const [isInitialEnter, setIsInitialEnter] = useState(true);
    const [onlineUsers, setOnlineUsers] = useState<Array<string>>([]);
    const userTalkingTo = JSON.parse(test.messages as any).chatroomUsers[0]
        ?.userUid;
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const parseUserUrls = () =>
        JSON.parse(test.messages as any).chatroomUsers.reduce(
            (acc: Record<string, string>, user: any) => ({
                ...acc,
                [user.userUid]: user.user.avatarUrl,
            }),
            {}
        );

    useEffect(() => {
        console.log(isInitialEnter);
        if (messages.length && isInitialEnter) {
            const messagesToUpdate: string[] = [];
            const modifiedMessages = messages.map((message: any) => {
                if (
                    message.isSeen ||
                    message.userUid === session?.data?.userData?.uid
                ) {
                    return message;
                } else {
                    messagesToUpdate.push(message.uid);
                    return { ...message, isSeen: true };
                }
            });
            console.log(modifiedMessages[0].message);
            emit("updateSeen", {
                messagesToUpdate,
                chatroomUid: JSON.parse(test.messages as any).uid,
            });
            setMessages(modifiedMessages);
            setIsInitialEnter(false);
        }
    }, [messages]);

    useEffect(() => {
        emit("users", {});
    }, []);

    useEffect(() => {
        const handleMessage = (data: any) => {
            setMessages((prevMessages: any) => [data, ...prevMessages]);
        };
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

        on("chatMessage", handleMessage);
        on("typing", handleTyping);
        on("updateSeen", handleUpdateSeen);
        on("users", (data: any) => setOnlineUsers(data));
        on("userJoin", (data: any) => handleAddNewOnlineUser(data.userUid));
        on("userDisconnect", (data: any) => handleUserDisconnect(data.userUid));

        return () => {
            off("chatMessage");
            off("users");
            off("typing");
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [on, off]);

    const handleUpdateSeen = (data: Array<string>) => {
        console.log("yyyy", messages[0].message);
        setMessages(
            messages.map((message: any) => ({ ...message, isSeen: true }))
        );
    };

    const handleAddNewOnlineUser = (userUid: string) => {
        setOnlineUsers([...onlineUsers, userUid]);
    };

    const handleUserDisconnect = (userUid: string) => {
        setOnlineUsers(onlineUsers.filter((user: string) => user !== userUid));
    };

    const handleSendMessage = () => {
        const trimmedMessage = newMessage.trim();
        if (!trimmedMessage) return;

        const newMessageObject = {
            userUid: session?.data?.userData?.uid,
            message: trimmedMessage,
            createdAt: new Date().toISOString(),
            chatroomUid: JSON.parse(test.messages as any).uid,
        };
        emit("chatMessage", newMessageObject);

        setNewMessage("");
    };

    const handleSetNewMessage = (data: string) => {
        emit("typing", {
            chatroomUid: JSON.parse(test.messages as any).uid,
        });
        setNewMessage(data);
    };

    const sticky = (
        <View
            style={{
                minWidth: "100%",
                flexDirection: "row",
                backgroundColor: Colors.grayscale.surface.darker,
                zIndex: 5,
            }}>
            <View
                onPress={() => router.push("messages")}
                style={{
                    width: 44,
                    height: 44,
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 12,
                    gap: 8,
                    borderColor: Colors.grayscale.surface.subtle,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <X
                    width={22}
                    height={22}
                    color={Colors.grayscale.border.darker}
                />
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                    style={{
                        height: 44,
                        width: 44,
                        borderRadius: 22,
                        backgroundColor: "blue",
                        marginLeft: 16,
                    }}></View>
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        marginLeft: 16,
                    }}>
                    <Text
                        style={{
                            color: Colors.grayscale.text.title,
                            fontSize: 20,
                            lineHeight: 24,
                            fontFamily: "PoppinsSemiBold",
                        }}>
                        {JSON.parse(test.messages as any)
                            .chatroomUsers.map(
                                (user: any) => user.user.username
                            )
                            .join(", ")}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            textAlign: "center",
                        }}>
                        {onlineUsers.includes(userTalkingTo) && (
                            <View
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    marginRight: 4,
                                    marginBottom: 2,
                                    backgroundColor:
                                        Colors.success.surface.lighter,
                                }}></View>
                        )}
                        <Text
                            style={{
                                fontSize: 12,
                                lineHeight: 14.4,
                                color: Colors.grayscale.text.disabled,
                            }}>
                            {isTyping
                                ? "Pisze..."
                                : onlineUsers.includes(userTalkingTo)
                                ? "Dostępny"
                                : "Niedostępny"}
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    width: 44,
                    height: 44,
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 12,
                    gap: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: Colors.grayscale.surface.subtle,
                }}>
                <GripVertical
                    width={16}
                    height={16}
                    color={Colors.grayscale.border.darker}
                />
            </View>
        </View>
    );

    const header = <View></View>;

    return (
        <SafeAreaView
            edges={["top", "bottom"]}
            style={{
                flex: 1,
                paddingHorizontal: 24,
                backgroundColor: Colors.grayscale.surface.darker,
            }}>
            {sticky}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{
                    flexGrow: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: Colors.grayscale.surface.darker,
                    paddingBottom: 16,
                }}>
                <CustomFlatList<any>
                    inverted
                    data={messages}
                    shouldUseSpinner={false}
                    changesList={JSON.stringify(messages)}
                    extraData={parseUserUrls()}
                    renderItem={({ item }) => (
                        <EachMessage
                            item={item}
                            extraInfo={parseUserUrls()}
                            loggedUser={session?.data?.userData?.uid}
                        />
                    )}
                    HeaderComponent={header}
                    StickyElementComponent={header}
                    style={{
                        marginTop:
                            Platform.OS === "ios"
                                ? insets.top
                                : insets.top + 40,
                        marginBottom: -insets.bottom,
                        flex: 1,
                    }}
                    flatListStyle={{
                        paddingTop: 0,
                        paddingBottom: 0,
                        marginTop: 0,
                        marginBottom: 0,
                    }}
                />
                <ChatTextArea
                    value={newMessage}
                    onChangeText={handleSetNewMessage}
                    sendMessage={handleSendMessage}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
