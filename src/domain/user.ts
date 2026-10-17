import type { ProjectId, UserId } from "./types.js"

export type User = {
    readonly id: UserId;
    email: string;
    name: string;
    role: UserRole;
    readonly createdAt:  Date;
};
export type UserRole = "admin" | "member" | "viewer";
