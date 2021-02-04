import { Box, Divider, Grid, Typography } from '@material-ui/core';
import Spacer from 'components/Spacer';
import { useRecipeState } from 'hooks/useRecipeState';
import React, { Fragment } from 'react';

/** Renders a full display of a recipe, designed to fill a page */
function RecipeFullPage() {
    const { recipe } = useRecipeState();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box>
                    <Typography variant="h3">{recipe!.name}</Typography>
                    <Typography variant="overline">
                        Serves: {recipe!.serves}
                    </Typography>
                    <Spacer />
                    <Typography variant="overline">
                        Prep Time: {recipe!.prepTime} mins
                    </Typography>
                    <Spacer />
                    <Typography variant="overline">
                        Cooking Time: {recipe!.cookingTime} mins
                    </Typography>
                    <Spacer />
                    <Typography variant="overline">
                        Difficulty: {recipe!.difficulty}
                    </Typography>
                </Box>
            </Grid>

            <Divider />
            <Grid item xs={12}>
                <Typography variant="body2">{recipe?.description}</Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={4}>
                <Typography variant="body2">
                    {recipe?.ingredients.map((ingredient) => (
                        <Typography key={ingredient.name}>
                            {ingredient.quantity}
                            {ingredient.quantityType} {ingredient.name}
                        </Typography>
                    ))}
                </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={8}>
                <Typography variant="body2">
                    {JSON.stringify(recipe?.method)}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default RecipeFullPage;
