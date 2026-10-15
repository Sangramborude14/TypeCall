import type {IssueId, ProjectId, UserId} from "./types.js"

export type IssueStatus = "backlog" | "todo" | "in_progress" | "in_review" | "done" | "cancelled";

export type IssuePriority = "low" | "medium" | "high" | "urgent";

export type Issue = {
    readonly id: IssueId;
    readonly ProjectId: ProjectId;
    readonly UserId: UserId;
    assigneeId : string | null;
    title: string;
    description: string | null;
    status: IssueStatus
    priority: IssuePriority;
    readonly createdAt: Date;
    updatedAt: Date;

}

type CreateIssueInput = Pick<Issue,"id"|"ProjectId"|"UserId"|"status"|"priority">;
type UpdateIssueInput = Pick<Issue, "assigneeId"|"priority"|"status"|"title"|"description"|"updatedAt">;
