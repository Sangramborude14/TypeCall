import type { IssueStatus } from "./issue.js";

export type DomainErrorCode = | "NOT_FOUND" | "INVALID_TRANSITION" | "UNAUTHORIZED" | "VALIDATION_FAILED";

export abstract class DomainError extends Error {
    abstract readonly code: DomainErrorCode;
    constructor(message: string){
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends DomainError {
    readonly code = "NOT_FOUND" as const;

    constructor(
        public readonly entityType: string,
        public readonly entityId: string,
    ) {
        super(`${entityType} with id ${entityId} was not found`)
    }
}




export class InvalidTransitionError extends DomainError {
    readonly code = "INVALID_TRANSITION" as const;

    constructor(
        public readonly from: IssueStatus,
        public readonly to: IssueStatus
    ) {
        super(`Cannot transition issue from'${from}' to '${to}'`);
    }
}


