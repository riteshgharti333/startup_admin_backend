"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const pagination_1 = require("./pagination");
class Search {
    static async search(findMany, params) {
        const conditions = [];
        // Exact match fields (case-insensitive)
        if (params.exactFields) {
            params.exactFields.forEach((field) => {
                conditions.push({
                    [field]: {
                        equals: params.searchTerm,
                        mode: "insensitive",
                    },
                });
            });
        }
        // Partial match fields
        if (params.containsFields) {
            params.containsFields.forEach((field) => {
                conditions.push({
                    [field]: { contains: params.searchTerm, mode: "insensitive" },
                });
            });
        }
        // Nested relation fields - supports 2 and 3 levels
        if (params.nestedFields) {
            Object.entries(params.nestedFields).forEach(([relation, fields]) => {
                if (Array.isArray(fields)) {
                    // 2-level nesting: { customer: ['name'] }
                    fields.forEach((field) => {
                        conditions.push({
                            [relation]: {
                                [field]: { contains: params.searchTerm, mode: "insensitive" },
                            },
                        });
                    });
                }
                else if (typeof fields === 'object') {
                    // 3-level nesting: { invoice: { customer: ['name'] } }
                    Object.entries(fields).forEach(([subRelation, subFields]) => {
                        subFields.forEach((field) => {
                            conditions.push({
                                [relation]: {
                                    [subRelation]: {
                                        [field]: { contains: params.searchTerm, mode: "insensitive" },
                                    },
                                },
                            });
                        });
                    });
                }
            });
        }
        const where = {
            OR: conditions,
        };
        if (params.filters) {
            Object.assign(where, params.filters);
        }
        // Min 2 chars
        if (params.searchTerm && params.searchTerm.length < 2) {
            return {
                data: [],
                nextCursor: null,
                hasMore: false,
                message: "Please enter at least 2 characters to search",
            };
        }
        return pagination_1.Pagination.paginate((args) => findMany({ ...args, where }), {
            cursor: params.cursor,
            limit: params.limit ? parseInt(params.limit) : undefined,
        });
    }
}
exports.Search = Search;
