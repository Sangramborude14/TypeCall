import type { IssuePriority, IssueStatus } from "../domain/issue.js";

export function isString(value: unknown) : value is string {
return typeof value === "string";
}

export function isIssueStatus(value: unknown): value is IssueStatus {
    return  isString(value) && (ALL_STATUSES as readonly string[]).includes(value); 
}

export function isIssuePriority(value: unknown): value is IssuePriority {
    return isString(value) && (ALL_PRIORITY as readonly string[]).includes(value);
}

export function isRecord(value: unknown): value is Record<string, unknown>{
    return !Array.isArray(value) && (typeof value === "object") && (value != null);
}

const ALL_STATUSES = [
    "backlog",
    "todo",
    "in_progress",
    "in_review",
    "done",
    "cancelled"
] as const;

const ALL_PRIORITY = [
    "low",
    "medium",
    "high",
    "urgent",
] as const;