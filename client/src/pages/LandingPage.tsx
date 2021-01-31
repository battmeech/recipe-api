import { Grid } from '@material-ui/core';
import RecipeCard from 'components/recipe/RecipeCard';
import { useFetchData } from 'hooks/useFetchData';
import { ListResponse } from 'models/listResponse';
import { Fragment } from 'react';

function LandingPage() {
    const [response, loadingStatus] = useFetchData<ListResponse>({
        url: '/api/list',
        method: 'POST',
        data: { numberOfResults: 3 },
    });

    return (
        <Fragment>
            <Grid container spacing={1}>
                {response?.recipes.map((recipe) => (
                    <Grid xs={2} item key={recipe.slug}>
                        <RecipeCard recipe={recipe} />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
}

export default LandingPage;
