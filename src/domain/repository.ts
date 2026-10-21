import type { Issue } from "./issue.js";
import type { IssueId, ProjectId } from "./types.js";

export interface IssueRepository  {
 findById(id: IssueId): Promise<Issue | null>;
 findByProject(projectId: ProjectId) : Promise<readonly Issue[]>;
 save(issue: Issue): Promise<void>;
 delete(id: IssueId): Promise<boolean>;
}