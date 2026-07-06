"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
async function createAdmin() {
    try {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const name = process.env.ADMIN_NAME;
        if (!email || !password || !name) {
            throw new Error("Missing admin credentials in .env file");
        }
        const existingAdmin = await prisma.user.findUnique({
            where: { email },
        });
        if (existingAdmin) {
            console.log("⚠️  Admin user already exists!");
            process.exit(0);
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const admin = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: client_1.Role.ADMIN,
            },
        });
        console.log("✅ Admin user created successfully!");
        console.log({
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
        });
    }
    catch (error) {
        console.error("❌ Error creating admin:", error);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
createAdmin();
