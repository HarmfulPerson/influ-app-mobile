import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSession } from "./session/authenticationProvider";

export const getData = async <T>(
    url: string,
    options?: AxiosRequestConfig
): Promise<T | void> => {
    try {
        const response: AxiosResponse = await axios(
            `http://192.168.0.102:4000/api/v1${url}`,
            {
                ...options,
                headers: {
                    ...options?.headers,
                },
            }
        );
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) console.log(err);
    }
};

export const useAuthGetData = () => {
    const [data, setData] = useState<{ data: any } | null>(null);
    const [isLoading, setIsLoading] = useState<any | null>(false);
    const [error, setError] = useState<any | null>(null);
    const { session } = useSession();

    const fetchData = async <T>(
        url: string,
        options?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
        setIsLoading(true);
        try {
            const response: AxiosResponse = await axios(
                `http://192.168.0.102:4000/api/v1${url}`,
                {
                    ...options,
                    headers: {
                        ...options?.headers,
                        Authorization: `Bearer ${session.data.tokens.token}`,
                    },
                }
            );
            setIsLoading(false);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    return { data, isLoading, error, fetchData };
};
