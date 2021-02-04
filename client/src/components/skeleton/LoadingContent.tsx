import { CircularProgress } from '@material-ui/core';
import { LoadingStatus } from 'models/loadingStatus';
import React, { ReactNode } from 'react';

type LoadingContentProps = {
    loadingStatus: LoadingStatus;
    skeletonContent?: ReactNode;

    content: ReactNode;
};

/**
 * Wrapper component which handles the 'loading status' of a request.
 * Will render temporary content until the status is complete.
 */
function LoadingContent(props: LoadingContentProps) {
    const { loadingStatus, skeletonContent, content } = props;

    switch (loadingStatus) {
        case 'Complete':
            return <>{content}</>;
        default:
            return skeletonContent ? (
                <>{skeletonContent}</>
            ) : (
                <CircularProgress />
            );
    }
}

export default LoadingContent;
