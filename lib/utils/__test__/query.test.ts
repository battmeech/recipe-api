import { ListRequest } from '../../models/listRequest';
import { constructQuery } from '../query';

describe('Tests of constructQuery():', () => {
    it('Creates a query from a filled list request', () => {
        // Setup
        const input: ListRequest = {
            pageToken: '123456',
            filters: {
                difficulty: ['HARD'],
                serves: 12,
            },
        };

        const expected = {
            _id: { $gt: '123456' },
            difficulty: { $in: ['HARD'] },
            serves: { $lte: 12 },
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
