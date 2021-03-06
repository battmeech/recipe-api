import { RecipeResponse } from '../recipeResponse';

describe('Tests of the recipe response model', () => {
    it('Successfully instantiates a new recipe response model', () => {
        // Setup
        const updatedAt = new Date();
        const recipe = new RecipeResponse(
            {
                name: 'toast',
                serves: 1,
                difficulty: 'hard',
                prepTime: 10,
                cookingTime: 10,
                description: 'Test',
                ingredients: [],
                method: [],
            },
            '12',
            updatedAt
        );

        // Assert
        expect(recipe.slug).toStrictEqual('12');
        expect(recipe.name).toStrictEqual('toast');
        expect(recipe.serves).toStrictEqual(1);
        expect(recipe.difficulty).toStrictEqual('hard');
        expect(recipe.prepTime).toStrictEqual(10);
        expect(recipe.cookingTime).toStrictEqual(10);
        expect(recipe.description).toStrictEqual('Test');
        expect(recipe.ingredients).toStrictEqual([]);
        expect(recipe.method).toStrictEqual([]);
    });
});
