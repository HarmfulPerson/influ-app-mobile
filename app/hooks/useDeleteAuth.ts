import { useState } from "react";
import axios from "axios";
import { useSession } from "./session/authenticationProvider";
import { useToastController } from "@tamagui/toast";

const useDeleteAuth = <T>() => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState(null);
    const { session } = useSession();
    const toast = useToastController();

    const deleteData = async (url: string) => {
        try {
            const response = await axios.delete(
                `http://192.168.0.103:4000/api/v1${url}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session.data.tokens.token}`,
                    },
                }
            );
            setResponse(response.data);
            toast.show("Sukces", {
                message: "Pomyślnie usunięto dane.",
                type: "success",
            });
        } catch (error: any) {
            setError(error);
        }
    };

    return { response, error, deleteData };
};

export default useDeleteAuth;
