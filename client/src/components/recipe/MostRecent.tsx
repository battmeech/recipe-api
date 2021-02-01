import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import RecipeCard from 'components/recipe/RecipeCard';
import LoadingContent from 'components/skeleton/LoadingContent';
import { useAppState } from 'hooks/useAppState';
import { useFetchData } from 'hooks/useFetchData';
import { ListResponse } from 'models/listResponse';
import { Fragment, ReactNode } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        margin: 'auto',
    },
    header: {
        marginBottom: theme.spacing(1),
    },
    recipeCardHeader: {
        padding: theme.spacing(1),
    },
    recipeCardContents: {
        padding: theme.spacing(1),
    },
}));

function MostRecent() {
    const classes = useStyles();
    const { response, loadingStatus } = useFetchData<ListResponse>({
        url: '/api/list',
        method: 'POST',
        data: { numberOfResults: 3 },
    });

    const appState = useAppState();
    const Wrapper = (props: { children: ReactNode }) => (
        <Box className={classes.root}>
            <Typography
                className={classes.header}
                variant="h5"
                data-testid="most-recent-text">
                Most Recent {appState.isMobile ? 'mobile' : 'not mobile'}
            </Typography>
            <Grid data-testid="recipe-grid" container spacing={2}>
                {props.children}
            </Grid>
        </Box>
    );

    const Content = () => (
        <Fragment>
            {response?.recipes.map((recipe) => (
                <Grid xs={4} item key={recipe.slug}>
                    <RecipeCard
                        data-testid={`recipe-card-${recipe.slug}`}
                        classes={{
                            cardContentClass: classes.recipeCardContents,
                            cardHeaderClass: classes.recipeCardHeader,
                        }}
                        recipe={recipe}
                    />
                </Grid>
            ))}
        </Fragment>
    );

    const SkeletonContent = () => (
        <Fragment>
            <Grid xs={4} item>
                <Skeleton
                    data-testid="recipe-card-skeleton-1"
                    variant="rect"
                    height={100}
                />
            </Grid>
            <Grid xs={4} item>
                <Skeleton
                    data-testid="recipe-card-skeleton-2"
                    variant="rect"
                    height={100}
                />
            </Grid>
            <Grid xs={4} item>
                <Skeleton
                    data-testid="recipe-card-skeleton-3"
                    variant="rect"
                    height={100}
                />
            </Grid>
        </Fragment>
    );

    return (
        <Wrapper>
            <LoadingContent
                skeletonContent={<SkeletonContent />}
                loadingStatus={loadingStatus}
                content={<Content />}
            />
        </Wrapper>
    );
}

export default MostRecent;
