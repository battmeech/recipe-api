import { ListRequest } from '../../models/listRequest';
import { listRequestValidationRules } from '../listRequestValidation';

describe('Tests of the list request validation service', () => {
    it('A valid list request succeeds validation', () => {
        // Setup
        const input: ListRequest = {
            filters: {
                difficulty: ['HARD'],
                serves: 2,
            },
            numberOfResults: 10,
            pageToken: '12345',
            sort: {
                sortBy: 'name',
                sortDirection: 'asc',
            },
        };

        // Run test
        const { error } = listRequestValidationRules.validate(input);

        // Assert
        expect(error).toBeFalsy();
    });

    it('A blank request succeeds validation', () => {
        // Setup
        const input: ListRequest = {};

        // Run test
        const { error } = listRequestValidationRules.validate(input);

        // Assert
        expect(error).toBeFalsy();
    });

    it('A request with invalid fields fails', () => {
        // Setup
        const input = {
            hello: 'goodbye',
        };

        // Run test
        const { error } = listRequestValidationRules.validate(input);

        // Assert
        expect(error?.message).toStrictEqual('"hello" is not allowed');
    });

    it('A request with invalid value types fails', () => {
        // Setup
        const input = {
            numberOfResults: false,
        };

        // Run test
        const { error } = listRequestValidationRules.validate(input);

        // Assert
        expect(error?.message).toStrictEqual(
            '"numberOfResults" must be a number'
        );
    });

    it('A request with invalid values fails', () => {
        // Setup
        const input = {
            filters: {
                difficulty: ['SUPER HARD'],
            },
        };

        // Run test
        const { error } = listRequestValidationRules.validate(input);

        // Assert
        expect(error?.message).toStrictEqual(
            '"filters.difficulty[0]" must be one of [EASY, MEDIUM, HARD]'
        );
    });
});
