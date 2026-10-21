import type { Issue } from "../domain/issue.js";
import type { IssueRepository } from "../domain/repository.js";
import type { IssueId, ProjectId } from "../domain/types.js";

export class InMemoryIssueRepository implements IssueRepository {
   private readonly issues = new Map<IssueId,Issue>();

   public async findById(id: IssueId): Promise<Issue | null> { // when a function is wraped in async JS automatically wraps the return in Promise
    const issue = this.issues.get(id);
    if(!issue) {
        return null;
    }
    return { ...issue};
   }

   public async findByProject(projectId: ProjectId): Promise<readonly Issue[]> {
       return Array.from(this.issues.values())
       .filter(issue => issue.projectId === projectId)
       .map(issue => ({...issue}));
   }

   public async save(issue: Issue): Promise<void> {
       this.issues.set(issue.id, {...issue});
       return ;
   }
   public async delete(id: IssueId): Promise<boolean> {
       const deleted = this.issues.delete(id);
       return deleted
   }
}