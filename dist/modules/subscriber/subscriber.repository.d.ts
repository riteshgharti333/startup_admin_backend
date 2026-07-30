import { CreateSubscriberDto } from "./subscriber.types";
export declare class SubscriberRepository {
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
    } | null>;
    create(data: CreateSubscriberDto): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
    }>;
    findMany(): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
    }[]>;
    count(): Promise<number>;
    search(args: any): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
    }[]>;
}
export declare const subscriberRepository: SubscriberRepository;
//# sourceMappingURL=subscriber.repository.d.ts.map