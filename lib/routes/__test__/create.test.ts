import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import { ErrorResponse } from '../../models/errorResponse';
import { Ingredient } from '../../models/ingredient';
import { Instruction } from '../../models/instruction';
import { RecipeResponse } from '../../models/recipeResponse';
import * as Persistence from '../../persistence/recipePersistence';
import { PersistedRecipe } from '../../persistence/recipeSchema';
import { newRecipeRules } from '../../validation/recipeValidation';
import create from '../create';

describe('Tests of the create route', () => {
    // Mock response
    const response = {} as Response;
    const statusMock = jest.fn().mockReturnValue(response);
    const sendMock = jest.fn().mockReturnValue(response);
    response.status = statusMock;
    response.send = sendMock;

    // Mock persisted body
    const expectedBody = {
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

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Successfully runs through the create route', async () => {
        // Setup
        const request = {
            path: '/recipe',
            method: 'POST',
            body: { name: 'toast' },
        } as Request;

        const expectedResponseBody: RecipeResponse = {
            id: '12',
            ingredients: [] as Ingredient[],
            method: [] as Instruction[],
            name: 'Toast',
            serves: 1,
            difficulty: 'hard',
            prepTime: '10',
            cookingTime: '10',
            description: 'Test',
        };

        // Mocks
        const validationMock = jest
            .spyOn(newRecipeRules, 'validateAsync')
            .mockReturnValueOnce(Promise.resolve({}));

        const persistenceMock = jest
            .spyOn(Persistence, 'create')
            .mockReturnValue(Promise.resolve(expectedBody));

        // Run test
        await create(request, response);

        // Verify mocks
        expect(validationMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledWith(expectedResponseBody);
    });

    it('Returns a 400 when validation fails', async () => {
        // Setup
        const request = {
            path: '/recipe',
            method: 'POST',
            body: { name: 'toast' },
        } as Request;

        const expectedResponseBody = new ErrorResponse(
            400,
            'Invalid recipe receieved',
            'Testing'
        );

        // Mocks
        const validationMock = jest
            .spyOn(newRecipeRules, 'validateAsync')
            .mockImplementationOnce(() => {
                throw new ValidationError('', [{ message: 'Testing' }], null);
            });

        // Run test
        await create(request, response);

        // Verify mocks
        expect(validationMock).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(sendMock).toHaveBeenCalledWith(expectedResponseBody);
    });
});
