import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Link,
} from '@material-ui/core';
import { ListRecipe } from 'models/listResponse';
import React from 'react';
import { Link as RLink } from 'react-router-dom';

type RecipeCardProps = {
    recipe: ListRecipe;
    classes?: {
        cardContentClass?: string;
        cardHeaderClass?: string;
    };
    className?: string;
};

/** Renders a basic card displaying a recipe */
function RecipeCard(props: RecipeCardProps) {
    const { recipe, classes, className } = props;

    return (
        <Card className={className}>
            <CardHeader
                className={classes?.cardHeaderClass}
                aria-label={recipe.name}
                data-testid="card-title"
                title={
                    <Link
                        component={RLink}
                        to={`/view/${recipe.slug}`}
                        variant="h6">
                        {recipe.name}
                    </Link>
                }
            />
            <CardContent className={classes?.cardContentClass}>
                <Typography
                    aria-label={`${recipe.name} description`}
                    data-testid="card-content">
                    {recipe.description.substring(
                        0,
                        Math.min(recipe.description.length, 50)
                    )}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default RecipeCard;
