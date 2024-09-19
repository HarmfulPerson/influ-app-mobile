import { useState } from "react";
import axios from "axios";
import { useSession } from "./session/authenticationProvider";
import { useToastController } from "@tamagui/toast";

const useAuthPostData = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const { session } = useSession();
    const toast = useToastController();

    const postData = async (url: string, data: any) => {
        try {
            const response = await axios.post(
                `http://192.168.0.102:4000/api/v1${url}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session.data.tokens.token}`,
                    },
                }
            );
            setResponse(response.data);
            toast.show("Sukces", {
                message: "Pomyślnie dodano dane.",
                type: "success",
            });
            return response;
        } catch (error: any) {
            setError(error);
        }
    };

    return { response, error, postData };
};

export default useAuthPostData;
