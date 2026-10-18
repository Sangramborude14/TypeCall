 import type { CreateIssueInput } from "../domain/issue.js";
import { validateCreateIssueInput, type ValidationResult } from "./validators.js";

function assert(result: ValidationResult<CreateIssueInput>) {
    if(result.success === false){
        console.log(result.errors);
    }
    if(result.success === true){
        console.log(result.data)
    }
}

const invalidResult = validateCreateIssueInput({
    title: " ",
    priority: "super-critical",
});
assert(invalidResult);

const validResult = validateCreateIssueInput({
    title: "Fix authentication token leak",
    projectId: "proj_forge_1",
    authorId: "usr_lead_99",
    status: "todo",
    priority: "urgent",
});
assert(validResult);