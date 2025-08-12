import { ChatEventTypes } from "./chat";

export type RequestData<T> = {
  data: {
    data: T;
  };
};
export type SocketEvents = ChatEventTypes;
