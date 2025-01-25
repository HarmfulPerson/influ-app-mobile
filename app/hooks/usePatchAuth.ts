import { useState } from "react";
import axios from "axios";
import { useSession } from "./session/authenticationProvider";
import { useToastController } from "@tamagui/toast";

const useAuthPatchData = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const { session } = useSession();
    const toast = useToastController();

    const patchData = async (url: string, data: any) => {
        try {
            const response = await axios.patch(
                `http://192.168.0.103:4000/api/v1${url}`,
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
                message: "Pomyślnie zaktualizowane dane.",
                type: "success",
            });
        } catch (error: any) {
            setError(error);
        }
    };

    return { response, error, patchData };
};

export default useAuthPatchData;
