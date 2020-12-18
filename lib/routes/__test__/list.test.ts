import { Request, Response } from 'express';
import { ErrorResponse } from '../../models/errorResponse';
import { Ingredient } from '../../models/ingredient';
import { Instruction } from '../../models/instruction';
import { ListResponse } from '../../models/listResponse';
import * as Persistence from '../../persistence/recipePersistence';
import { PersistedRecipe } from '../../persistence/recipeSchema';
import * as Query from '../../utils/query';
import { listRequestValidationRules } from '../../validation/listRequestValidation';
import list from '../list';
import { ValidationError } from 'joi';

describe('Tests of the list route', () => {
    // Mock response
    const response = {} as Response;
    const statusMock = jest.fn().mockReturnValue(response);
    const sendMock = jest.fn().mockReturnValue(response);
    response.status = statusMock;
    response.send = sendMock;

    const createdAt = new Date();

    // Mock persisted body
    const expectedBody = [
        {
            _id: '12',
            slug: '12',
            ingredients: [] as Ingredient[],
            method: [] as Instruction[],
            name: 'Toast',
            serves: 1,
            difficulty: 'hard',
            prepTime: 10,
            cookingTime: 10,
            description: 'Test',
            updatedAt: createdAt,
        },
    ] as PersistedRecipe[];

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Successfully runs through the list route', async () => {
        // Setup
        const request = {
            path: '/list',
            method: 'POST',
            body: {},
        } as Request;

        const expectedResponseBody: ListResponse = {
            recipes: [
                {
                    slug: '12',
                    name: 'Toast',
                    serves: 1,
                    difficulty: 'hard',
                    prepTime: 10,
                    cookingTime: 10,
                    description: 'Test',
                },
            ],
            pageToken: '12',
        };

        const query = {};

        // Mocks
        const validationMock = jest
            .spyOn(listRequestValidationRules, 'validateAsync')
            .mockReturnValueOnce(Promise.resolve({}));

        const persistenceMock = jest
            .spyOn(Persistence, 'list')
            .mockReturnValue(Promise.resolve(expectedBody));

        const queryMock = jest
            .spyOn(Query, 'constructQuery')
            .mockReturnValue(query);

        // Run test
        await list(request, response);

        // Verify mocks
        expect(validationMock).toHaveBeenCalledTimes(1);
        expect(validationMock).toHaveBeenCalledWith(request.body);
        expect(queryMock).toHaveBeenCalledTimes(1);
        expect(queryMock).toHaveBeenCalledWith(request.body);
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledWith(query, request.body);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledWith(expectedResponseBody);
    });

    it('Returns a 500 when database read fails', async () => {
        // Setup
        const request = {
            path: '/list',
            method: 'POST',
            body: {},
        } as Request;

        const expectedResponseBody = new ErrorResponse(
            500,
            'Internal server error',
            'Test error'
        );

        const query = {};

        // Mocks
        const validationMock = jest
            .spyOn(listRequestValidationRules, 'validateAsync')
            .mockReturnValueOnce(Promise.resolve({}));

        const persistenceMock = jest
            .spyOn(Persistence, 'list')
            .mockImplementationOnce(() => {
                throw new Error('Test error');
            });

        const queryMock = jest
            .spyOn(Query, 'constructQuery')
            .mockReturnValue(query);

        // Run test
        await list(request, response);

        // Verify mocks
        expect(validationMock).toHaveBeenCalledTimes(1);
        expect(validationMock).toHaveBeenCalledWith(request.body);
        expect(queryMock).toHaveBeenCalledTimes(1);
        expect(queryMock).toHaveBeenCalledWith(request.body);
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledWith(query, request.body);
        expect(statusMock).toHaveBeenCalledWith(500);
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
            'Invalid request receieved',
            'Testing'
        );

        // Mocks
        const validationMock = jest
            .spyOn(listRequestValidationRules, 'validateAsync')
            .mockImplementationOnce(() => {
                throw new ValidationError('', [{ message: 'Testing' }], null);
            });

        // Run test
        await list(request, response);

        // Verify mocks
        expect(validationMock).toHaveBeenCalledTimes(1);
        expect(validationMock).toHaveBeenCalledWith(request.body);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(sendMock).toHaveBeenCalledWith(expectedResponseBody);
    });
});
