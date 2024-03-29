import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSession } from "./session/authenticationProvider";

export const getData = async (
    url: string,
    token: string,
    options?: AxiosRequestConfig
) => {
    try {
        const response: AxiosResponse = await axios(
            `http://192.168.0.101:4000/api/v1${url}`,
            {
                ...options,
                headers: {
                    ...options?.headers,
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const useAuthGetData = <T>(
    url: string,
    options?: AxiosRequestConfig,
    functionName?: string
) => {
    const [data, setData] = useState<{ data: T } | null>(null);
    const [isLoading, setIsLoading] = useState<any | null>(false);
    const [error, setError] = useState<any | null>(null);
    const { session } = useSession();

    const fetchData = async () => {
        setIsLoading(true);
        setData(null);
        try {
            const response: AxiosResponse = await axios(
                `http://192.168.0.101:4000/api/v1${url}`,
                {
                    ...options,
                    headers: {
                        ...options?.headers,
                        Authorization: `Bearer ${session.data.tokens.token}`,
                    },
                }
            );
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            return err;
        }
    };

    return { data, isLoading, error, [functionName || "fetchData"]: fetchData };
};
