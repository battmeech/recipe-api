import { Ingredient } from '../../models/ingredient';
import { Instruction } from '../../models/instruction';
import { create, list, read, update, _delete } from '../recipePersistence';
import { RecipeModel } from '../recipeSchema';

describe('Tests of the recipe persistence service', () => {
    it('Successfully saves a recipe', async () => {
        // Setup
        const input = {
            name: 'toast',
            serves: 1,
            difficulty: 'hard',
            prepTime: 10,
            cookingTime: 10,
            description: 'Test',
            ingredients: [],
            method: [],
        };

        const expected = { ...input };

        const date = new Date();

        // Mocks
        const persistenceMock = jest
            .spyOn(RecipeModel.prototype, 'save')
            .mockReturnValueOnce(expected);

        // Run test
        const actual = await create(input, date);

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
            prepTime: 10,
            cookingTime: 10,
            description: 'Test',
        } as any;

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
        expect(persistenceMock).toHaveBeenCalledWith(input);
    });

    it('Successfully updates a recipe', async () => {
        // Setup
        const expected = {
            _id: '12',
            ingredients: [] as Ingredient[],
            method: [] as Instruction[],
            name: 'toast',
            serves: 1,
            difficulty: 'hard',
            prepTime: 10,
            cookingTime: 10,
            description: 'Test',
        } as any;

        const input = {
            name: 'toast',
            serves: 1,
            difficulty: 'hard',
            prepTime: 10,
            cookingTime: 10,
            description: 'Test',
            ingredients: [],
            method: [],
        };

        const date = new Date();

        // Mocks
        const persistenceMock = jest
            .spyOn(RecipeModel, 'findOneAndUpdate')
            .mockResolvedValue(expected);

        // Run test
        const actual = await update('12', input, date);

        // Assert
        expect(actual).toStrictEqual(expected);

        // Verify mocks
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledWith(
            { _id: '12' },
            { ...input, updatedAt: date }
        );
    });

    it('Successfully deletes a recipe', async () => {
        // Setup
        const input = '12';

        // Mocks
        const persistenceMock = jest
            .spyOn(RecipeModel, 'deleteOne')
            .mockResolvedValue({ deletedCount: 1 });

        // Run test
        const actual = await _delete(input);

        // Assert
        expect(actual).toStrictEqual(1);

        // Verify mocks
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledWith({ _id: input });
    });

    it('Successfully lists recipes', async () => {
        // Setup
        const input = {};
        const request = {};

        // Mocks
        const MongoMocks: any = {
            limit: jest.fn(() => MongoMocks),
            sort: jest.fn(() => MongoMocks),
        };

        const findMock = jest
            .spyOn(RecipeModel, 'find')
            .mockReturnValue(MongoMocks);

        // Run test
        const actual = await list(input, request);

        // Assert
        expect(actual).toStrictEqual(MongoMocks);

        // Verify mocks
        expect(findMock).toHaveBeenCalledTimes(1);
        expect(findMock).toHaveBeenCalledWith({});
    });
});
