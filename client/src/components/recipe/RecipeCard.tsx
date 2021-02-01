import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@material-ui/core';
import { ListRecipe } from 'models/listResponse';
import { Link } from 'react-router-dom';

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
                title={recipe.name}
            />
            <CardContent>
                <Typography
                    className={classes?.cardContentClass}
                    aria-label={`${recipe.name} description`}
                    data-testid="card-content">
                    {recipe.description.substring(
                        0,
                        Math.min(recipe.description.length, 50)
                    )}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    variant="outlined"
                    component={Link}
                    to={recipe.slug}
                    aria-label="view recipe">
                    View Recipe
                </Button>
            </CardActions>
        </Card>
    );
}

export default RecipeCard;
