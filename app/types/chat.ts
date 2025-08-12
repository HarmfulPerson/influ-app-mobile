import { CHAT_EVENTS } from "../../constants/Chat";
import { User } from "./user";

export type Message = {
  uid: string;
  message: string;
  userUid: string;
  chatroomUid: string;
  isSeen: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ChatroomUser = {
  uid: string;
  userUid: string;
  chatroomUid: string;
  createdAt: Date;
  updatedAt: Date;
  user: Pick<User, "uid" | "username" | "nameOfCompany" | "avatarUrl">;
};

export type Chatroom = {
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  chatroomUsers: ChatroomUser[];
  messages: Message[];
};

export type ChatroomUserJunction = {
  uid: string;
  userUid: string;
  chatroomUid: string;
  createdAt: Date;
  updatedAt: Date;
  chatroom: Chatroom;
};

export type ChatEventTypes = keyof typeof CHAT_EVENTS;
