import { useState } from "react";
import axios from "axios";
import { useToastController } from "@tamagui/toast";

const usePostData = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const toast = useToastController();

    const postData = async (url: string, data: any, showToast = true) => {
        try {
            const response = await axios.post(
                `http://192.168.0.103:4000/api/v1${url}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setResponse(response.data);
            if (showToast)
                toast.show("Sukces", {
                    message: "Pomyślnie dodano dane.",
                    type: "success",
                });

            return response.data;
        } catch (error: any) {
            console.log(error);
            setError(error);
        }
    };

    return { response, error, postData };
};

export default usePostData;
