import type { RequestHandler } from "express";
import { z } from "zod";
type ValidationSchema = z.ZodObject<any> | z.ZodEffects<any>;
export declare const validate: (schema: ValidationSchema) => RequestHandler;
export {};
//# sourceMappingURL=validate.middleware.d.ts.map