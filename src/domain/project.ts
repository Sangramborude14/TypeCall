import type { ProjectId } from "./types.js";

export type Project = {
    readonly id: ProjectId;
    name: string;
    key:  string;
    description: string | null;
    readonly createdAt: Date;
}