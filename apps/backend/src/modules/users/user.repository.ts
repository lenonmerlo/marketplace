import { prisma } from "@/core/prisma.js";
import { Role } from "@prisma/client";

export async function createUser(data: {
    name: string;
    email: string;
    password: string;
    role?: Role;
}) {
    return prisma.user.create({ data: { ...data, role: data.role ?? 'BUYER' } });
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
}