import type {IssueId, ProjectId, UserId} from "./types.js"

export type IssueStatus = "backlog" | "todo" | "in_progress" | "in_review" | "done" | "cancelled";

export type IssuePriority = "low" | "medium" | "high" | "urgent";

export type Issue = {
    readonly id: IssueId;
    readonly projectId: ProjectId;
    readonly authorId: UserId;
    assigneeId : UserId | null;
    title: string;
    description: string | null;
    status: IssueStatus
    priority: IssuePriority;
    readonly createdAt: Date;
    updatedAt: Date;

}

export type CreateIssueInput = Pick<Issue,"title" | "projectId" | "authorId"> &  Partial<{status: string; priority: string; description: string; assigneeId: string}>;
export type UpdateIssueInput = Partial<Pick<Issue, "assigneeId"|"priority"|"status"|"description">>;

// satisfies can preserve narrower inferred types whereas a type annotation uses the declared type


export const VALID_STATUS_TRANSITIONS = {
 backlog: ["todo","cancelled"],
        todo: ["in_progress", "backlog", "cancelled"],
        in_progress: ["in_review","todo","cancelled"],
        in_review: ["done","in_progress","cancelled"],
        done: ["todo", "backlog"],
        cancelled: ["backlog", "todo"],
} as const satisfies Record<IssueStatus, readonly IssueStatus[]>;

export function canTransition(from: IssueStatus, to: IssueStatus): boolean {
   const allowed = VALID_STATUS_TRANSITIONS[from];
   return (allowed as readonly IssueStatus[]).includes(to);
}


