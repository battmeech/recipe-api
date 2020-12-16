import { ListRequest } from '../models/listRequest';

/**
 * Construct the query to be sent to MongoDB
 * @param request the user request
 */
export function constructQuery(request: ListRequest) {
    const query: any = {};

    if (request.pageToken) {
        query._id = { $gt: request.pageToken };
    }

    if (request.filters?.difficulty) {
        query.difficulty = { $in: request.filters.difficulty };
    }

    if (request.filters?.serves) {
        query.serves = { $lte: request.filters.serves };
    }

    return query;
}
