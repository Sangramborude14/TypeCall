import type { CreateIssueInput, IssuePriority, IssueStatus } from "../domain/issue.js";
import type { ProjectId, UserId } from "../domain/types.js";
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

export type ValidationResult<T> = | {success: true; data: T} | {success: false; errors: string[]};

export function validateCreateIssueInput(input: unknown): ValidationResult<CreateIssueInput> {
    const errors: string[] = [];
    if(!isRecord(input)){
        return {success: false, errors: ["Input must be an object"]};
    }
   if(!isString(input.title) || input.title.trim().length === 0){
    errors.push("Title is required and must not be empty")
   }
   if(!isString(input.projectId) || input.projectId.trim().length === 0){
    errors.push("Project ID is required and must not be empty");
   };
   if(!isString(input.authorId) || input.authorId.trim().length === 0){
        errors.push("Author ID is required and must not be empty");
    }
    if(input.status !== undefined &&  !isIssueStatus(input.status)){
        errors.push("Status must belong to the defined values");
    }
    if(input.priority !== undefined &&  !isIssuePriority(input.priority)){
        errors.push("Priority must belong to the defined values");
    }
    if(input.description !== undefined && input.description !== null && !isString(input.description)){
        errors.push("Description must be a string");
    }
    if( input.assigneeId !== undefined && input.assigneeId !== null && !isString(input.assigneeId)){
        errors.push("assigneId must be a string");
    }

    if(errors.length > 0){
        return {success: false, errors};
    }

    const title = input.title as string;
    const projectId = input.projectId as ProjectId;
    const authorId = input.authorId as UserId;
    return {success: true,
        data:{
            title: title.trim(),
            projectId: projectId,
            authorId: authorId,
            ...(input.status !== undefined) && {status: input.status as IssueStatus},
            ...(input.priority !== undefined) && {priority: input.priority as IssuePriority},
            ...(input.description !== undefined) && {description: input.description as string | null},
            ...(input.assigneeId !== undefined) && {assigneeId: input.assigneeId as UserId | null} 
        } as CreateIssueInput};
}