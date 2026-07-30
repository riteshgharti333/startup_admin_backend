"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = void 0;
// src/common/utils/filter.ts
const pagination_1 = require("./pagination");
class Filter {
    static async filter(findMany, params) {
        const where = {
            AND: [],
        };
        // Normal filters
        Object.entries(params.filters).forEach(([key, value]) => {
            if (value !== undefined && value !== "" && value !== null) {
                // Handle date range
                // Handle date range
                if (key.endsWith("From") || key.endsWith("To")) {
                    // Check if key contains 'Date' OR 'createdAt' or 'updatedAt' etc.
                    const isDateField = key.includes("Date") ||
                        key.includes("createdAt") ||
                        key.includes("updatedAt") ||
                        key.includes("dueDate") ||
                        key.includes("issueDate") ||
                        key.includes("expiryDate");
                    const fieldName = key.replace(/From|To/, "");
                    const existingFilter = where.AND.find((f) => f[fieldName]);
                    const rangeFilter = existingFilter ? existingFilter[fieldName] : {};
                    if (key.endsWith("From")) {
                        rangeFilter.gte = isDateField ? new Date(value) : parseFloat(value);
                    }
                    else {
                        rangeFilter.lte = isDateField ? new Date(value) : parseFloat(value);
                    }
                    if (!existingFilter) {
                        where.AND.push({ [fieldName]: rangeFilter });
                    }
                }
                // Handle boolean
                else if (value === "true" || value === "false") {
                    where.AND.push({ [key]: value === "true" });
                }
                // Handle normal fields
                else {
                    where.AND.push({ [key]: value });
                }
            }
        });
        // Nested relation filters
        if (params.nestedFilters) {
            Object.entries(params.nestedFilters).forEach(([relation, fields]) => {
                const relationFilter = {};
                Object.entries(fields).forEach(([field, value]) => {
                    if (value !== undefined && value !== "" && value !== null) {
                        if (field.endsWith("Contains")) {
                            const actualField = field.replace("Contains", "");
                            relationFilter[actualField] = {
                                contains: value,
                                mode: "insensitive",
                            };
                        }
                        else {
                            relationFilter[field] = value;
                        }
                    }
                });
                if (Object.keys(relationFilter).length > 0) {
                    where.AND.push({ [relation]: relationFilter });
                }
            });
        }
        const finalWhere = where.AND.length > 0 ? where : {};
        return pagination_1.Pagination.paginate((args) => findMany({ ...args, where: finalWhere }), {
            cursor: params.cursor,
            limit: params.limit ? parseInt(params.limit) : undefined,
        });
    }
}
exports.Filter = Filter;
