import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "./session/authenticationProvider";

interface SocketService {
    initializeSocket: () => void;
    emit: (event: string, data?: Record<string, any>) => void;
    on: (event: string, cb: (...args: any[]) => void) => void;
    off: (event: string) => void;
    disconnect: () => void;
    removeListener: (listenerName: string) => void;
    updateAccessToken: () => void;
}

interface WSProviderProps {
    children: React.ReactNode;
}
const WSContext = createContext<SocketService | null>(null);
const SOCKET_URL = "ws://192.168.0.103:6000";

export const WSProvider = ({ children }: WSProviderProps) => {
    const [socketAccessToken, setSocketAccessToken] = useState(null);
    const { session } = useSession();
    const socket = useRef<Socket>();
    useEffect(() => {
        setSocketAccessToken(session?.data?.userData?.uid);
    }, []);

    useEffect(() => {
        if (socketAccessToken) {
            socket.current = io(SOCKET_URL, {
                withCredentials: true,
                transports: ["websocket"],
                extraHeaders: {
                    token: socketAccessToken || "", // Pass the token as a header
                },
            });

            socket.current.on("connect_error", (error: Error) => {
                if (error.message === "Authentiction error") {
                    console.log("Auth connection error: ", error.message);
                }
            });
        }

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, [socketAccessToken]);

    const emit = (event: string, data = {}) => {
        socket.current?.emit(event, data);
    };

    const on = (event: string, cb: (...args: any[]) => void) => {
        socket.current?.on(event, cb);
    };

    const off = (event: string) => {
        socket.current?.off(event);
    };

    const removeListener = (listenerName: string) => {
        socket.current?.removeListener(listenerName);
    };

    const disconnect = () => {
        if (socket.current) {
            socket.current.close();
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
    };

    return (
        <WSContext.Provider value={socketService}>
            {children}
        </WSContext.Provider>
    );
};

export const useWS = () => {
    const socketService = useContext(WSContext);
    if (!socketService) {
        throw new Error("useWS must be used within a WSProvider");
    }
    return socketService;
};
