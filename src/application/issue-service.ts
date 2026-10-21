import { NotFoundError, type DomainError, type InvalidTransitionError } from "../domain/errors.js";
import { DomainTransitionIssue, type CreateIssueInput, type Issue, type IssueStatus } from "../domain/issue.js";
import type { IssueRepository } from "../domain/repository.js";
import { err, ok, type Result } from "../domain/result.js";
import type { IssueId } from "../domain/types.js";
import { InMemoryIssueRepository } from "../infrastructure/in-memory-issue-repository.js";

export class IssueService {
    constructor(private readonly issueRepo: IssueRepository){}

    public async createIssue(input: CreateIssueInput): Promise<Result<Issue,DomainError>> {
        const IssueId = String("iss" + Math.random().toString(36).substring(2,9).toString());
        const new_issue: Issue = {
            id: IssueId as IssueId,
            status:input.status ?? "backlog",
            priority: input.priority ?? "medium",
            title: input.title,
            authorId: input.authorId,
            projectId: input.projectId,
            description: input.description ?? null,
            assigneeId: input.assigneeId ?? null,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await this.issueRepo.save(new_issue);
        return ok(new_issue)
    }

   public async transitionIssue(
    id: IssueId,
    nextStatus: IssueStatus
   ): Promise<Result<Issue,NotFoundError | InvalidTransitionError>> {
    const issue = await this.issueRepo.findById(id);
    if(!issue){
        return err(new NotFoundError("Issue",id));
    }
    const result = DomainTransitionIssue(issue,nextStatus);
    if(!result.ok) return result;
    await this.issueRepo.save(result.value);
    return ok(result.value);
   }
}