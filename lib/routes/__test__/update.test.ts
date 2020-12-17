import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import { ErrorResponse } from '../../models/errorResponse';
import { Ingredient } from '../../models/ingredient';
import { Instruction } from '../../models/instruction';
import { RecipeResponse } from '../../models/recipeResponse';
import * as Persistence from '../../persistence/recipePersistence';
import { PersistedRecipe } from '../../persistence/recipeSchema';
import { recipeValidationRules } from '../../validation/recipeValidation';
import update from '../update';

describe('Tests of the update route', () => {
    // Mock response
    const response = {} as Response;
    const statusMock = jest.fn().mockReturnValue(response);
    const sendMock = jest.fn().mockReturnValue(response);
    response.status = statusMock;
    response.send = sendMock;

    const updatedAt = new Date(1);

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
        updatedAt,
    } as PersistedRecipe;

    // Mock request
    const request = ({
        path: '/recipe/24',
        method: 'PUT',
        params: { id: '12' },
        body: {
            ingredients: [],
            method: [],
            name: 'Toast',
            serves: 1,
            difficulty: 'hard',
            prepTime: '10',
            cookingTime: '10',
            description: 'Test',
        },
    } as unknown) as Request;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Successfully runs through the update route', async () => {
        // Setup
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
            updatedAt,
        };

        // Mocks
        const validationMock = jest
            .spyOn(recipeValidationRules, 'validateAsync')
            .mockReturnValueOnce(Promise.resolve({}));

        const persistenceMock = jest
            .spyOn(Persistence, 'update')
            .mockReturnValue(Promise.resolve(expectedBody));

        const dateMock = jest.spyOn(Date, 'now').mockReturnValueOnce(1);

        // Run test
        await update(request, response);

        // Verify mocks
        expect(validationMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledWith(expectedResponseBody);
        expect(dateMock).toHaveBeenCalledTimes(1);
    });

    it('Returns a 400 when validation fails', async () => {
        // Setup
        const expectedResponseBody = new ErrorResponse(
            400,
            'Invalid request receieved',
            'Testing'
        );

        // Mocks
        const validationMock = jest
            .spyOn(recipeValidationRules, 'validateAsync')
            .mockImplementationOnce(() => {
                throw new ValidationError('', [{ message: 'Testing' }], null);
            });

        // Run test
        await update(request, response);

        // Verify mocks
        expect(validationMock).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(sendMock).toHaveBeenCalledWith(expectedResponseBody);
    });

    it('Returns a 500 when the database save fails', async () => {
        // Setup
        const expectedResponseBody = new ErrorResponse(
            500,
            'Internal server error',
            'Test error'
        );

        // Mocks
        const validationMock = jest
            .spyOn(recipeValidationRules, 'validateAsync')
            .mockReturnValueOnce(Promise.resolve({}));

        const persistenceMock = jest
            .spyOn(Persistence, 'update')
            .mockImplementationOnce(() => {
                throw new Error('Test error');
            });

        // Run test
        await update(request, response);

        // Verify mocks
        expect(validationMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(sendMock).toHaveBeenCalledWith(expectedResponseBody);
    });
});
