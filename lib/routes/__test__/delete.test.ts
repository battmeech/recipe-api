import { Request, Response } from 'express';
import { ErrorResponse } from '../../models/errorResponse';
import * as Persistence from '../../persistence/recipePersistence';
import _delete from '../delete';

describe('Tests of the delete route', () => {
    // Mock response
    const response = {} as Response;
    const statusMock = jest.fn().mockReturnValue(response);
    const sendMock = jest.fn().mockReturnValue(response);
    response.status = statusMock;
    response.send = sendMock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Successfully runs through the read route', async () => {
        // Setup
        const request = ({
            path: '/recipe/12',
            method: 'DELETE',
            params: { id: '12' },
        } as unknown) as Request;

        // Mocks
        const persistenceMock = jest
            .spyOn(Persistence, '_delete')
            .mockReturnValue(Promise.resolve(1));

        // Run test
        await _delete(request, response);

        // Verify mocks
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledWith('12');
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledTimes(1);
    });

    it('Returns a 404 when recipe not found', async () => {
        // Setup
        const request = ({
            path: '/recipe/12',
            method: 'DELETE',
            params: { id: '12' },
        } as unknown) as Request;

        const expectedResponseBody = new ErrorResponse(
            404,
            'Recipe not found',
            `Recipe with id "12" could not be found`
        );

        // Mocks
        const persistenceMock = jest
            .spyOn(Persistence, '_delete')
            .mockReturnValue(Promise.resolve(0));

        // Run test
        await _delete(request, response);

        // Verify mocks
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledWith('12');
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(sendMock).toHaveBeenCalledTimes(1);
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
            .spyOn(Persistence, '_delete')
            .mockImplementationOnce(() => {
                throw new Error('Test error');
            });

        // Run test
        await _delete(request, response);

        // Verify mocks
        expect(persistenceMock).toHaveBeenCalledTimes(1);
        expect(persistenceMock).toHaveBeenCalledWith('12');
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(sendMock).toHaveBeenCalledWith(expectedResponseBody);
    });
});
