import { useCallback, useState } from "react"

type UseFetchResponse<T> = {
    data: T | undefined;
    isLoading: boolean;
    error?: unknown;
    callAPI: (params?: RequestInit) => void;
}

export const useAPICall = <T>(url: string ): UseFetchResponse<T> => {
    const [data, setData] = useState<T | undefined>();
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const callAPI = useCallback(async(params:RequestInit={}) => {
        const controller = new AbortController();
        try{
            setIsLoading(true);
            const response = await fetch(url, { ...params });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            setData(responseData);
        }
        catch(err: any){ 
            setError(err);
        }
        finally{
            setIsLoading(false);
        }

        return () => controller.abort();
    }, [url]);

    return {data, isLoading, callAPI, error};
}