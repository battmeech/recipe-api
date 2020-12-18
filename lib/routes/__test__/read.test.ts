import { Request, Response } from 'express';
import { ErrorResponse } from '../../models/errorResponse';
import { Ingredient } from '../../models/ingredient';
import { Instruction } from '../../models/instruction';
import { RecipeResponse } from '../../models/recipeResponse';
import * as Persistence from '../../persistence/recipePersistence';
import { PersistedRecipe } from '../../persistence/recipeSchema';
import read from '../read';

describe('Tests of the read route', () => {
    // Mock response
    const response = {} as Response;
    const statusMock = jest.fn().mockReturnValue(response);
    const sendMock = jest.fn().mockReturnValue(response);
    response.status = statusMock;
    response.send = sendMock;

    const createdAt = new Date();

    // Mock persisted body
    const expectedBody = {
        _id: '12',
        ingredients: [] as Ingredient[],
        method: [] as Instruction[],
        name: 'Toast',
        serves: 1,
        difficulty: 'hard',
        prepTime: 10,
        cookingTime: 10,
        description: 'Test',
        updatedAt: createdAt,
    } as PersistedRecipe;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Successfully runs through the read route', async () => {
        // Setup
        const request = ({
            path: '/recipe/24',
            method: 'GET',
            params: { id: '12' },
        } as unknown) as Request;

        const expectedResponseBody: RecipeResponse = {
            id: '12',
            ingredients: [] as Ingredient[],
            method: [] as Instruction[],
            name: 'Toast',
            serves: 1,
            difficulty: 'hard',
            prepTime: 10,
            cookingTime: 10,
            description: 'Test',
            updatedAt: createdAt,
        };

        // Mocks
        const persistenceMock = jest
            .spyOn(Persistence, 'read')
            .mockReturnValue(Promise.resolve(expectedBody));

        // Run test
        await read(request, response);

        // Verify mocks
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledWith('12');
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledWith(expectedResponseBody);
    });

    it('Returns a 404 when recipe not found', async () => {
        // Setup
        const request = ({
            path: '/recipe/24',
            method: 'GET',
            params: { id: '12' },
        } as unknown) as Request;

        const expectedResponseBody = new ErrorResponse(
            404,
            'Recipe not found',
            `Recipe with id "12" could not be found`
        );

        // Mocks
        const persistenceMock = jest
            .spyOn(Persistence, 'read')
            .mockReturnValue(Promise.resolve(null));

        // Run test
        await read(request, response);

        // Verify mocks
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledWith('12');
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(sendMock).toHaveBeenCalledWith(expectedResponseBody);
    });

    it('Returns a 500 when database read fails', async () => {
        // Setup
        const request = ({
            path: '/recipe/24',
            method: 'GET',
            params: { id: '12' },
        } as unknown) as Request;

        const expectedResponseBody = new ErrorResponse(
            500,
            'Internal server error',
            'Test error'
        );

        // Mocks
        const persistenceMock = jest
            .spyOn(Persistence, 'read')
            .mockImplementationOnce(() => {
                throw new Error('Test error');
            });

        // Run test
        await read(request, response);

        // Verify mocks
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledWith('12');
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(sendMock).toHaveBeenCalledWith(expectedResponseBody);
    });
});
