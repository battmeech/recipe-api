import { Ingredient } from '../../models/ingredient';
import { Instruction } from '../../models/instruction';
import { create, read } from '../recipePersistence';
import { PersistedRecipe, RecipeModel } from '../recipeSchema';

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
            .spyOn(RecipeModel.prototype, 'save')
            .mockReturnValueOnce(expected);

        // Run test
        const actual = await create(input);

        // Assert
        expect(actual).toStrictEqual(expected);

        // Verify mocks
        expect(persistenceMock).toHaveBeenCalledTimes(1);
    });

    it('Successfully reads a recipe', async () => {
        // Setup
        const expected = {
            _id: '12',
            ingredients: [] as Ingredient[],
            method: [] as Instruction[],
            name: 'Toast',
            serves: 1,
            difficulty: 'hard',
            prepTime: '10',
            cookingTime: '10',
            description: 'Test',
        } as PersistedRecipe;

        const input = '12';

        // Mocks
        const persistenceMock = jest
            .spyOn(RecipeModel, 'findById')
            .mockResolvedValue(expected);

        // Run test
        const actual = await read(input);

        // Assert
        expect(actual).toStrictEqual(expected);

        // Verify mocks
        expect(persistenceMock).toHaveBeenCalledTimes(1);
    });
});
