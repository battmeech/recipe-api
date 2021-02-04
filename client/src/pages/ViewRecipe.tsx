import { Skeleton } from '@material-ui/lab';
import LoadingContent from 'components/skeleton/LoadingContent';
import { useFetchRecipe } from 'hooks/useFetchRecipe';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

type MatchParams = {
    slug: string;
};
type ViewRecipeProps = RouteComponentProps<MatchParams>;

function ViewRecipe(props: ViewRecipeProps) {
    const { slug } = props.match.params;
    const { loadingStatus, error } = useFetchRecipe(slug);

    useEffect(() => {
        if (loadingStatus === 'Failed') {
            console.log(error);
        }
    }, [loadingStatus, error]);

    const SkeletonContent = () => <Skeleton height={400} width={400} />;

    return (
        <LoadingContent
            loadingStatus={loadingStatus}
            skeletonContent={<SkeletonContent />}
            content={<p>hi</p>}
        />
    );
}

export default ViewRecipe;
