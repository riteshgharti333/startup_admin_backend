export declare class Filter {
    static filter<T extends {
        id: string;
    }>(findMany: (args: any) => Promise<T[]>, params: {
        filters: Record<string, any>;
        nestedFilters?: Record<string, Record<string, any>>;
        cursor?: string;
        limit?: string;
    }): Promise<any>;
}
//# sourceMappingURL=filter.d.ts.map