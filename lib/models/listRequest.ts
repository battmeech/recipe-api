/**
 * The request body when the client is asking for a list of recipes
 */
export type ListRequest = {
    pageToken?: string;
    sort?: Sort;
    numberOfResults?: number;
    filters?: Filter;
};

export type Sort = {
    sortBy: 'updatedAt' | 'name';
    sortDirection: 'asc' | 'desc';
};

export type Filter = {
    difficulty?: string[];
    serves?: number;
};
