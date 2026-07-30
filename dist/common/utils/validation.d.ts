import { z } from "zod";
export declare const createApplicationSchema: z.ZodObject<{
    body: z.ZodObject<{
        fullName: z.ZodString;
        email: z.ZodString;
        phoneNumber: z.ZodString;
        position: z.ZodString;
        yearsOfExperience: z.ZodString;
        portfolioUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        linkedInProfile: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        githubProfile: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        coverLetter: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        resumeUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        fullName: string;
        phoneNumber: string;
        position: string;
        yearsOfExperience: string;
        resumeUrl: string;
        portfolioUrl?: string | null | undefined;
        linkedInProfile?: string | null | undefined;
        githubProfile?: string | null | undefined;
        coverLetter?: string | null | undefined;
    }, {
        email: string;
        fullName: string;
        phoneNumber: string;
        position: string;
        yearsOfExperience: string;
        resumeUrl: string;
        portfolioUrl?: string | null | undefined;
        linkedInProfile?: string | null | undefined;
        githubProfile?: string | null | undefined;
        coverLetter?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        fullName: string;
        phoneNumber: string;
        position: string;
        yearsOfExperience: string;
        resumeUrl: string;
        portfolioUrl?: string | null | undefined;
        linkedInProfile?: string | null | undefined;
        githubProfile?: string | null | undefined;
        coverLetter?: string | null | undefined;
    };
}, {
    body: {
        email: string;
        fullName: string;
        phoneNumber: string;
        position: string;
        yearsOfExperience: string;
        resumeUrl: string;
        portfolioUrl?: string | null | undefined;
        linkedInProfile?: string | null | undefined;
        githubProfile?: string | null | undefined;
        coverLetter?: string | null | undefined;
    };
}>;
export declare const updateApplicationSchema: z.ZodObject<{
    body: z.ZodObject<{
        fullName: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
        position: z.ZodOptional<z.ZodString>;
        yearsOfExperience: z.ZodOptional<z.ZodString>;
        portfolioUrl: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        linkedInProfile: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        githubProfile: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        coverLetter: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        resumeUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fullName?: string | undefined;
        email?: string | undefined;
        phoneNumber?: string | undefined;
        position?: string | undefined;
        yearsOfExperience?: string | undefined;
        portfolioUrl?: string | null | undefined;
        linkedInProfile?: string | null | undefined;
        githubProfile?: string | null | undefined;
        coverLetter?: string | null | undefined;
        resumeUrl?: string | undefined;
    }, {
        fullName?: string | undefined;
        email?: string | undefined;
        phoneNumber?: string | undefined;
        position?: string | undefined;
        yearsOfExperience?: string | undefined;
        portfolioUrl?: string | null | undefined;
        linkedInProfile?: string | null | undefined;
        githubProfile?: string | null | undefined;
        coverLetter?: string | null | undefined;
        resumeUrl?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        fullName?: string | undefined;
        email?: string | undefined;
        phoneNumber?: string | undefined;
        position?: string | undefined;
        yearsOfExperience?: string | undefined;
        portfolioUrl?: string | null | undefined;
        linkedInProfile?: string | null | undefined;
        githubProfile?: string | null | undefined;
        coverLetter?: string | null | undefined;
        resumeUrl?: string | undefined;
    };
}, {
    body: {
        fullName?: string | undefined;
        email?: string | undefined;
        phoneNumber?: string | undefined;
        position?: string | undefined;
        yearsOfExperience?: string | undefined;
        portfolioUrl?: string | null | undefined;
        linkedInProfile?: string | null | undefined;
        githubProfile?: string | null | undefined;
        coverLetter?: string | null | undefined;
        resumeUrl?: string | undefined;
    };
}>;
export declare const createLeadSchema: z.ZodObject<{
    body: z.ZodObject<{
        fullName: z.ZodString;
        email: z.ZodString;
        phone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        company: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        service: z.ZodString;
        budget: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        details: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        fullName: string;
        service: string;
        phone?: string | undefined;
        company?: string | undefined;
        budget?: string | undefined;
        details?: string | undefined;
    }, {
        email: string;
        fullName: string;
        service: string;
        phone?: string | undefined;
        company?: string | undefined;
        budget?: string | undefined;
        details?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        fullName: string;
        service: string;
        phone?: string | undefined;
        company?: string | undefined;
        budget?: string | undefined;
        details?: string | undefined;
    };
}, {
    body: {
        email: string;
        fullName: string;
        service: string;
        phone?: string | undefined;
        company?: string | undefined;
        budget?: string | undefined;
        details?: string | undefined;
    };
}>;
export declare const updateLeadSchema: z.ZodObject<{
    body: z.ZodObject<{
        fullName: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
        company: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
        service: z.ZodOptional<z.ZodString>;
        budget: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
        details: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    }, "strip", z.ZodTypeAny, {
        fullName?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        company?: string | undefined;
        service?: string | undefined;
        budget?: string | undefined;
        details?: string | undefined;
    }, {
        fullName?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        company?: string | undefined;
        service?: string | undefined;
        budget?: string | undefined;
        details?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        fullName?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        company?: string | undefined;
        service?: string | undefined;
        budget?: string | undefined;
        details?: string | undefined;
    };
}, {
    body: {
        fullName?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        company?: string | undefined;
        service?: string | undefined;
        budget?: string | undefined;
        details?: string | undefined;
    };
}>;
export declare const subscribeEmailSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
    }, {
        email: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
    };
}, {
    body: {
        email: string;
    };
}>;
export interface CreateSubscriberDto {
    email: string;
}
//# sourceMappingURL=validation.d.ts.map