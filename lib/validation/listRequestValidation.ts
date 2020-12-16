import joi from 'joi';
import { Filter, ListRequest, Sort } from '../models/listRequest';

const sortValidationRules = joi.object<Sort>({
    sortBy: joi
        .any()
        .only()
        .allow('updatedAt', 'name'),
    sortDirection: joi
        .any()
        .only()
        .allow('asc', 'desc'),
});

const filterValidationRules = joi.object<Filter>({
    difficulty: joi.array().items(
        joi
            .any()
            .only()
            .allow('EASY', 'MEDIUM', 'HARD')
    ),
    serves: joi
        .number()
        .integer()
        .greater(0),
});

export const listRequestValidationRules = joi.object<ListRequest>({
    pageToken: joi.string(),
    numberOfResults: joi
        .number()
        .integer()
        .greater(0),
    filters: filterValidationRules,
    sort: sortValidationRules,
});
