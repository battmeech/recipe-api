import { LoadingStatus } from 'models/loadingStatus';
import React, { ReactNode } from 'react';
import { CircularProgress } from '@material-ui/core';

type LoadingContentProps = {
    loadingStatus: LoadingStatus;
    skeletonContent?: ReactNode;
    content: ReactNode;
};

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
