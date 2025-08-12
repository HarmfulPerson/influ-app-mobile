import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ChatroomUserJunction, Message } from "../types/chat";
import { useWS } from "./useWS";
import { CHAT_EVENTS } from "../../constants/Chat";

interface ChatContextType {
  chats: any;
  setChats: (chat: ChatroomUserJunction[]) => void;
  addMessage: (message: Message) => void;
  openedChat: string;
  setOpenedChat: (chatUid: string) => void;
  updateSeen: (chatUid: string) => void;
  onlineUsers: string[];
  setOnlineUsers: (data: string[]) => void;
  handleAddNewOnlineUser: (userUid: string) => void;
  handleUserDisconnect: (userUid: string) => void;
  addMoreMessages: (messages: Message[], chatroomUid: string) => void;
  addChatToList: (chat: ChatroomUserJunction) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<ChatroomUserJunction[]>([]);
  const [openedChat, setOpenedChat] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<Array<string>>([]);
  const { emit } = useWS();
  const handleAddNewOnlineUser = (userUid: string) => {
    setOnlineUsers((prevOnlineUsers: string[]) => [...prevOnlineUsers, userUid]);
  };

  const handleUserDisconnect = (userUid: string) => {
    setOnlineUsers((prevOnlineUsers) => prevOnlineUsers.filter((user) => user !== userUid));
  };

  const addMessage = (message: Message) => {
    setChats((prevChats) => {
      const isChatroomPresent = prevChats.findIndex((eachChat) => eachChat.chatroom.uid === message.chatroomUid) > -1;
      if (!isChatroomPresent) {
        emit(CHAT_EVENTS.getEachChatroom, { chatroomUid: message.chatroomUid, pushToNewChat: false });
        return prevChats;
      }
      return prevChats.map((chat) =>
        chat.chatroom.uid === message.chatroomUid
          ? {
              ...chat,
              chatroom: {
                ...chat.chatroom,
                messages: [message, ...chat.chatroom.messages],
              },
            }
          : chat
      );
    });
  };

  const addChatToList = (chat: ChatroomUserJunction) => {
    setChats((prevChats) => {
      const presentChats = prevChats.map((chat) => chat.uid);
      if (!presentChats.includes(chat.uid)) {
        return [chat, ...prevChats];
      }
      return prevChats;
    });
  };

  const updateSeen = (chatroomUid: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.chatroom.uid === chatroomUid
          ? {
              ...chat,
              chatroom: {
                ...chat.chatroom,
                messages: chat.chatroom.messages.map((message: Message) => ({
                  ...message,
                  isSeen: true,
                })),
              },
            }
          : chat
      )
    );
  };

  const addMoreMessages = (messages: Message[], chatroomUid: string) => {
    setChats((prevChats) =>
      prevChats.map((chat: ChatroomUserJunction) =>
        chat.chatroom.uid === chatroomUid
          ? {
              ...chat,
              chatroom: {
                ...chat.chatroom,
                messages: [...chat.chatroom.messages, ...messages],
              },
            }
          : chat
      )
    );
  };
  return <ChatContext.Provider value={{ chats, addChatToList, setChats, addMessage, openedChat, setOpenedChat, updateSeen, onlineUsers, setOnlineUsers, handleAddNewOnlineUser, handleUserDisconnect, addMoreMessages }}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
