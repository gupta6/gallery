import { useState } from "react"

type UseFetchResponse<T> = {
    data: T | undefined;
    isLoading: boolean;
    error?: unknown;
    callAPI: (params?: RequestInit) => void;
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const useAPICall = <T>(url: string ): UseFetchResponse<T> => {
    const [data, setData] = useState<T | undefined>();
    const [error, setError] = useState<unknown>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const callAPI = async(params?: RequestInit) => {
        try{
            setIsLoading(true);
            setData(undefined);
            await delay(5000);
            const response = await fetch(url, params && {
                ...params
            });
            const data = await response.json();
            setData(data);
        }
        catch(err: unknown){ 
            setError(err);
        }
        finally{
            setIsLoading(false);
        }
    }

    return {data, isLoading, callAPI, error};
}