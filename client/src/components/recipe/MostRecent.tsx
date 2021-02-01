import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import RecipeCard from 'components/recipe/RecipeCard';
import { useFetchData } from 'hooks/useFetchData';
import { ListResponse } from 'models/listResponse';

const useStyles = makeStyles({
    gridContainer: {
        width: '33%',
        margin: 'auto',
    },
});

function MostRecent() {
    const classes = useStyles();
    const [response, loadingStatus] = useFetchData<ListResponse>({
        url: '/api/list',
        method: 'POST',
        data: { numberOfResults: 3 },
    });

    return (
        <Box className={classes.gridContainer}>
            <Typography>Most Recent</Typography>
            <Grid container spacing={2}>
                {response?.recipes.map((recipe) => (
                    <Grid xs={4} item key={recipe.slug}>
                        <RecipeCard recipe={recipe} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default MostRecent;
