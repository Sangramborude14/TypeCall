declare const __brand: unique symbol;
type BRAND<T,B> = T & {readonly [__brand]: B};

export type IssueId = BRAND<string,"IssueId">;
export type UserId = BRAND<string,"UserId">;
export type ProjectId = BRAND<string,"ProjectId">;

