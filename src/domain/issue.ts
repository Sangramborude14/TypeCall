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


