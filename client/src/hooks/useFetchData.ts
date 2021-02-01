import Axios from 'axios';
import { HttpMethod } from 'models/httpMethod';
import { LoadingStatus } from 'models/loadingStatus';
import { useEffect, useState } from 'react';

type Request = { url: string; method: HttpMethod; data?: any };
type Return<T> = { response: T | undefined; loadingStatus: LoadingStatus };

/**
 * Perform a GET request to a given URL and keep track of the request status for UI purposes
 * @param url the url to perform the get request
 * @param method the HTTP method being used
 * @param retryCount increment this number to cause a retry
 */
export function useFetchData<T>(
    request: Request,
    retryCount?: number
): Return<T> {
    const [response, setResponse] = useState<T>();
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
        'Not started'
    );

    useEffect(() => {
        setLoadingStatus('In progress');

        Axios.request<T>(request)
            .then((apiResponse) => {
                setResponse(apiResponse.data);
                setLoadingStatus('Complete');
            })
            .catch(() => {
                setLoadingStatus('Failed');
            });
    }, [retryCount]); // eslint-disable-line react-hooks/exhaustive-deps

    return { response, loadingStatus };
}
