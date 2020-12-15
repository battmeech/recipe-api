import { create } from '../recipePersistence';
import { MongoRecipe } from '../recipeSchema';

describe('Tests of the recipe persistence service', () => {
    it('Successfully saves a recipe', async () => {
        // Setup
        const input = {
            name: 'toast',
            serves: 1,
            difficulty: 'hard',
            prepTime: '10',
            cookingTime: '10',
            description: 'Test',
            ingredients: [],
            method: [],
        };

        const expected = { ...input };

        // Mocks
        const persistenceMock = jest
            .spyOn(MongoRecipe.prototype, 'save')
            .mockReturnValueOnce(expected);

        // Run test
        const actual = await create(input);

        // Assert
        expect(actual).toStrictEqual(expected);

        // Verify mocks
        expect(persistenceMock).toHaveBeenCalledTimes(1);
    });
});
