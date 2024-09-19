import { useCallback } from "react";
import axios from "axios";

const useSmsService = () => {
    const url =
        "https://3de3-2a02-a310-c125-5f00-7b75-c00a-31f8-3deb.ngrok-free.app/gsm-service";
    const getCode = useCallback(async (phoneNumber: string) => {
        try {
            const response = await axios.post(url, { phoneNumber });

            return response;
        } catch (error) {
            console.error("Error getting code", error);
        }
    }, []);

    const useCode = useCallback(
        async (data: { phoneNumber: string; code: string }) => {
            try {
                const response = await axios.patch(url, data);

                return response;
            } catch (error) {
                console.error("Error using code:", error);
            }
        },
        []
    );

    return {
        getCode,
        useCode,
    };
};

export default useSmsService;
