import { ListRecipe } from '../listResponse';

describe('Tests of the list recipe model', () => {
    it('Successfully instantiates a new list recipe model', () => {
        // Setup
        const recipe = new ListRecipe(
            {
                name: 'toast',
                serves: 1,
                difficulty: 'hard',
                prepTime: '10',
                cookingTime: '10',
                description: 'Test',
                ingredients: [],
                method: [],
            },
            '12'
        );

        // Assert
        expect(recipe.id).toStrictEqual('12');
        expect(recipe.name).toStrictEqual('toast');
        expect(recipe.serves).toStrictEqual(1);
        expect(recipe.difficulty).toStrictEqual('hard');
        expect(recipe.prepTime).toStrictEqual('10');
        expect(recipe.cookingTime).toStrictEqual('10');
        expect(recipe.description).toStrictEqual('Test');
    });
});
