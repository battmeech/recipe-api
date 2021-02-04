import { Skeleton } from '@material-ui/lab';
import RecipeFullPage from 'components/recipe/RecipeFullPage';
import LoadingContent from 'components/skeleton/LoadingContent';
import { useApiErrorHandler } from 'hooks/useApiErrorHandler';
import { useFetchRecipe } from 'hooks/useFetchRecipe';
import { RouteComponentProps } from 'react-router-dom';

type MatchParams = {
    slug: string;
};
type ViewRecipeProps = RouteComponentProps<MatchParams>;

function ViewRecipe(props: ViewRecipeProps) {
    const { loadingStatus, error } = useFetchRecipe(props.match.params.slug);
    useApiErrorHandler(loadingStatus, error);

    const SkeletonContent = () => <Skeleton height={400} width={400} />;

    return (
        <LoadingContent
            loadingStatus={loadingStatus}
            skeletonContent={<SkeletonContent />}
            content={<RecipeFullPage />}
        />
    );
}

export default ViewRecipe;
