import { PAGINATED_RESPONSE_SYMBOL } from "../utils/apiResponse";
export declare class Pagination {
    private static readonly MAX_PER_PAGE;
    private static readonly DEFAULT_ORDER;
    static paginate<T extends {
        id: string;
    }>(findMany: (args: any) => Promise<T[]>, params: {
        cursor?: string;
        limit?: number;
        order?: "asc" | "desc";
    }): Promise<{
        data: T[];
        nextCursor: string | null;
        hasMore: boolean;
        [PAGINATED_RESPONSE_SYMBOL]: boolean;
    }>;
}
//# sourceMappingURL=pagination.d.ts.map