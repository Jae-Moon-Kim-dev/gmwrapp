'use client';
import { UseFetchReturn } from '@/app/types/common/common';
import { useState, useEffect, useCallback } from 'react';

const useFetch = <T>(url: string, options?: RequestInit):UseFetchReturn<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    
    const fetchData = useCallback(async (url:string, options?: RequestInit):Promise<void> => {
        setIsLoading(true);
        try {
            let result = null;
            await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}${url}`, options)
                .then(res => res.json())
                .then(res => {
                const { data } = res;
                    result = data;
                });
            
            setData(result);
          } catch ( e ) {
            setError(Error.call(e));
          } finally {
            setIsLoading(false);
          }
    }, [url]);

    useEffect(() => {
        fetchData(url, options); 
    },[url, options]);

    return { data, isLoading, error };
};

export default useFetch;