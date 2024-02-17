import React from "react";
import { useStorageState } from "./useStorageState";
import { LoginData } from "../../types/signIn";
import axios from "axios";

const AuthContext = React.createContext<{
    signIn: (loginData: LoginData) => Promise<void>;
    signOut: () => void;
    session?: any;
    isLoading: boolean;
}>({
    signIn: async () => {},
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error(
                "useSession must be wrapped in a <SessionProvider />"
            );
        }
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");

    return (
        <AuthContext.Provider
            value={{
                signIn: async (loginData: LoginData) => {
                    const response = await axios.post(
                        "http://192.168.0.101:4000/api/v1/auth/signIn",
                        loginData
                    );
                    setSession(response.data);
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}
