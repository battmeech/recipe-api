import { ListRequest } from '../models/listRequest';

/**
 * Construct the query to be sent to MongoDB
 * @param request the user request
 */
export function constructQuery(request: ListRequest) {
    const query: any = {};

    if (request.pageToken) {
        query._id =
            request.sort?.sortDirection === 'asc'
                ? { $gt: request.pageToken }
                : { $lt: request.pageToken };
    }

    if (request.filters?.difficulty) {
        query.difficulty = { $in: request.filters.difficulty };
    }

    if (request.filters?.cookingTime) {
        query.cookingTime = { $lte: request.filters.cookingTime };
    }

    if (request.filters?.prepTime) {
        query.prepTime = { $lte: request.filters.prepTime };
    }

    return query;
}
