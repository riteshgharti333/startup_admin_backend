import { CreateLeadDto, UpdateLeadDto } from "./lead.types";
export declare class LeadRepository {
    findById(id: string): Promise<{
        details: string | null;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string | null;
        company: string | null;
        service: string;
        budget: string | null;
    } | null>;
    findByEmail(email: string): Promise<{
        details: string | null;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string | null;
        company: string | null;
        service: string;
        budget: string | null;
    } | null>;
    create(data: CreateLeadDto): Promise<{
        details: string | null;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string | null;
        company: string | null;
        service: string;
        budget: string | null;
    }>;
    update(id: string, data: UpdateLeadDto): Promise<{
        details: string | null;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string | null;
        company: string | null;
        service: string;
        budget: string | null;
    }>;
    delete(id: string): Promise<{
        details: string | null;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string | null;
        company: string | null;
        service: string;
        budget: string | null;
    }>;
    count(): Promise<number>;
    search(args: any): Promise<{
        details: string | null;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string | null;
        company: string | null;
        service: string;
        budget: string | null;
    }[]>;
    filter(args: any): Promise<{
        details: string | null;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string | null;
        company: string | null;
        service: string;
        budget: string | null;
    }[]>;
}
export declare const leadRepository: LeadRepository;
//# sourceMappingURL=lead.repository.d.ts.map