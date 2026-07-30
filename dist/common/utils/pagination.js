"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const apiResponse_1 = require("../utils/apiResponse");
class Pagination {
    static async paginate(findMany, params) {
        const take = Math.min(params.limit || Pagination.MAX_PER_PAGE, Pagination.MAX_PER_PAGE);
        const order = params.order || Pagination.DEFAULT_ORDER;
        let queryArgs = {
            take: take + 1,
            orderBy: { id: order },
        };
        if (params.cursor) {
            const base64 = params.cursor.replace(/-/g, "+").replace(/_/g, "/");
            const decodedCursor = JSON.parse(Buffer.from(base64, "base64").toString());
            queryArgs.where = {
                id: { [order === "desc" ? "lt" : "gt"]: decodedCursor.id },
            };
        }
        const items = await findMany(queryArgs);
        const hasMore = items.length > take;
        const data = hasMore ? items.slice(0, -1) : items;
        const nextCursor = hasMore
            ? Buffer.from(JSON.stringify({ id: data[data.length - 1].id }))
                .toString("base64")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=/g, "")
            : null;
        // Return with Symbol marker - apiResponse will recognize this!
        return {
            data,
            nextCursor,
            hasMore,
            [apiResponse_1.PAGINATED_RESPONSE_SYMBOL]: true, // Secret marker
        };
    }
}
exports.Pagination = Pagination;
Pagination.MAX_PER_PAGE = 10;
Pagination.DEFAULT_ORDER = "desc";
