import { ListRequest } from '../../models/listRequest';
import { constructQuery } from '../query';

describe('Tests of constructQuery():', () => {
    it('Creates a query from a filled list request', () => {
        // Setup
        const input: ListRequest = {
            pageToken: '123456',
            filters: {
                difficulty: ['HARD'],
                cookingTime: 12,
                prepTime: 12,
            },
        };

        const expected = {
            _id: { $lt: '123456' },
            difficulty: { $in: ['HARD'] },
            cookingTime: { $lte: 12 },
            prepTime: { $lte: 12 },
        };

        // Run test
        const actual = constructQuery(input);

        // Assert
        expect(actual).toStrictEqual(expected);
    });

    it('Creates a query from a filled list request with ascending order', () => {
        // Setup
        const input: ListRequest = {
            pageToken: '123456',
            sort: {
                sortBy: 'name',
                sortDirection: 'asc',
            },
            filters: {
                difficulty: ['HARD'],
                cookingTime: 12,
                prepTime: 12,
            },
        };

        const expected = {
            _id: { $gt: '123456' },
            difficulty: { $in: ['HARD'] },
            cookingTime: { $lte: 12 },
            prepTime: { $lte: 12 },
        };

        // Run test
        const actual = constructQuery(input);

        // Assert
        expect(actual).toStrictEqual(expected);
    });

    it('Creates a query from an empty list request', () => {
        // Setup
        const input: ListRequest = {};

        const expected = {};

        // Run test
        const actual = constructQuery(input);

        // Assert
        expect(actual).toStrictEqual(expected);
    });
});
