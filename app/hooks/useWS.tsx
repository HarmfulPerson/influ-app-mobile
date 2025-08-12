import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "./session/authenticationProvider";

interface SocketService {
  initializeSocket: () => void;
  emit: (event: string, data?: any) => void;
  on: (event: string, cb: (...args: any[]) => void) => void;
  off: (event: string) => void;
  disconnect: () => void;
  removeListener: (listenerName: string) => void;
  updateAccessToken: () => void;
  isSocketReady: boolean;
}

interface WSProviderProps {
  children: React.ReactNode;
}
const WSContext = createContext<SocketService | null>(null);
const SOCKET_URL = "ws://192.168.100.158:6000";

export const WSProvider = ({ children }: WSProviderProps) => {
  const [socketAccessToken, setSocketAccessToken] = useState(null);
  const [isSocketReady, setIsSocketReady] = useState(false);
  const { session } = useSession();
  const socket = useRef<Socket>();

  useEffect(() => {
    setSocketAccessToken(session?.data?.tokens?.token);
  }, [session]);

  useEffect(() => {
    if (!socketAccessToken) return;

    if (socket.current) {
      const currentToken = socket.current.io.opts.extraHeaders?.token;
      if (currentToken === socketAccessToken) {
        console.log("Token się nie zmienił, nie resetuję socketu");
        return;
      }

      console.log("Token się zmienił, rozłączam socket...");
      socket.current.close();
      socket.current = undefined;
      setIsSocketReady(false);
    }

    console.log("Łączę socket z nowym tokenem");
    socket.current = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["polling"],
      extraHeaders: {
        token: socketAccessToken || "",
      },
    });

    socket.current.on("connect", () => {
      setIsSocketReady(true);
    });

    socket.current.on("connect_error", (error: Error) => {
      if (error.message === "Authentiction error") {
        console.log("Auth connection error: ", error.message);
      }
      setIsSocketReady(false);
    });

    return () => {
      console.log("Zamykam socket przy unmount");
      socket.current?.close();
      setIsSocketReady(false);
    };
  }, [socketAccessToken]);

  const emit = (event: string, data = {}) => {
    if (socket.current && isSocketReady) {
      socket.current.emit(event, data);
    } else {
      console.warn("Socket is not ready or not initialized.");
    }
  };

  const on = (event: string, cb: (...args: any[]) => void) => {
    if (socket.current && isSocketReady) {
      socket.current.on(event, cb);
    } else {
      console.warn("Socket is not ready or not initialized.");
    }
  };

  const off = (event: string) => {
    if (socket.current && isSocketReady) {
      socket.current.off(event);
    } else {
      console.warn("Socket is not ready or not initialized.");
    }
  };

  const removeListener = (listenerName: string) => {
    if (socket.current && isSocketReady) {
      socket.current.removeListener(listenerName);
    } else {
      console.warn("Socket is not ready or not initialized.");
    }
  };

  const disconnect = () => {
    if (socket.current) {
      socket.current.close();
      socket.current = undefined;
      setIsSocketReady(false);
    }
  };

  const updateAccessToken = () => {
    setSocketAccessToken(session?.data?.userData?.uid);
  };

  const socketService = {
    initializeSocket: () => {},
    emit,
    on,
    off,
    disconnect,
    removeListener,
    updateAccessToken,
    isSocketReady,
  };

  return <WSContext.Provider value={socketService}>{children}</WSContext.Provider>;
};

export const useWS = () => {
  const socketService = useContext(WSContext);
  if (!socketService) {
    throw new Error("useWS must be used within a WSProvider");
  }
  return socketService;
};
